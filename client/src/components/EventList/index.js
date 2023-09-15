import React from 'react';

const EventList = ({ events = [] }) => {
  if (!events.length) {
    return <h3 className='text-center'>No Events Yet</h3>;
  }

  

  return (
    <>
      <h3 className="text-center mb-2">
        Upcoming Events
      </h3>
      <div className="flex flex-wrap">
        {events &&
          events.map((event) => (
            <div key={event._id} className="bg-vanilla m-4 rounded shadow-md">
              <div className="p-3 bg-dark text-light">
                <p className="text-center">{event.eventDate}</p>
                <p className="text-center">{event.eventName}</p>
                <button
                    type="submit"
                    className="w-full text-center px-3 mt-2 rounded bg-sage hover:bg-white text-white hover:text-sage focus:outline-none shadow-md"
                  >
                    Delete
                  </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default EventList;
