import React, { useReducer, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import TimeAgo from 'react-timeago'

import EmptyState from '../EmptyState';
import BreadcrumbPortal from '../BreadcrumbPortal';
import Breadcrumbs from './Breadcrumbs';
import Loader from '../Loader';

const initialState = {
  loading: true,
  form: {
    id: undefined,
    name: undefined,
  },
  results: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_END':
      return { ...state, loading: false };
    case 'RECEIVE_FORM':
      return { ...state, form: {...action.payload } };
    case 'RECEIVE_RESULTS':
      return { ...state, results: [...action.payload] };
    default:
      throw new Error();
  }
};

const ResultList = () => {
  const { formId } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState(false);
  const { loading, form, results } = state;

  const fetchData = async () => {
    dispatch({ type: 'FETCH_START' });

    await axios.all([
      axios(`/api/v1/forms/${formId}`),
      axios(`/api/v1/forms/${formId}/results`),
    ])
      .then(axios.spread(({ data: form }, { data: results }) => {
        dispatch({ type: 'RECEIVE_FORM', payload: form });
        dispatch({ type: 'RECEIVE_RESULTS', payload: results });
      }))
      .catch(() => setError(true))
      .then(() => dispatch({ type: 'FETCH_END' }));
  };

  useEffect(() => {
    const timer = setTimeout(fetchData);
    return () => clearTimeout(timer);
  }, [formId]);

  if (error) {
    return (
      <div className="notification is-danger">
        <p>Oops, something went wrong and your results could not be loaded.</p>
      </div>
    )
  }

  return (
    <>
      <Loader loading={loading} />
      <div id="result-list">
        {!loading && (
          <BreadcrumbPortal>
            <Breadcrumbs {...form} />
          </BreadcrumbPortal>
        )}
        {results.length > 0 && (
          <>
            <h1 className="title">Results</h1>
            <div className="table-container">
              <table className="table is-striped">
                <thead>
                  <tr>
                    <th>Result ID</th>
                    <th>Created</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {results.map(result => (
                    <tr key={result.id}>
                      <td>{result.id}</td>
                      <td>
                        <TimeAgo date={result.created_at}>
                          {result.created_at}
                        </TimeAgo>
                      </td>
                      <td>
                        <div className="buttons">
                          <a
                            className="button is-small"
                            href={`/r/${result.id}`}
                            rel="noopener noreferrer"
                            title="View Result"
                            target="_blank"
                          >
                            <span className="icon">
                              <i className="fas fa-eye" />
                            </span>
                            <span>
                              View
                            </span>
                          </a>
                          <a
                            className="button is-small"
                            href={`/r/${result.id}.pdf`}
                            rel="noopener noreferrer"
                            title="Download Result"
                          >
                            <span className="icon">
                              <i className="fas fa-file-pdf" />
                            </span>
                            <span>
                              Download
                            </span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {!loading && !results.length && (
          <EmptyState
            top="No Results Found"
            middle="This form has not received any submissions."
            bottom={(
              <Link to="/forms" className="button is-link is-outlined">
                Back to Forms
              </Link>
            )}
          />
        )}
      </div>
    </>
  );
};

export default ResultList;
