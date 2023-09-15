import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { userName: userName } = useParams();
  const { userZipCode: userZipCode } = useParams();

  const { loading, data } = useQuery(userName ? QUERY_USER : QUERY_ME, {
    variables: [{ userName: userName }, { userZipCode: userZipCode }],
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if userName is yours
  if (Auth.loggedIn() && Auth.getProfile().data.userName === userName) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.userName) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
      <div className="flex flex-col md:flex-row items-center px-10 py-20 md:mx-20">
        <div className="flex flex-col lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 items-center md:items-start text-center md:text-left mb-16 md:mb-0">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-green font-display">
            Welcome, {user.userName}!
          </h1>
          <p className="leading-relaxed mb-2">Currently shipping from {user.userZipCode}.</p>

          <ContactForm />
        </div>

        <div>
            <ContactList
              contacts={user.contacts}
              title={`${user.userName}'s contactss...`}
              showTitle={false}
              showUserName={false}
            />
        </div>
      </div>
  );
};

export default Profile;
