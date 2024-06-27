import React from 'react';

function DashboardHeader({ user, onLogout }) {
    console.log(user);
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Virtual Estate Planning Workshop Platform</span>
        <span className="text-white">Welcome user with Id : {user?.id}</span>
        <button className="btn btn-outline-light ms-auto" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default DashboardHeader;
