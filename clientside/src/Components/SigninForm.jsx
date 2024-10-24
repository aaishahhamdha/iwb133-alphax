import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SubmitButton from './SubmitButton';
import "../index.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { Typography } from '@mui/material';
import {validateEmail,
       validatePassword} from './Validation';


function SigninForm() {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [formError, setFormError] = useState(
    {
      email: "",
      password: ""
    }
  )

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (!emailValidation.isValid || 
        !passwordValidation.isValid
    ) {
      setFormError(
        {
          email: emailValidation.Message,
          password: passwordValidation.Message
        }
      );
      return;
    }

    try {
      const response = await axios.post('http://localhost:9090/api/signin', {
        mail: email,
        password: password
      });

      if (response.data) {
       
        const token = response.headers['session-token'];
        login(response.data, token); 
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <form className='formCss' onSubmit={handleSubmit}>
      <Typography sx={{
        color: 'var(--orange)',
        fontSize: 'var(--font-size-subheading)',
        fontWeight: 'bold'
      }}>
        Sign In
      </Typography>
      
      {error && <p className="error">{error}</p>}
      
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
     {formError.email && <p className="error">{formError.email}</p>}

      
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {formError.password && <p className="error">{formError.password}</p>}

      <SubmitButton buttonTitle="Sign In" />
    </form>
  );
}

export default SigninForm;
