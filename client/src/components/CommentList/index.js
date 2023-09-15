import React from 'react';

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3 className='text-center'>No Events Yet</h3>;
  }

  return (
    <>
      <h3 className="text-center mb-2">
        Upcoming Events
      </h3>
      <div className="flex flex-wrap">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="bg-vanilla m-4 rounded shadow-md">
              <div className="p-3 bg-dark text-light">
                <p className="card-body">{comment.commentText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
