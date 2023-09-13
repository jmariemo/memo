import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

import { QUERY_SINGLE_THOUGHT } from "../utils/queries";

const SingleThought = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { thoughtId: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col md:flex-row md:justify-around my-3">
      <div>
        <div className="flex justify-center m-6 bg-tangerine/80 rounded shadow-lg">
          <h5 className="p-4 text-3xl text-white">{thought.thoughtText}</h5>
        </div>
        <div className="m-3">
          <CommentForm thoughtId={thought._id} />
        </div>
      </div>

      <div>
        <CommentList comments={thought.comments} />
      </div>
    </div>
  );
};

export default SingleThought;
