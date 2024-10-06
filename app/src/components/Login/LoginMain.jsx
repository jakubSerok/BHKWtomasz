import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAccountBox } from "react-icons/md";
const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    setLoading(true);
    setError("");
    let responseData;
    try {
      await fetch(`${apiUrl}/login`, {
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
        localStorage.setItem(
          "username",
          formData.username || responseData.username
        ); // Save username

        if (responseData.accountType === "admin") {
          navigate("/admin");
        } else {
          navigate("/user"); // Navigate to user panel
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
      await fetch(`${apiUrl}/signup`, {
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
    if (loading) return;
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
    <div className="w-full md:h-[100vh] pt-[100px] flex justify-center items-center">
      <div className="w-[90%] max-w-[580px] h-auto md:h-[650px] bg-[#031124] py-[40px] px-[20px] md:px-[60px] rounded-3xl">
        <h1 className="my-[20px] font-bold text-[24px] md:text-[30px] text-white">
          {state}
        </h1>

        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col gap-[20px] md:gap-[29px] mt-[30px]">
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Ihr Name"
              className="h-[60px] md:h-[72px] w-full pl-[20px] border border-[#c9c9c9] outline-none text-[#5c5c5c] text-[16px] md:text-[18px] rounded-full"
            />
          ) : null}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Ihre E-Mail"
            className="h-[60px] md:h-[72px] w-full pl-[20px] border border-[#c9c9c9] outline-none text-[#5c5c5c] text-[16px] md:text-[18px] rounded-full"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Passwort"
            className="h-[60px] md:h-[72px] w-full pl-[20px] border border-[#c9c9c9] outline-none text-[#5c5c5c] text-[16px] md:text-[18px] rounded-full"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full h-[60px] md:h-[72px] text-white bg-[#ff4141] mt-[20px] md:mt-[30px] text-[20px] md:text-[24px] font-medium cursor-pointer rounded-full"
        >
          {loading ? "Laden..." : "Weitermachen"}
        </button>

        {state === "Sign Up" ? (
          <p className="mt-[20px] text-[#5c5c5c] text-[16px] md:text-[18px]">
            Sie haben bereits ein Konto?{" "}
            <span
              className="text-[#ff4141] font-bold cursor-pointer"
              onClick={() => setState("Login")}
            >
              Melden Sie sich hier an
            </span>
          </p>
        ) : (
          <p className="mt-[20px] text-white text-[16px] md:text-[18px]">
            Ein Konto erstellen?{" "}
            <span
              className="text-[#ff4141] font-bold cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Klicken Sie hier
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
