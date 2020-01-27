import React, { useReducer, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TimeAgo from 'react-timeago'

import BreadcrumbPortal from '../BreadcrumbPortal';
import Breadcrumbs from './Breadcrumbs';
import Loader from '../Loader';

const initialState = {
  loading: false,
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
    return () => clearTimeout(setTimeout);
  }, [formId]);

  return (
    <div id="result-list">
      {error && (
        <div className="notification is-danger">
          <p>Oops, something went wrong.</p>
        </div>
      )}
      <Loader loading={loading} />
      <BreadcrumbPortal>
        <Breadcrumbs {...form} />
      </BreadcrumbPortal>
      <h1 className="title">Results</h1>
      <div className="table-container">
        <table className="table is-striped">
          <thead>
            <tr>
              <th>Created</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {results.map(result => (
              <tr key={result.id}>
                <td>
                  <TimeAgo date={result.created_at}>
                    {result.created_at}
                  </TimeAgo>
                </td>
                <td>
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
                      View Result
                    </span>
                  </a>
                </td>
                <td>
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
                      Download Result
                    </span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultList;
