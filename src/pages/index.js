import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Dashboard from "@/components/Dashboard";
import Credits from "@/components/Credits";
import { isTokenValid } from "@/utils/auth";
import { useState, useEffect } from "react";
import Attendance from "@/components/Attendance";

// This function will run on the server
// This function will run on the server
export async function getServerSideProps(context) {
  const token = context.req.cookies.token || ""; // Retrieve the token from cookies

  const isLoggedIn = isTokenValid(token);
  return {
    props: {
      isLoggedIn,
    },
  };
}

export default function Home({ isLoggedIn }) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [enrollmentOptions, setEnrollmentOptions] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch students
        const studentsResponse = await fetch("/api/students");
        const studentsData = await studentsResponse.json();
        setStudents(studentsData);

        // Fetch enrollmentOptions
        const enrollmentResponse = await fetch("/api/enrollment");
        const enrollmentOptionsData = await enrollmentResponse.json();
        setEnrollmentOptions(enrollmentOptionsData);

        // Fetch subjects
        const subjectsResponse = await fetch("/api/subjects");
        const subjectsData = await subjectsResponse.json();
        setSubjects(subjectsData.subjects);

        // Cache the data in localStorage
        localStorage.setItem("students", JSON.stringify(studentsData));
        localStorage.setItem(
          "enrollmentOptions",
          JSON.stringify(enrollmentOptionsData)
        );
        localStorage.setItem("subjects", JSON.stringify(subjectsData.subjects));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Check if data is already in cache
    const cachedStudents = localStorage.getItem("students");
    const cachedEnrollmentOptions = localStorage.getItem("enrollmentOptions");
    const cachedSubjects = localStorage.getItem("subjects");

    if (!cachedStudents || !cachedEnrollmentOptions || !cachedSubjects) {
      // Data not in cache, fetch it
      fetchData();
    } else {
      // Data is in cache, use it
      setStudents(JSON.parse(cachedStudents));
      setEnrollmentOptions(JSON.parse(cachedEnrollmentOptions));
      setSubjects(JSON.parse(cachedSubjects));
    }
  }, []);

  const handleLogout = () => {
    // Remove data from localStorage
    localStorage.removeItem("students");
    localStorage.removeItem("enrollmentOptions");
    localStorage.removeItem("subjects");

    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;";

    // Reload the page
    window.location.reload();
  };

  return (
    <>
      <Head>
        <title>AMS : Attendance Management System</title>
        <meta name="description" content="" />
      </Head>
      <Script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      />
      <Script
        strategy="beforeInteractive"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      />
      {!isLoggedIn ? (
        <div className="w-full h-screen bg-slate-300 flex justify-center items-center">
          <div className="w-full max-w-[460px] h-2/3 bg-white mx-4 rounded-lg shadow-xl shadow-slate-400 flex space-y-14 flex-col items-center">
            <div>
              <h1 className="text-center text-3xl font-semibold pt-4">
                Welcom to AMS
              </h1>
              <p className="text-sm">Your Attendance Management System</p>
            </div>
            {/* Actions */}
            <div className="text-md w-1/2 space-y-4 text-center p-2">
              <p className="text-md">Continue as</p>
              <div className="w-full py-2 rounded-lg border font-semibold hover:bg-cyan-700 hover:text-white hover:shadow-lg shadow-cyan-300 transition-all duration-300 cursor-pointer text-slate-600 border-cyan-700">
                <Link className="" href="/login">
                  Admin
                </Link>
              </div>
              <div className="w-full py-2 rounded-lg border font-semibold hover:bg-cyan-700 hover:text-white hover:shadow-lg shadow-cyan-300 transition-all duration-300 cursor-pointer text-slate-600 border-cyan-700">
                <Link className="w-full" href="#">
                  Faculty
                </Link>
              </div>
              <div className="w-full py-2 rounded-lg border font-semibold hover:bg-cyan-700 hover:text-white hover:shadow-lg shadow-cyan-300 transition-all duration-300 cursor-pointer text-slate-600 border-cyan-700">
                <Link className="w-full" href="#">
                  Student
                </Link>
              </div>
            </div>

            {/* Credits */}
            <Credits />
          </div>
        </div>
      ) : (
        <div className="flex">
          {/* Left Side Bar */}
          <NavBar
            setActiveSection={setActiveSection}
            activeSection={activeSection}
          />
          {/* Right Side Bar */}
          <div className="w-full h-screen flex flex-col">
            {/* Header */}
            <div className="bg-white w-full h-20 relative flex justify-center items-end p-4">
              <button
                onClick={handleLogout}
                className="text-4xl absolute right-8 top-4 cursor-pointer rounded-lg transition-all duration-300 hover:shadow-2xl shadow-slate-700"
              >
                <ion-icon name="log-out-outline"></ion-icon>
              </button>
              <span className="bg-white w-1/2 h-10 rounded-full text-center border-2">
                Search Bar
              </span>
            </div>
            {/* Main Div */}
            {activeSection === "dashboard" ? (
              <Dashboard
                students={students}
                enrollmentOptions={enrollmentOptions}
              />
            ) : activeSection === "attendance" ? (
              <Attendance students={students} subjects={subjects} />
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
}
