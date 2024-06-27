import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
      <div className="position-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="#" className="nav-link active">Plans</Link>
          </li>
          {/* Add more menu items as needed */}
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
