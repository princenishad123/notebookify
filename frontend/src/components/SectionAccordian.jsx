import React from "react";
import slugify from "slugify";

const SectionAccordian = ({ nameOfSection, topics, getCode }) => {
  return (
    <div>
      <div className="collapse bg-white  collapse-arrow  rounded-none border border-slate-600 p-0">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-medium capitalize text-black">
          {nameOfSection}
        </div>
        <div className="collapse-content bg-black text-white">
          <ul>
            {topics?.map((e, i) => (
              <li
                onClick={() => getCode(slugify(e))}
                className="capitalize cursor-pointer my-1 hover:bg-slate-600 w-full px-4 py-1 transition-all rounded-lg"
                key={i}
              >
                {e}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionAccordian;
