import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth.jsx';
import foodImage from '../assets/emplogin.jpg';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        debugger;
        localStorage.setItem("userId",data._id);
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-[#262626] rounded-lg p-8 shadow-lg relative border border-[#333333]'>
        <button className='absolute top-4 right-4 text-gray-300 text-2xl'>&times;</button>
        
        <div className='text-center mb-8'>
          <h1 className='text-gray-200 text-3xl font-semibold mb-2'>Restaurant</h1>
  
          <h2 className='text-gray-300 text-2xl font-medium'>Sign In</h2>
        </div>

        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
          <div>
            <TextInput
              type='email'
              placeholder='Email'
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
              'SIGN IN'
            )}
          </button>
          
          <OAuth />
        </form>

        <div className='flex gap-2 justify-center mt-6 text-sm'>
          <span className='text-gray-400'>Don't have an account?</span>
          <Link to='/signup' className='text-gray-200 font-medium hover:text-white'>
            Sign Up
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
