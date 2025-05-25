import React, { useState } from 'react';
import { Alert, Label, Spinner, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth.jsx';
import gymImage from '../assets/signup.jpg';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }

    if (formData.username.length < 4 || formData.username.length > 20) {
      return setErrorMessage('Username must be between 4 and 20 characters.');
    }

    if (formData.username.includes(' ')) {
      return setErrorMessage('Username cannot contain spaces.');
    }

    if (formData.username !== formData.username.toLowerCase()) {
      return setErrorMessage('Username must be lowercase.');
    }

    if (!formData.username.match(/^[a-zA-Z0-9]+$/)) {
      return setErrorMessage('Username can only contain letters and numbers.');
    }

    // Email validation
    if (formData.email.length < 6 || !formData.email.includes('@gmail.com')) {
      return setErrorMessage('Email must be at least 6 characters long and end with @gmail.com.');
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      return setErrorMessage('Password must be at least 6 characters long and contain both letters and numbers.');
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }

      setLoading(false);
      navigate('/signin');
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  return (
    <div className='min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-[#262626] rounded-lg p-8 shadow-lg relative'>
        <button className='absolute top-4 right-4 text-white text-2xl'>&times;</button>
        
        <div className='text-center mb-8'>
          <h1 className='text-white text-3xl font-semibold mb-2'>Restaurant</h1>
          <h2 className='text-white text-2xl font-medium'>Sign Up</h2>
        </div>

        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
          <div>
            <TextInput
              type='text'
              placeholder='Username'
              id='username'
              onChange={handleChange}
              className='rounded-lg border-gray-300'
            />
          </div>

          <div>
            <TextInput
              type='email'
              placeholder='name@yourmail.com'
              id='email'
              onChange={handleChange}
              className='rounded-lg border-gray-300'
            />
          </div>

          <div>
            <TextInput
              type='password'
              placeholder='Password'
              id='password'
              onChange={handleChange}
              className='rounded-lg border-gray-300'
            />
          </div>

          <button
            type="submit"
            className={`bg-[#333333] text-white py-3 rounded-lg font-medium hover:bg-[#404040] transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size='sm' />
                <span className='pl-3'>Loading...</span>
              </>
            ) : (
              'SIGN UP'
            )}
          </button>

          <OAuth />
        </form>

        <div className='flex gap-2 justify-center mt-6 text-sm'>
          <span className='text-gray-600'>Already have an account?</span>
          <Link to='/signin' className='text-white font-medium hover:text-gray-300'>
            Sign In
          </Link>
        </div>

        {errorMessage && (
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}
