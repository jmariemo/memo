import React from "react";

import { footerData } from "./footerData";

const Footer = () => {

  return (

<footer className="bottom-0 text-white md:text-green bg-green md:bg-white">
      <div className="flex flex-col md:flex-row p-3 text-center md:justify-end">

        <div className="font-display text-md">served by scheduleSquad 2023</div>
        <div className="flex flex-col mt-2 md:mt-0">
          {footerData.map((teammate) => (
            <div>
              <a
                href={teammate.gitHubLink}
                className="text-white md:text-green hover:text-tangerine p-2"
                target="blank"
              >
                {teammate.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer>

  );
};

export default Footer;
