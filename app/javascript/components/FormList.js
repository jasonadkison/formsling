import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormButtons from './FormButtons';

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
    <div id="form-list">
      <h3 className="title">Your Forms</h3>
      <div className="table-container">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Recipient</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {forms.map(form => (
              <tr key={form.id}>
                <td>
                  {form.name}
                </td>
                <td>

                </td>
                <th>
                  <FormButtons {...form} />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormList;
