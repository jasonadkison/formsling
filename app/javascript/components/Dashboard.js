import React, { useState } from 'react';
import FormList from './FormList';

const Dashboard = () => {
  return (
    <div id="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard.</p>
      <FormList />
    </div>
  );
};

export default Dashboard;
