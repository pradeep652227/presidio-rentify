import React, { useState } from "react";
import { Input, Button } from "../import-components";
import axios from "axios";
import { login } from "../../features/authSlice";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    user_role: "",
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl mt-4">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-wrap flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4 text-xl font-bold text-center">New User Registration</h2>
          <Input
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <Input
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="user_role"
            >
              Role
            </label>
            <select
              id="user_role"
              name="user_role"
              value={formData.user_role}
              onChange={(e) => handleChange(e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select role</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>
          {{ error } && <p className="text-center text-rose-900">{error}</p>}
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Signup
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //send post route to backend
    axios
      .post("/register-user-server", formData)
      .then((result) => {
        dispatch(login(result.data));
        navigateTo("/");
      })
      .catch((err) => {
        setError(
          err.response?.data?.error_msg ||
            "Can not create User. Kindly contact the Developer."
        );
      });
  }
}
