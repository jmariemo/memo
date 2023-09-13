import React from 'react';
import { Link } from 'react-router-dom';

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
}) => {
  if (!thoughts.length) {
    return <h3>No Contacts Yet</h3>;
  }

  return (
    <div className='flex flex-wrap md:flex-row text-white mt-3'>
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="p-2 m-1 bg-tangerine rounded shadow-md">
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className="bg-white hover:bg-tangerine text-tangerine hover:text-white font-light py-1 px-3 m-3 rounded shadow-md"
              to={`/thoughts/${thought._id}`}
            >
              Add Event
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
