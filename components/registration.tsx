import React, { useState } from 'react';
import { useRouter } from 'next/router'

export default function Registration() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push('/login')
  }

  const handleRegistration = async (e: any) => {
    e.preventDefault();

    const userData = {
      first_name,
      last_name,
      email,
      password
    };

    try {
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('user successfully registered');
      } else {
        console.log('user already registered,please login!');
      }

    } catch (error) {
      console.error('error in register', error);
    }
  };

  return (
    <>
    <h1>Registration Form</h1>
      <form onSubmit={handleRegistration}>
        <div>
          <label htmlFor="first_name">First Name: </label>
          <input
            type="text"
            id="firstName"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name: </label>
          <input
            type="text"
            id="lastName"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
        <button onClick={handleClick}>Go to login page</button>
      </form>
    </>
  )
}