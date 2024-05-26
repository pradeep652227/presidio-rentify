import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
const isLogged=useSelector(state=>state.auth.isLogged);
const user_details=useSelector(state=>state.auth.user_details);

  return (
    <div id="home-container" className="flex flex-wrap min-h-screen flex-col">
      <h1 className="text-3xl text-center mt-4">Welcome to Rentify!! {isLogged && `${user_details.first_name}`}</h1>
      <p className="text-xl text-center mt-4">
        Sellers can List their properties and Buyers can show their Interests on
        these properties.
      </p>
      <p className="text-xl text-center mt-2">
        {!isLogged && "Login Now to list/browse any properties"}
      </p>
    </div>
  );
}
