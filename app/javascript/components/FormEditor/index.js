import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Redirect } from 'react-router-dom';
import useApi from '../hooks/use-api';

import Loader from '../Loader';
import BreadcrumbPortal from '../BreadcrumbPortal';
import Breadcrumbs from './Breadcrumbs';
import Editor from './Editor';

const initialFormState = {
  id: '',
  name: '',
  payload: '',
  updated_at: '',
};

const FormEditor = ({ enabled: initialEnabled }) => {
  const { id } = useParams();
  const endpoint = `/api/v1/forms/${id}`;
  const [enabled, setEnabled] = useState(initialEnabled);
  const [{ data: form, loading, error }, refresh] = useApi(endpoint, initialFormState);

  if (error === 404) {
    return <Redirect to="/not-found" />;
  }

  if (error) {
    return (
      <div className="notification is-danger">
        <p>Oops, something went wrong and your request failed.</p>
      </div>
    );
  }

  return (
    <>
      <Loader loading={loading} />
      <div id="editor" className={enabled ? 'is-enabled' : 'is-disabled'}>
        <BreadcrumbPortal>
          <Breadcrumbs {...form} />
        </BreadcrumbPortal>
        <Editor
          enabled={enabled}
          setEnabled={setEnabled}
          form={form}
          afterSaveEditor={refresh}
          afterSaveForm={refresh}
        />
      </div>
    </>
  );
};

FormEditor.propTypes = {
  enabled: PropTypes.bool,
};

FormEditor.defaultProps = {
  enabled: true,
};

export default FormEditor;
