import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_CONTACT } from "../../utils/mutations";
import { QUERY_CONTACTS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const ContactForm = () => {
  const [contactFormData, setContactFormData] = useState({
    contactName: '',
    contactZipCode: '',
  });

  const [addContact, { error }] = useMutation(ADD_CONTACT, {
    update(cache, { data: { addContact } }) {
      try {
        const { contacts } = cache.readQuery({ query: QUERY_CONTACTS });

        cache.writeQuery({
          query: QUERY_CONTACTS,
          data: { contacts: [addContact, ...contacts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, contacts: [...me.contacts, addContact] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addContact({
        variables: {
          ...contactFormData,
          contactAuthor: Auth.getProfile().data.userName
        },
      });

      setContactFormData({
        contactName: '',
        contactZipCode: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContactFormData({ ...contactFormData, [name]: value });
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
                    name="contactName"
                    onChange={handleChange}
                    value={contactFormData.contactName}
                    required
                    className="block border border-sage w-full p-3 rounded mb-4"
                  />
                  <input
                    type="text"
                    placeholder="Contact Zip Code"
                    name="contactZipCode"
                    onChange={handleChange}
                    value={contactFormData.contactZipCode}
                    required
                    className="block border border-sage w-full p-3 rounded mb-4"
                  />
                  <button
                    disabled={!contactFormData.contactName && !contactFormData.contactZipCode}
                    type="submit"
                    className="w-full text-center py-3 rounded bg-tangerine hover:bg-white text-white hover:text-tangerine focus:outline-none my-1 shadow-md"
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
          You need to be logged in to share your contacts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ContactForm;
