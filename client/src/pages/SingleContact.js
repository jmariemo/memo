import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import EventList from "../components/EventList";
import EventForm from "../components/EventForm";

import { QUERY_SINGLE_CONTACT } from "../utils/queries";

const SingleContact = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { contactId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_CONTACT, {
    // pass URL parameter
    variables: { contactId: contactId },
  });

  const contact = data?.contact || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col md:flex-row md:justify-around my-3">
      <div>
        <div className="flex justify-center m-6 bg-tangerine/80 rounded shadow-lg">
          <h5 className="p-4 text-3xl text-white">{contact.contactName}</h5>
        </div>
        <div className="m-3">
          <EventForm contactId={contact._id} />
        </div>
      </div>

      <div>
        <EventList events={contact.events} />
      </div>
    </div>
  );
};

export default SingleContact;