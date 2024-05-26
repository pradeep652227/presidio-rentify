/* eslint-disable react/prop-types */
import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "./Reusables/Input";
import axios from "axios";
import { addProperty, removeProperty } from "../features/propertiesSlice";
import { useNavigate } from "react-router-dom";

export default function PropertyForm({ Property }) {
  const user_details = useSelector((state) => state.auth.user_details);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [error, setError] = useState(false);

  useEffect(()=>{
    const user_role=user_details.user_role;
    if(user_role!=="seller"){
        alert('Only a Seller can List a Property');
        navigateTo('/properties');
    }
  },[])

  const [formData, setFormData] = useState({
    place: Property?.place || "",
    state: Property?.state || "",
    area: Property?.area || "",
    pin_code: Property?.pin_code || "",
    price: Property?.price || "",
    number_bedrooms: Property?.number_bedrooms || "",
    number_bathrooms: Property?.number_bathrooms || "",
    hospitals: Property?.hospitals || "",
    colleges: Property?.colleges || "",
    schools: Property?.schools || "",
  });
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4 text-xl font-bold">
            {!Property ? "List" : "Edit"} Property
          </h2>
          <Input
            label="Place"
            name="place"
            value={formData.place}
            onChange={handleChange}
          />
          <Input
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
          <Input
            label="Area"
            name="area"
            value={formData.area}
            onChange={handleChange}
          />
          <Input
            label="PIN Code"
            name="pin_code"
            type="number"
            value={formData.pin_code}
            onChange={handleChange}
          />
          <Input
            label="Number of Bedrooms"
            name="number_bedrooms"
            type="number"
            value={formData.number_bedrooms}
            onChange={handleChange}
            required
          />
          <Input
            label="Number of Bathrooms"
            name="number_bathrooms"
            type="number"
            value={formData.number_bathrooms}
            onChange={handleChange}
            required
          />
            <Input
            label="Listing Price (in Rupees)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <Input
            label="Nearby Hospitals"
            name="number_hospitals"
            type="number"
            value={formData.hospitals}
            onChange={handleChange}
            
          />
          <Input
            label="Nearby Schools"
            name="number_schools"
            type="number"
            value={formData.schools}
            onChange={handleChange}
            
          />
          <Input
            label="Nearby Colleges"
            name="number_colleges"
            type="number"
            value={formData.colleges}
            onChange={handleChange}
          />

          {error && <p className="text-rose-900 text-md">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {!Property ? "Submit" : "Save!!"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Property) {
      //edit the property
      axios
        .patch("/update-property-server", formData)
        .then((result) => {
          if (result) {
            //remove the current property
            const updatedProperty = { ...Property, ...formData };
            dispatch(removeProperty(Property._id));
            //add the updated property
            dispatch(addProperty(updatedProperty));
          } else {
            alert(
              "The Current Property can't be Updated right now. Please try again later"
            );
          }
          navigateTo("/properties");
        })
        .catch((err) => {
          setError(
            err.response?.data?.error_msg ||
              "Error in Updating this Property.\nPlease try again later or contact the Dev."
          );
        });
    } else {
      //create a new property
      formData["user_role"]=user_details.user_role;
      formData["listedBy"]=user_details.email;
      console.log('')
      axios
        .post("/register-property-server", formData)
        .then((result) => {
          if (result) {
            dispatch(addProperty(result.data));
          } else {
            alert(
              "The New Property can't be fetched right now. Please try again later"
            );
          }
          navigateTo("/properties");
        })
        .catch((err) => {
          setError(
            err.response?.data?.error_msg ||
              "Error in Creating an Property.\nPlease try again later or contact the Dev."
          );
        });
    }
  }
}
