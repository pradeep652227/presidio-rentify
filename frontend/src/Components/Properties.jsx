import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { addPropertyArray } from "../features/propertiesSlice";
import Loading from "./Reusables/Loading";

export default function Properties() {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties.properties);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [propertyArray, setPropertyArray] = useState(properties);

  useEffect(() => {
    setLoader(true);
    if (properties.length===0) {
      axios
        .get("/api/get-properties")
        .then((result) => {
          console.log(result);
          dispatch(addPropertyArray(result.data));
          setPropertyArray(result.data);
        })
        .catch((err) => {
          setError(
            err.response?.data?.error_msg ||
              "Error in getting all the Properties array"
          );
        });
    } else {
      console.log('inside else');
      setPropertyArray(properties);
    }
    setLoader(false);
  }, []);

  let content = propertyArray.map((property) => (
    <Link
      to={`/properties/${property.slug}`}
      key={property._id}
      className="block p-4 bg-white shadow rounded mb-4 hover:shadow-xl duration-200"
    >
      <h3 className="text-xl font-bold">{property.place}</h3>
      <p>State: {property.state}</p>
      <p>Price: {property.price} Rupees</p>
    </Link>
  ));

  return loader ? (
    <Loading />
  ) : (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Properties</h1>
      {error && { error }}
     
      <div className="flex flex-wrap justify-center gap-4">
         {content}
      </div>
    </div>
  );
}
