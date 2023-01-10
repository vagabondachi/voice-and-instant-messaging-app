import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const handleSubmit = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user
          .updateProfile({
            displayName: username,
          })
          .catch((error) => {
            console.log(error);
          });
        firebase.firestore().collection('users').doc(user.user.uid).set({
          userId: user.user.uid,
          userLanguage: 'en',
          translateToLanguage: 'en',
        });
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  useEffect(() => {
    if (user) {
      // if user is logged in, redirect to home page
      navigate('/');
    }
  }, [user]);

  return (
    <div className="centered-container-form">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="loginheader">Create an account</div>
          <br />
          <div className="container">
            <div className="input-box">
              <input
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <label htmlFor="password">Email address</label>
            </div>
          </div>
          <br />

          <div className="container">
            <div className="input-box">
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
              <label htmlFor="password">Username</label>
            </div>
          </div>
          <br />

          <div className="container">
            <div className="input-box">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <br />
        <div className="container">
            <label>Date of Birth</label>
            <br />
            <span className='month-container'>
              <select name="month" value={month} onChange={e => setMonth(e.target.value)}>
                <option value="" selected disabled>
                  Month
                </option>
                {months.map((month, index) => (
                  <option key={index} value={index + 1}>{month}</option>
                ))}
              </select>
            </span>
            <span className='days-container'>
              <select name="day" id="day" value={day} onChange={e => setDay(e.target.value)}>
                <option value="" selected disabled>
                  Day
                </option>
                {Array.from({length: 31}, (_,i) => i+1).map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </span>
            <span className='year-container'>
              <select name="year" id="year" value={year} onChange={e => setYear(e.target.value)}>
                <option value="" selected disabled>
                  Year
                </option>
                {Array.from({length: new Date().getFullYear()-1900}, (_,i) => i+1901).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </span>
          </div>
          <br />

          <br />

          <button type="submit">Continue</button>
        </div>
      </form>
      {error && <p>{error}</p>}

      <div className="login-option">
        Already have an account?
        <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
}

export default Registration;
