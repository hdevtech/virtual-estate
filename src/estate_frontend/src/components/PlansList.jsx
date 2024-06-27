import React, { useState, useEffect } from 'react';
import { estate_backend } from 'declarations/estate_backend';
import 'bootstrap/dist/css/bootstrap.min.css';

function PlansList({ userId, handleEdit, handleDelete }) {
    console.log ('userId:', userId);
  const [detailedPlans, setDetailedPlans] = useState([]);
  const [newPlanTitle, setNewPlanTitle] = useState('');
  const [newPlanDescription, setNewPlanDescription] = useState('');

  useEffect(() => {
    if (userId) {
      fetchPlansByUserId(userId);
    } else {
      fetchAllPlans();
    }
  }, [userId]); // Fetch plans when userId changes

  const fetchPlansByUserId = async (userId) => {
    try {
      const plans = await estate_backend.getPlansByUserId(userId);
      setDetailedPlans(plans); // Filter out any null or undefined plans
    } catch (error) {
      console.error(`Error fetching plans for user ${userId}:`, error);
    }
  };

  const handleAddPlan = async () => {
    try {
      if (!newPlanTitle || !newPlanDescription) {
        alert('Please enter a title and description for the new plan.');
        return;
      }
      const response = await estate_backend.addPlan(userId, newPlanTitle, newPlanDescription); // Use userId for adding plan
      console.log(response); // Handle success message or error
      if (userId) {
        fetchPlansByUserId(userId); // Refresh plans for the specific user
      } else {
        fetchAllPlans(); // Refresh all plans if no specific user
      }
      setNewPlanTitle('');
      setNewPlanDescription('');
    } catch (error) {
      console.error('Error adding plan:', error);
    }
  };

  return (
    <div>
      <h2>Plans List</h2>
      <div className="mb-3">
        <label htmlFor="newPlanTitle" className="form-label">New Plan Title:</label>
        <input type="text" className="form-control" id="newPlanTitle" value={newPlanTitle} onChange={(e) => setNewPlanTitle(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="newPlanDescription" className="form-label">New Plan Description:</label>
        <textarea className="form-control" id="newPlanDescription" rows="3" value={newPlanDescription} onChange={(e) => setNewPlanDescription(e.target.value)}></textarea>
      </div>
      <button className="btn btn-primary mb-3" onClick={handleAddPlan}>Add Plan</button>
        <hr />
        {/* plans For The active User */}
        <h3>Plans For The Active User</h3>
        <hr />
      <div className="row row-cols-2">
        {
        detailedPlans.map((plan) => (
          <div key={plan.planId} className="col mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{plan.title}</h5>
                <hr />
                <p className="card-text">{plan.textDescription}</p>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary mx-1" onClick={() => handleEdit(plan.planId)}>Edit</button>
                  <button className="btn btn-danger mx-1" onClick={() => handleDelete(plan.planId)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlansList;
