import React from "react";
import slugify from "slugify";

const SectionAccordian = ({ nameOfSection, topics, getCode }) => {
  return (
    <div>
      <div className="collapse collapse-arrow bg-base-200 rounded-none border border-slate-600 p-0">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-medium capitalize">
          {nameOfSection}
        </div>
        <div className="collapse-content bg-slate-300 text-black">
          <ul>
            {topics?.map((e, i) => (
              <li
                onClick={() => getCode(slugify(e))}
                className="capitalize cursor-pointer my-1 hover:bg-slate-400 w-full px-4 py-1 transition-all rounded-lg"
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
