import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  if (!props.show) {
    return null;
  }

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
<form
className="max-w-full z-30 flex fixed left-0 right-0 top-0 mt-20 bottom-0 items-center justify-center bg-gradient-to-b from-white to-green/40"
noValidate
validated={"false"}
onSubmit={handleFormSubmit}
onClick={props.onClose}
>

<div className="flex flex-col">
  <div
    className="container max-w-sm mx-auto mt-2 md:mt-10 mb-10 flex-1 flex flex-col items-center justify-center px-2"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="px-6 py-8 rounded shadow-md shadow-sage text-black w-full bg-white">
      <h1 htmlFor="email" className="mb-8 text-3xl text-center text-sage">
        Login
      </h1>
      <input
        type="text"
        placeholder="Email"
        name="email"
        onChange={handleChange}
        value={formState.email}
        required
        className="block border border-sage w-full p-3 rounded mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        value={formState.password}
        required
        className="block border border-sage w-full p-3 rounded mb-4"
      />
      <button
        type="submit"
        disabled={!(formState.email && formState.password)}
        className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
      >
        Login
      </button>
    </div>
  </div>
</div>
</form>
  );
};

export default Login;
