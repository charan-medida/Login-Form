
import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';



  export function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const { formData } = location.state;
  
    return (
      <div>
        <h1>Hi {formData.username}</h1>
        <h1>This is your password - {formData.password}</h1>
        <h1>Your Gender - {formData.gender}</h1>
        <h1>Your are from {formData.country}</h1>
        <h1>Your interests are:</h1>
        <ol>
          {formData.interests.map((interest) => (
            <li><h1>{interest}</h1></li>
          ))}
        </ol>
        <br/>
        <p>If you want to use the calculator, then click on this button<button className="btn btn-success" 
        onClick={()=> navigate('/Calculator')}>calculator</button></p><br/>
        <button className="btn btn-success" 
        onClick={() => navigate('/')}>log out</button><br/><br/>
        
      </div>
    );
  }
  