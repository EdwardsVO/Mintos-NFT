import React from 'react';

export default function Loader() {
  return (
    <div className="h-screen flex items-center">
      <img
        src="/logo.png"
        alt=""
        className="w-72 h-52 animate-bounce duration-200"
      />
    </div>
  );
}
