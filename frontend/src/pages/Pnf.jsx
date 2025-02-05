import React from "react";
import { useNavigate } from "react-router-dom";

const Pnf = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-[88vh] content-center">
      <div>
        <h2 className="font-semibold text-center">404 Page not found</h2>
        <button className="btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Pnf;
