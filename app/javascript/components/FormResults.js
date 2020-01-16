import React from 'react';
import { useParams, Link } from 'react-router-dom';

const FormResults = () => {
  const { id } = useParams();
  return (
    <div>
      Results here for form #{id}.
    </div>
  );
};

export default FormResults;
