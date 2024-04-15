import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import { Dropdown } from 'react-bootstrap';

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
      <button className="btn btn-success" 
      onClick={() => navigate('/', { state: { username: formData.username } })}>log out</button>
    </div>
  );
}

export function App() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    gender: '',
    country: 'select a country',
    interests: [],
  });
  const navigate = useNavigate();

  const updateFormData = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  const updateInterests = (interest) => {
    setFormData(prevData => ({
      ...prevData,
      interests: prevData.interests.includes(interest)
        ? prevData.interests.filter(item => item !== interest)
        : [...prevData.interests, interest]
    }));
  };

  const countries = ['India', 'Newzland', 'England'];

  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
    gender: '',
    country: '',
    interests:''
  });
  const validateForm = () => {
    let valid = true;
    const newFormErrors = { ...formErrors };

    if (formData.username.trim() === '') {
      newFormErrors.username = 'Username is required';
      valid = false;
    } 

    if (formData.password.trim() === '') {
      newFormErrors.password = 'Password is required';
      valid = false;
    }

    if (formData.gender.trim() === '') {
      newFormErrors.gender = 'Gender is required';
      valid = false;
    } 

    if (formData.country.trim() === '' || formData.country === 'select a country') {
      newFormErrors.country = 'Country is required';
      valid = false;
    } 
    if (formData.interests.length === 0) {
      newFormErrors.interests = 'Interests are required';
      valid = false;
    }
    setFormErrors(newFormErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigate('/Sub', { state: { formData } });
    }
  };

  return (
    <div className="App">
      <h1>Login page</h1><br/><br/>

      <label>Username</label>
      <FaUserAlt className='icon'/>
      <Form.Control id="username" type="text"  
      onChange={(e) => updateFormData('username', e.target.value)} placeholder="Enter username"/>
      {formErrors.username}
      <br/>

      <label>Password</label>
      <FaLock/>
      <Form.Control id="password" type="password"
      onChange={(e) => updateFormData('password', e.target.value)} placeholder="Enter Password"/>
      {formErrors.password}
      <br/>
     
      <label>Gender:</label>
      <div className="radio">
        <label><input type="radio" 
          checked={formData.gender === 'male'} 
          onChange={() => updateFormData('gender', 'male')}
         
        />Male</label>
        <br/>
        <label><input type="radio" 
          checked={formData.gender === 'female'} 
          onChange={() => updateFormData('gender', 'female')}
        
        />Female</label>
      </div>
      {formErrors.gender}
      <br />
      
      <label>Country:</label>
      <div className="container">
        <Dropdown>
          <Dropdown.Toggle  id="dropdownButton">
            {formData.country}<span className="caret"></span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {countries.map((country) => (
              <Dropdown.Item 
              onClick={() => updateFormData('country', country)}>{country}<br/></Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {formErrors.country}
      <br/>
      
      <label>Interests</label>
      <div className="checkbox">
        <label><input type="checkbox" checked={formData.interests.includes('sports')} 
        onChange={() => updateInterests('sports')}/>Sports</label>
      </div>
      <div className="checkbox">
        <label><input type="checkbox" checked={formData.interests.includes('dancing')} 
        onChange={() => updateInterests('dancing')}/>Dancing</label>
      </div>
      <div className="checkbox">
        <label><input type="checkbox" checked={formData.interests.includes('politics')} 
        onChange={() => updateInterests('politics')}/>Politics</label>
      </div>
      {formErrors.interests}
      <br />
      <div>
        <button
          value="submit"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
