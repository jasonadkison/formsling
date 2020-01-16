import React from 'react';
import { useParams, Link } from 'react-router-dom';

const FormEditor = () => {
  const { id } = useParams();
  return (
    <div>
      Editor here for form #{id}.
    </div>
  );
};

export default FormEditor;
