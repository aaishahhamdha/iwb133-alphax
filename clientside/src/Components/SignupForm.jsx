import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SubmitButton from './SubmitButton';
import "../index.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { validateName,
         validateEmail,
         validatePassword
 } from './Validation';

function SignupForm() {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nameValidation = validateName(name);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if(!nameValidation.isValid ||
      !emailValidation.isValid ||
      !passwordValidation.isValid
    ){
      setFormError({
        name: nameValidation.Message,
        email: emailValidation.Message,
        password: passwordValidation.Message
      })
    }

    try {
      const response = await axios.post('http://localhost:9090/api/signup', {
        mail: email,
        name: name,
        password: password
      });

      if (response.data) {
       
        navigate('/signin');
      }
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <form className='formCss' onSubmit={handleSubmit}>
      <Typography sx={{
        color: 'var(--orange)',
        fontSize: 'var(--font-size-subheading)',
        fontWeight: 'bold'
      }}>
        Sign Up
      </Typography>
      
      {error && <p className="error">{error}</p>}
      
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {formError.name && <p className="error">{formError.name}</p>}

      
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

      
      <SubmitButton buttonTitle="Sign Up" />
    </form>
  );
}

export default SignupForm;
