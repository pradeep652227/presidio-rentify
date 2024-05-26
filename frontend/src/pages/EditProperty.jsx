import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {PropertyForm} from "../Components/import-components";
import { useSelector } from "react-redux";

export default function EditProperty() {
  const { slug } = useParams();
  const property = useSelector((state) =>
    state.properties.properties.find((property) => property.slug === slug)
  );
  const user_details = useSelector((state) => state.auth.user_details);
  const navigateTo = useNavigate();
  if (
    user_details.user_role !== "seller" ||
    user_details?.email !== property.listedBy
  ) {
    alert("Only " + property.listedBy + "can edit this post");
    navigateTo("/properties");
  } else {
    alert("Sign in First");
    navigateTo("/login");
  }
  return (
    <>
      <PropertyForm Property={property} />
    </>
  );
}
