import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/global.css"

function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    try {
      const response = await axios.post("/api/user/signup", userInfo);
      toast.success("Signup successful");
      localStorage.setItem("ChatApp", JSON.stringify(response.data));
      setAuthUser(response.data);
    } catch (error) {
      if (error.response) {
        toast.error("Error: " + error.response.data.error);
      }
    }
  };

  return (
    
    <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-r from-gray-950 via-slate-800 to-zinc-900">
      <div className="absolute top-0 left-0 title">
        <h1  className="text-6xl font-bold p-8">BuzzTalk</h1>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Fullname */}
          <div className="relative">
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.fullname ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Fullname"
              {...register("fullname", { required: true })}
            />
            {errors.fullname && (
              <p className="absolute right-4 top-full text-red-500 text-sm">
                This field is required
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="absolute right-4 top-full text-red-500 text-sm">
                This field is required
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="absolute right-4 top-full text-red-500 text-sm">
                This field is required
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type="password"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: true,
                validate: validatePasswordMatch,
              })}
            />
            {errors.confirmPassword && (
              <p className="absolute right-4 top-full text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Signup
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;