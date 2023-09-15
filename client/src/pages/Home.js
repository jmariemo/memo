import React from "react";

const Home = () => {
  return (
    <section id="landing">
      <div className="container mx-auto flex px-10 pt-20 pb-10 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h3 className="mb-2 leading-relaxed font-sans">
            Anniversaries, birthdays...
          </h3>
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-tangerine font-display">
            memo
            <br className="hidden lg:inline-block" /> helps you remember.
          </h1>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="alarm clock"
            src="./alarm.jpg"
          />
        </div>
      </div>
      <section className="mb-5">
        <div className="flex flex-col items-center">
          <div className="mb-4 mx-2 pb-1 max-w-sm text-xl text-center text-black font-display">
            <a className="text-tangerine">memo</a> reminds you when to send
            meaningful messages & important items.
          </div>
          <div className="flex flex-col md:flex-row gap-6 m-4 p-4 text-l font-sans">
            <img
              className="max-w-[12%] md:max-h-9 -mb-10 -ml-3 md:-mr-10 md:-mt-2 z-10"
              src="./1.png"
            />
            <div className="bg-vanilla rounded shadow-md pl-6 pr-2 py-1">
              memo creates a profile with your zip code.
            </div>
            <img
              className="max-w-[12%] md:max-h-9 -mb-10 -ml-3 md:-mr-10 md:-mt-2 z-10"
              src="./2.png"
            />
            <div className="bg-vanilla rounded shadow-md pl-6 pr-2 py-1">
              you add contacts with events & zip codes.
            </div>
            <img
              className="max-w-[12%] md:max-h-9 -mb-10 -ml-3 md:-mr-10 md:-mt-2 z-10"
              src="./3.png"
            />
            <div className="bg-vanilla rounded shadow-md pl-6 pr-2 py-1">
              memo reminds you when to send important items based on the
              relationship between you & your contacts' ship zones.
            </div>
            <img
              className="max-w-[12%] md:max-h-9 -mb-10 -ml-3 md:-mr-10 md:-mt-2 z-10"
              src="./4.png"
            />
            <div className="bg-vanilla rounded shadow-md pl-6 pr-2 py-1">
              your items arrive on time! (and your loved ones feel special that
              you finally remembered them)
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
