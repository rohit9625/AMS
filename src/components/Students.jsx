import { React, useState } from "react";
import Link from "next/link";
import StudentAttendance from "./StudentAttendance";

export default function Students({ students }) {
  // const students = [
  //   {
  //     id: 1,
  //     name: "Rohit Verma",
  //     roll_no: 123124,
  //     branch: "CSE",
  //     attendance: [
  //       { subject: "Mathematics", totalLectures: 20, attendedLectures: 15 },
  //       { subject: "Physics", totalLectures: 18, attendedLectures: 12 },
  //       { subject: "Chemistry", totalLectures: 22, attendedLectures: 18 },
  //       // Add more rows as needed
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Subodh Raturi",
  //     roll_no: 123126,
  //     branch: "CSE",
  //     attendance: [
  //       { subject: "Mathematics", totalLectures: 20, attendedLectures: 15 },
  //       { subject: "Physics", totalLectures: 18, attendedLectures: 12 },
  //       { subject: "Chemistry", totalLectures: 22, attendedLectures: 18 },
  //       // Add more rows as needed
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "Ashutosh Mishra",
  //     roll_no: 123125,
  //     branch: "CSE",
  //     attendance: [
  //       { subject: "Mathematics", totalLectures: 20, attendedLectures: 15 },
  //       { subject: "Physics", totalLectures: 18, attendedLectures: 12 },
  //       { subject: "Chemistry", totalLectures: 22, attendedLectures: 18 },
  //       // Add more rows as needed
  //     ],
  //   },
  // ];


  return (
    <div className="px-4 flex flex-col space-y-2">
      {/* Table Headings*/}
      <div className="flex w-full space-x-6 items-center pb-2 px-8 font-semibold">
        <div className="w-4">Sr.</div>
        <div className="w-1/4">Name</div>
        <div className="w-1/4">Roll No.</div>
        <div className="w-1/4">Branch</div>
      </div>
      {/* Table Data*/}
      {students.map((student, index) => (
        <div
          key={index}
          className="flex flex-col w-full rounded-lg px-8 bg-cyan-100 relative"
        >
          <div className="flex w-full h-16 space-x-6 items-center">
            <div className="w-4">{index+1}</div>
            <div className="w-1/4 ">{student.name}</div>
            <div className="w-1/4 ">{student.roll_no}</div>
            <div className="w-1/4 flex justify-between">{student.branch}</div>
          </div>
          {/* Expanded Details */}
          <StudentAttendance studentID={student.id} attendance={student.attendance} />
        </div>
      ))}
    </div>
  );
}
