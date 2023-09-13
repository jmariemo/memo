import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ThoughtForm = () => {
  const [thoughtText, setThoughtText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      try {
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [addThought, ...thoughts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addThought({
        variables: {
          thoughtText,
          thoughtAuthor: Auth.getProfile().data.username,
        },
      });

      setThoughtText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtText') {
      setThoughtText(value);
    }
  };

  return (
    <div>

      {Auth.loggedIn() ? (
        <>

          <form
            className="flex items-center justify-center"
            onSubmit={handleFormSubmit}
          >
            <div className="flex flex-col">
              <div
                className="container max-w-sm mx-auto mt-2 mb-10 flex-1 flex flex-col items-center justify-center "
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-6 py-2 rounded shadow-md shadow-sage text-black w-full bg-vanilla">
                  <h4 className="text-center m-2">Add Contact</h4>

                  <input
                    type="text"
                    placeholder="Contact Name"
                    name="thoughtText"
                    onChange={handleChange}
                    value={thoughtText}
                    required
                    className="block border border-sage w-full p-3 rounded mb-4"
                  />
                  <button
                    disabled={!thoughtText}
                    type="submit"
                    className="w-full text-center py-3 rounded bg-tangerine hover:bg-white text-white hover:text-tangerine focus:outline-none my-1 shadow-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ThoughtForm;



