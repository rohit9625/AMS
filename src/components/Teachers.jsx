// src/components/TeacherTable.js
import {React, useState} from "react";
import Link from "next/link";
import TeacherDetails from "./TeacherDetails";

const Teachers = ({ faculties }) => {

  return (
    <div className="px-4 flex flex-col space-y-2">
      {/* Table Headings*/}
      <div className="flex w-full space-x-6 items-center pb-2 px-8 font-semibold">
        <div className="w-4">Sr.</div>
        <div className="w-1/4">Name</div>
        <div className="w-1/4">Department</div>
      </div>
      {/* Table Data*/}
      {faculties.map((faculty, index) => (
        <div key={index} className="flex flex-col w-full rounded-lg px-8 bg-cyan-100 relative">
          <div className="flex w-full h-16 space-x-6 items-center">
            <div className="w-4">{index+1}</div>
            <div className="w-1/4 ">{faculty.name}</div>
            <div className="w-1/4 ">{faculty.department}</div>
          </div>
          {/* Expanded Details */}
          <TeacherDetails faculty={faculty}/>
        </div>
      ))}
    </div>
  );
};

export default Teachers;
