import React from "react";

function MonthSection() {
  return (
    <section
      id="monthSection"
      className="flex justify-center border-b-4 border-b-sage/20"
    >
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-4">
        <img alt="display of current month" src="./month-placeholder.png" />
      </div>
    </section>
  );
}

export default MonthSection;
