import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import PlansList from './PlansList';

function Dashboard({userId, user, onLogout }) {
  const handleEdit = (id) => {
    // Handle edit logic here
  };

  const handleDelete = (id) => {
    // Handle delete logic here
  };

  return (
    <div className="container-fluid">
      <DashboardHeader userId={userId} user={user} onLogout={onLogout} />
      
      <div className="row">
        <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <h1 className="h2">Dashboard</h1>
          <PlansList userId={userId}  handleEdit={handleEdit} handleDelete={handleDelete} />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
