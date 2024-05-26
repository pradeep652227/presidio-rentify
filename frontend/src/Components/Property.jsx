import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./import-components";
import axios from "axios";
import { removeProperty } from "../features/propertiesSlice";

export default function Property() {
  const { slug } = useParams();
  const property = useSelector((state) =>
    state.properties.properties.find((property) => property.slug === slug)
  );
  const [error, setError] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  if (!property) {
    return <div>Property not found</div>;
  }

  const fields = ["Price", "Place", "State", "Area", "PIN Code"];

  return (
    <div className="container mx-auto p-4">
      <div className="relative">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Property Details:-
        </h1>
        {error && <p className="text-rose-900 text-md text-center">{error}</p>}
      </div>

      <div className="flex flex-wrap gap-4 justify-around">

        <div className="border-2 rounded-md shadow-xl">
          <strong>Place</strong> {property.place}
        </div>
        <div className="border-2 rounded-md shadow-xl">
          <strong>State</strong> {property.state}
        </div>
        <div className="border-2 rounded-md shadow-xl">
          <strong>Area</strong> {property.area}
        </div>
        <div className="border-2 rounded-md shadow-xl">
          <strong>Price</strong> {property.Price}
        </div>
        <div className="border-2 rounded-md shadow-xl">
          <strong>Number Of Bedrooms</strong> {property.bedrooms}
        </div>
        <div className="border-2 rounded-md shadow-xl">
          <strong>Number Of Bathrooms</strong> {property.bathrooms}
        </div>
        <div className="border-2 rounded-md shadow-xl">
          <strong>Nearby Hospitals</strong> {property.hostpitals}
        </div>
        <div className="border-2 rounded-md shadow-xl">
          <strong>Nearby Schools</strong> {property.schools}
        </div>
        <div className="border-2 rounded-md shadow-xl">
          <strong>Nearby Colleges</strong> {property.colleges}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <Button
          className="bg-blue-400 hover:shadow-md px-4"
          onClick={() => navigateTo(`/edit-property/${property.slug}`)}
        >
          Edit
        </Button>
        <Button className="bg-rose-600 hover:shadow-md" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );

  function handleDelete() {
    axios
      .delete("/delete-property-server/" + property._id)
      .then((res) => {
        if (res) {
          dispatch(removeProperty(property._id));
          alert("Property Deleted Successfully");
          navigateTo("/properties");
        } else {
          alert(`Property can not be deleted`);
        }
      })
      .catch((err) => {
        setError(err.response?.data?.error_msg || "Error from the backend");
      });
  }
}
