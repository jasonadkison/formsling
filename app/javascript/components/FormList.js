import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormList = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const loadForms = async () => {
      const result = await axios('/api/v1/forms');

      setForms(result.data);
    };

    loadForms();
  }, []);

  return (
    <div>
      <h3>Form List</h3>
      {forms.map(form => (
        <div className="form-item" key={form.id}>
          {form.name}
        </div>
      ))}
      </div>
  );
};

export default FormList;
