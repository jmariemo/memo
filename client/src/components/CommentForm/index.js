import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_COMMENT } from "../../utils/mutations";

import Auth from "../../utils/auth";

const CommentForm = ({ thoughtId }) => {
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          thoughtId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "commentText") {
      setCommentText(value);
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
                className="container max-w-sm mx-auto mt-2 md:mt-10 mb-10 flex-1 flex flex-col items-center justify-center px-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-6 py-8 rounded shadow-md shadow-sage text-black w-full bg-white">
                  <h4 className="text-center">Add Event</h4>

                  <input
                    type="text"
                    placeholder="What's the occasion?"
                    name="commentText"
                    onChange={handleChange}
                    value={commentText}
                    required
                    className="block border border-sage w-full p-3 rounded mb-4"
                  />
                  <button
                    disabled={!commentText}
                    type="submit"
                    className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                  >
                    Save Event
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;
