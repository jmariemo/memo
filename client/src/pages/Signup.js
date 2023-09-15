import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <div>
        <div>
          <div>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              // <form onSubmit={handleFormSubmit}>
              //   <input
              //     className="form-input"
              //     placeholder="Your username"
              //     name="username"
              //     type="text"
              //     value={formState.name}
              //     onChange={handleChange}
              //   />
              //   <input
              //     className="form-input"
              //     placeholder="Your email"
              //     name="email"
              //     type="email"
              //     value={formState.email}
              //     onChange={handleChange}
              //   />
              //   <input
              //     className="form-input"
              //     placeholder="******"
              //     name="password"
              //     type="password"
              //     value={formState.password}
              //     onChange={handleChange}
              //   />
              //   <button
              //     className="btn btn-block btn-primary"
              //     style={{ cursor: 'pointer' }}
              //     type="submit"
              //   >
              //     Submit
              //   </button>
              // </form>
              <form
              className="items-center justify-center"
              noValidate
              validated={"false"}
              onSubmit={handleFormSubmit}
              >
              
              <div className="flex flex-col">
                <div
                  className="container max-w-sm mx-auto mt-2 md:mt-10 mb-10 flex-1 flex flex-col items-center justify-center px-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-6 py-8 rounded shadow-md shadow-sage text-black w-full bg-white">
                    <h1 htmlFor="email" className="mb-8 text-3xl text-center text-sage">
                      Sign Up
                    </h1>
                    <input
                      type="text"
                      placeholder="Username"
                      name="username"
                      onChange={handleChange}
                      value={formState.username}
                      required
                      className="block border border-sage w-full p-3 rounded mb-4"
                    />
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
                      disabled={!(formState.username && formState.email && formState.password)}
                      className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                    >
                      Sign Up!
                    </button>
                  </div>
                </div>
              </div>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>


  );
};

export default Signup;
