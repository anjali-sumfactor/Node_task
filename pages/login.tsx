import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push('/getAllUserData')
  }

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    }

    try {
      const response = await fetch('./api/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('user successfully logged in');
      } else {
        console.log('please enter correct email or password');
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Login Form</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit" >Login</button>
        <button onClick={handleClick}>Get all user</button>
      </form>
    </>
  )
}
