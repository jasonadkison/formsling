import React from 'react';
import { useParams, Link } from 'react-router-dom';

const FormExample = () => {
  const { id } = useParams();
  return (
    <div>
      Example here for form #{id}.
    </div>
  );
};

export default FormExample;
