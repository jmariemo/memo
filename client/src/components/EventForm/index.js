import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_EVENT } from "../../utils/mutations";

import Auth from "../../utils/auth";

const EventForm = ({ contactId }) => {
  const [eventFormData, setEventFormData] = useState({
    eventName: "",
    eventDate: "",
  });

  const [addEvent, { error }] = useMutation(ADD_EVENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addEvent({
        variables: {
          contactId,
          ...eventFormData,
        },
      });

      setEventFormData({
        eventName: "",
        eventDate: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventFormData({ ...eventFormData, [name]: value });
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
                <div className="px-6 py-6 rounded shadow-md shadow-sage text-black w-full bg-white">
                  <h4 className="text-center pb-3">Add Event</h4>
                  <input
                    type="text"
                    placeholder="What's the occasion?"
                    name="eventName"
                    onChange={handleChange}
                    value={eventFormData.eventName}
                    required
                    className="block border border-sage w-full p-3 rounded mb-4 shadow-md"
                  />
                  <input
                    type="text"
                    placeholder="Event Date"
                    name="eventDate"
                    onChange={handleChange}
                    value={eventFormData.eventDate}
                    required
                    className="block border border-sage w-full p-3 rounded mb-4 shadow-md"
                  />
                  <button
                    disabled={!eventFormData.eventName && !eventFormData.eventDate}
                    type="submit"
                    className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1 shadow-md"
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
          You need to be logged in to add your events. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default EventForm;
