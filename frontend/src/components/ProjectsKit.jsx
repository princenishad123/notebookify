import React from "react";

const ProjectsKit = () => {
  let description =
    "Lorem ipsum dolor, sit amet  consectetur adipisicing elit. Minus, ex. lore ajkdfh adfha lsdkfhas dkfjsdh akjsdfh ahf  dfjasd flkasdjf alkjdf asldkfja ";
  return (
    <div className="max-w-xs min-h-24 mx-4 m-4 rounded-lg border border-slate-400 cursor-pointer p-2 font-semibold">
      <h2 className="text-xl text-slate-300">Title</h2>
      <p className="text-slate-400">
        {description.length > 100
          ? description.substring(0, 97) + "..."
          : description}
      </p>
    </div>
  );
};

export default ProjectsKit;
