import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ThoughtForm from "../components/ThoughtForm";
import ThoughtList from "../components/ThoughtList";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    // <div>
    //   <div className="container flex flex-col md:flex-row px-10 py-20 mx-auto">
    // <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
    //   Welcome, {user.username}!
    // </h2>
    //     {!userParam && (
    //       <div
    //         className="col-12 col-md-10 mb-3 p-3"
    //         style={{ border: '1px dotted #1a1a1a' }}
    //       >
    //         <ThoughtForm />
    //       </div>
    //     )}
    //     <div className="col-12 col-md-10 mb-5">
    //       <ThoughtList
    //         thoughts={user.thoughts}
    //         title={`${user.username}'s thoughts...`}
    //         showTitle={false}
    //         showUsername={false}
    //       />
    //     </div>

    //   </div>
    // </div>
    <section id="profile">
      <div className="container flex flex-col md:flex-row px-10 py-20 mx-auto">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-green font-display">
            Welcome, {user.username}!
          </h1>
          <p className="leading-relaxed mb-2">Currently shipping from 12345.</p>

          <ThoughtForm />
        </div>

        <div>
            <ThoughtList
              thoughts={user.thoughts}
              title={`${user.username}'s thoughts...`}
              showTitle={false}
              showUsername={false}
            />
        </div>
      </div>
    </section>
  );
};

export default Profile;
