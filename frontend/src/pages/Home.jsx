import React from "react";

export default function Home() {
  return (
    <div id="home-container" className="flex flex-wrap min-h-screen flex-col">
      <h1 className="text-3xl text-center mt-4">Welcome to Rentify!!</h1>
      <p className="text-xl text-center mt-4">
        Sellers can List their properties and Buyers can show their Interests on
        these properties.
      </p>
      <p className="text-xl text-center mt-2">
        Login Now to list/browse any properties
      </p>
    </div>
  );
}
