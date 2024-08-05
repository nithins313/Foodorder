import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "./cartProvider";

const Header = () => {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formLoginErrors, setFormLoginErrors] = useState({});
  const { cart, cartCount } = useContext(CartContext);

  useEffect(() => {
    const usr = localStorage.getItem("username");
    setIsAuthenticated(!!usr);
  }, []);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());

    const regexusr = /^[A-Za-z0-9@#_+\.\-]{4,9}$/;
    const regexpass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;

    let errors = {};

    if (!regexusr.test(formValues.username)) {
      errors.username = "Username must be 4-9 characters long and can include letters, numbers, and special characters @#_+.-";
    }

    if (!regexpass.test(formValues.password)) {
      errors.password = "Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (Object.keys(errors).length === 0) {
      setFormLoginErrors({});
      try {
        const response = await fetch("http://127.0.0.1:5500/user/login", {
          method: "POST",
          body: JSON.stringify(formValues),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (response.ok) {
          localStorage.setItem("username", formValues.username);
          setFormLoginErrors({ global: "Login Successful" });
          setTimeout(() => {}, 5000);
          setIsAuthenticated(true);
          setLogin(false);
        } else {
          const text = await response.text();
          setFormLoginErrors({ global: text });
        }
      } catch (error) {
        setFormLoginErrors({ global: "Network error" });
      }
    } else {
      setFormLoginErrors(errors);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());

    const regexusr = /^[A-Za-z0-9@#_+\.\-]{4,9}$/;
    const regexpass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
    const regexemail = /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/;
    const regexphone = /^[0-9]{10}$/;
    const regexaddress = /^[A-Za-z0-9\.\-, ]*$/;

    let errors = {};

    if (!regexusr.test(formValues.username)) {
      errors.username = "Username must be 4-9 characters long and can include letters, numbers, and special characters @#_+.-";
    }

    if (!regexpass.test(formValues.password)) {
      errors.password = "Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    if (!regexemail.test(formValues.email)) {
      errors.email = "Invalid email address";
    }
    if (!regexphone.test(formValues.phone)) {
      errors.phone = "Phone number must be 10 digits long";
    }
    if (!regexaddress.test(formValues.address)) {
      errors.address = "Address contains invalid characters";
    }

    if (Object.keys(errors).length === 0) {
      setFormErrors({});
      try {
        const response = await fetch("http://127.0.0.1:5500/user/signup", {
          method: "POST",
          body: JSON.stringify(formValues),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (response.ok) {
          localStorage.setItem("username", formValues.username);
          setIsAuthenticated(true);
          setSignup(false);
        } else {
          const text = await response.text();
          setFormErrors({ global: text });
        }
      } catch (error) {
        setFormErrors({ global: "Network error" });
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <>
      <nav className="flex flex-wrap justify-between items-center mx-auto w-full p-4 shadow-md z-10 bg-black text-white">
        <div className="flex text-2xl">
          <img src='/foodorder.png' alt="FoodOrder" className="h-10" />
        </div>
        <div className="flex text-l absolute top-inherit left-1/3 items-center justify-center w-1/3 px-3 py-1 rounded-full bg-white text-black">
          <input
            type="text"
            className="text-base px-2 py-1 rounded-full w-full"
            placeholder="Search"
          />
          <button type="button">
            <img src="/search.svg" alt="Search" width="35px" />
          </button>
        </div>
        <div className="text-2xl flex">
          {!isAuthenticated ? (
            <>
              <button
                type="button"
                className="mx-6"
                onClick={() => setLogin(!login)}
              >
                Login
              </button>
              <button
                type="button"
                className="mx-6"
                onClick={() => setSignup(!signup)}
              >
                Sign up
              </button>
            </>
          ) : (
            <div className="w-10 h-10 flex mx-16">
              <Link to="/profile">
                <img src="/profile.svg" alt="Profile" />
              </Link>
            </div>
          )}
          <div className="w-10 h-10 flex p-2">
            <Link to="/cart">
              <span>
                <img src="/cart.svg" alt="Cart" />
              </span>
              {cartCount > 0 && (
                <span className="ml-2 rounded-full bg-red-500 text-white px-2 py-1 text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
      {login && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
          <div className="fixed inset-0 flex justify-center items-center z-20">
            <div className="bg-white w-1/3 p-8 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <p className="text-3xl">Login</p>
                <img
                  src="/x.svg"
                  alt="Close"
                  className="w-7 h-7 cursor-pointer"
                  onClick={() => setLogin(false)}
                />
              </div>
              <form onSubmit={handleLoginSubmit}>
                {formLoginErrors.global && (
                  <p className="text-red-500 text-xs mb-4">
                    {formLoginErrors.global}
                  </p>
                )}
                <div className="mb-4">
                  <label className="block">Username</label>
                  <input
                    className="w-full p-2 mb-2 border-b-2 outline-none focus:bg-gray-300"
                    type="text"
                    name="username"
                    required
                  />
                  {formLoginErrors.username && (
                    <p className="text-red-500 text-xs">
                      {formLoginErrors.username}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block">Password</label>
                  <input
                    className="w-full p-2 mb-2 border-b-2 outline-none focus:bg-gray-300"
                    type="password"
                    name="password"
                    required
                  />
                  {formLoginErrors.password && (
                    <p className="text-red-500 text-xs">
                      {formLoginErrors.password}
                    </p>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white rounded-full py-2"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {signup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
          <div className="fixed inset-0 flex justify-center items-center z-20">
            <div className="bg-white w-1/3 p-8 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <p className="text-3xl">Sign up</p>
                <img
                  src="/x.svg"
                  alt="Close"
                  className="w-7 h-7 cursor-pointer"
                  onClick={() => setSignup(false)}
                />
              </div>
              <form onSubmit={handleSignupSubmit}>
                {formErrors.global && (
                  <p className="text-red-500 text-xs mb-4">{formErrors.global}</p>
                )}
                <div className="mb-4">
                  <label className="block">Username</label>
                  <input
                    className="w-full p-2 mb-2 border-b-2 outline-none focus:bg-gray-300"
                    type="text"
                    name="username"
                    required
                  />
                  {formErrors.username && (
                    <p className="text-red-500 text-xs">{formErrors.username}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block">Password</label>
                  <input
                    className="w-full p-2 mb-2 border-b-2 outline-none focus:bg-gray-300"
                    type="password"
                    name="password"
                    required
                  />
                  {formErrors.password && (
                    <p className="text-red-500 text-xs">{formErrors.password}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block">Email</label>
                  <input
                    className="w-full p-2 mb-2 border-b-2 outline-none focus:bg-gray-300"
                    type="email"
                    name="email"
                    required
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs">{formErrors.email}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block">Phone</label>
                  <input
                    className="w-full p-2 mb-2 border-b-2 outline-none focus:bg-gray-300"
                    type="text"
                    name="phone"
                    required
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-xs">{formErrors.phone}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block">Address</label>
                  <input
                    className="w-full p-2 mb-2 border-b-2 outline-none focus:bg-gray-300"
                    type="text"
                    name="address"
                    required
                  />
                  {formErrors.address && (
                    <p className="text-red-500 text-xs">{formErrors.address}</p>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white rounded-full py-2"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
