import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { MdAccountBox } from "react-icons/md";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState(""); // Error message state
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Initialize navigation

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    setLoading(true);
    setError(""); // Clear any previous error messages
    let responseData;
    try {
      await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => (responseData = data));

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        localStorage.setItem("accountType", responseData.accountType);

        // Check if the user is an admin and redirect accordingly
        if (responseData.accountType === "admin") {
          navigate("/admin"); // Redirect to admin panel
        } else {
          window.location.replace("/"); // Redirect normal users to home
        }
      } else {
        setError(responseData.errors || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  const signup = async () => {
    setLoading(true);
    setError("");
    let responseData;
    try {
      await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => (responseData = data));

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        setError(responseData.errors || "Signup failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    if (loading) return; // Prevent multiple submissions during loading
    if (
      !formData.email ||
      !formData.password ||
      (state === "Sign Up" && !formData.username)
    ) {
      setError("All fields are required");
      return;
    }
    state === "Login" ? login() : signup();
  };

  return (
    <div className="w-full h-[100vh]  pt-[100px]">
      <div className="w-[580px] h-[650px] bg-[#031124] m-auto py-[40px] px-[60px] rounded-3xl">
        <h1 className="my-[20px] font-bold text-[30px] text-white">{state}</h1>

        {/* Error message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="flex flex-col gap-[29px] mt-[30px]">
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
              className="h-[72px] w-full pl-[20px] border border-[#c9c9c9] outline-none text-[#5c5c5c] text-[18px] rounded-full"
            />
          ) : null}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Twój email"
            className="h-[72px] w-full pl-[20px] border border-[#c9c9c9] outline-none text-[#5c5c5c] text-[18px] rounded-full"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Hasło"
            className="h-[72px] w-full pl-[20px] border border-[#c9c9c9] outline-none text-[#5c5c5c] text-[18px] rounded-full"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full h-[72px] text-white bg-[#ff4141] mt-[30px] text-[24px] font-medium cursor-pointer rounded-full"
        >
          {loading ? "Loading..." : "Continue"}
        </button>

        {state === "Sign Up" ? (
          <p className="mt-[20px] text-[#5c5c5c] text-[18px]">
            Already have an account?{" "}
            <span
              className="text-[#ff4141] font-bold cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-[20px] text-white text-[18px]">
            Create an account?{" "}
            <span
              className="text-[#ff4141] font-bold cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
