import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';

    function Login({ onLogin }) {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const navigate = useNavigate();

      const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
        if (email === 'admin@example.com') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      };

      return (
        <div>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      );
    }

    export default Login;
