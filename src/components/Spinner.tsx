import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-16 h-16 border-8 border-t-8 border-lightgray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;