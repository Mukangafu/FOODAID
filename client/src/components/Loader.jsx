import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
    </div>
  );
}
