import { React, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function login() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    userID: "",
    password: "",
  });

  function triggerLoader() {
    let loader = document.getElementById('loader-bar');

    loader.classList.add('animated-loader')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userID || !formData.password) {
      setErrorMsg("*Please fill all details");
      console.log(errorMsg);
      return;
    } else {
      setErrorMsg("");
    }

    try {
      const response = await fetch("/api/faculty_login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      // Check for response
      if (response.ok) {
        triggerLoader()
        setTimeout(()=> {
          router.push('/')
        }, 2000);
      }
      setErrorMsg(data.msg);
    } catch (error) {
      console.error("Error during login:", error);
    }
    // Add your registration logic here, e.g., send data to a server
  };


  return (
    <div className="w-full h-screen bg-slate-300 flex justify-center items-center">
      <div className="w-full relative max-w-[460px] min-h-[556px] bg-white mx-4 rounded-lg shadow-xl shadow-slate-400 flex space-y-8 flex-col items-center">
        <div id="loader-bar" className="aboslute top-0 left-0 right-0 rounded-t-lg overflow-hidden bg-cyan-700 w-full h-2"></div>
        
        <div>
          <h1 className="text-center text-2xl font-semibold pt-4">
            Login Form
          </h1>
        </div>
        {/* Actions */}
        <p className=" text-red-600 h-1">{errorMsg}</p>
        <form className="w-full max-w-[322px] mx-auto py-6 px-4 border border-slate-300 rounded-lg">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-gray-600"
            >
              User ID:
            </label>
            <input
              type="text"
              id="userID"
              name="userID"
              value={formData.userID}
              onChange={handleChange}
              autoComplete="off"
              className="w-full mt-1 p-2 border rounded-md focus:outline-2 outline-cyan-200"
              placeholder="Enter User ID"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-gray-600"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              className="w-full mt-1 p-2 border rounded-md outline-cyan-200"
              placeholder="Enter Your Password"
            />
          </div>
          <p className="text-sm my-4">
            Forgot password?{" "}
            <Link href="#" className="hover:underline text-blue-700">
              Reset
            </Link>
          </p>
          <div className="w-full flex justify-center">
            <button
              onClick={handleSubmit}
              className=" border-2 border-cyan-700 focus:bg-cyan-700 hover:shadow-xl shadow-slate-300 focus:text-white transition-all duration-300 text-cyan-700 px-6 py-2 rounded-full"
            >
              Login
            </button>
          </div>
        </form>
        <p className="pb-6 text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="hover:underline text-blue-600">
            register
          </Link>
        </p>
        {/* Credits
        <Credits/> */}
      </div>
    </div>
  );
}
