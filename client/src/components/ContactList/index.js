import React from "react";
import { Link } from "react-router-dom";

const ContactList = ({ contacts, title, showTitle = true }) => {
  if (!contacts.length) {
    return <h3 className="text-center">No Contacts Yet</h3>;
  }

  return (
    <div className="flex flex-wrap md:flex-row text-white mt-3">
      {showTitle && <h3>{title}</h3>}
      {contacts &&
        contacts.map((contact) => (
          <div
            key={contact._id}
            className="flex flex-col items-center p-2 m-1 bg-tangerine rounded shadow-md"
          >
            <div className="bg-light p-2">
              <p className="text-center">{contact.contactName}</p>
              <p className="text-center">{contact.contactZipCode}</p>
            </div>
            <Link
              className="bg-white hover:bg-tangerine text-tangerine hover:text-white font-light py-1 px-3 m-3 rounded shadow-md"
              to={`/contacts/${contact._id}`}
            >
              See Events
            </Link>
            <button
              type="submit"
              className="bg-sage hover:bg-white text-white hover:text-sage font-light py-1 px-3 m-3 rounded shadow-md"
            >
              Delete Contact
            </button>
          </div>
        ))}
    </div>
  );
};

export default ContactList;
