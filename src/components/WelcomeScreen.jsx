import React from "react";
import Link from "next/link";
import Credits from "./Credits";

export default function WelcomeScreen() {
  return (
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
            <Link className="px-20 py-2" href="/login">
              Admin
            </Link>
          </div>
          <div className="w-full py-2 rounded-lg border font-semibold hover:bg-cyan-700 hover:text-white hover:shadow-lg shadow-cyan-300 transition-all duration-300 cursor-pointer text-slate-600 border-cyan-700">
            <Link className="px-20 py-2" href="/faculty_login">
              Faculty
            </Link>
          </div>
          <div className="w-full py-2 rounded-lg border font-semibold hover:bg-cyan-700 hover:text-white hover:shadow-lg shadow-cyan-300 transition-all duration-300 cursor-pointer text-slate-600 border-cyan-700">
            <Link className="px-20 py-2" href="/student_login">
              Student
            </Link>
          </div>
        </div>

        {/* Credits */}
        <Credits />
      </div>
    </div>
  );
}
