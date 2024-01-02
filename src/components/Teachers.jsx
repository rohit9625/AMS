// src/components/TeacherTable.js
import {React, useState} from "react";
import Link from "next/link";
import TeacherDetails from "./TeacherDetails";

const Teachers = ({ teachers }) => {

  return (
    <div className="px-4 flex flex-col space-y-2">
      {/* Table Headings*/}
      <div className="flex w-full space-x-6 items-center pb-2 px-8 font-semibold">
        <div className="w-4">Sr.</div>
        <div className="w-1/4">Name</div>
        <div className="w-1/4">Department</div>
        <div className="w-1/4">Department ID</div>
      </div>
      {/* Table Data*/}
      {teachers.map((teacher, index) => (
        <div key={index} className="flex flex-col w-full rounded-lg px-8 bg-cyan-100 relative">
          <div className="flex w-full h-16 space-x-6 items-center">
            <div className="w-4">1.</div>
            <div className="w-1/4 ">{teacher.name}</div>
            <div className="w-1/4 ">{teacher.department}</div>
            <div className="w-1/4 flex justify-between">{teacher.id}</div>
          </div>
          {/* Expanded Details */}
          <TeacherDetails teacher={teacher}/>
        </div>
      ))}
    </div>
  );
};

export default Teachers;
