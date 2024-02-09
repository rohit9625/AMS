import { React, useEffect, useState } from "react";

export default function StudentView({ student }) {
  const [attendance, setAttendance] = useState([]);
  const subject = {
    name: "DBMS",
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({studentID: student.id}),
      });

      const data = await response.json();
      if (response.ok) {
        setAttendance(data.attendanceData);
        console.log(data.attendanceData);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white space-y-2 rounded-lg h-full px-0 relative shadow-2xl">
      <div className="w-full relative h-14 bg-[#2A628F] rounded-t-lg text-white flex justify-around items-center">
        <div className="font-semibold text-xl">
          <h1>Subject: {subject.name}</h1>
        </div>
      </div>
      <div className=" w-full max-w-[500px] mx-auto bg-white border-2 rounded-lg py-4 px-8 flex flex-col space-y-1 justify-center items-center">
        <div className="flex w-full justify-between">
          <span className="font-semibold">Name: </span>
          <span>{student.name}</span>
        </div>
        <div className="flex w-full justify-between">
          <span className="font-semibold">Roll No: </span>
          <span>{student.roll_no}</span>
        </div>
        <div className="flex w-full justify-between">
          <span className="font-semibold">Email: </span>
          <span>{student.email}</span>
        </div>
        <div className="flex w-full justify-between">
          <span className="font-semibold">Contact No: </span>
          <span>{student.contact}</span>
        </div>
        <div className="flex w-full justify-between">
          <span className="font-semibold">Contact No: </span>
          <span>{student.branch}</span>
        </div>
      </div>
      <div className="px-8 py-4">
        <table className="min-w-full bg-white table-fixed border-collapse">
          <thead className="bg-[#B6DCFE] text-black">
            <tr className="">
              <th className="w-16 border border-black">Sr.</th>
              <th className="py-2 px-4 border border-black">Subjects</th>
              <th className="py-2 px-4 border border-black">Subject Code</th>
              <th className="py-2 px-4 border border-black">Total Lectures</th>
              <th className="py-2 px-4 border border-black">Lectures Attend</th>
              <th className="py-2 px-4 border border-black">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border border-black">{index + 1}</td>
                <td className="py-2 px-4 border border-black">
                  {row.subject_name}
                </td>
                <td className="py-2 px-4 border border-black">
                  {row.subject_code}
                </td>
                <td className="py-2 px-4 border border-black">
                  {row.total_lectures}
                </td>
                <td className="py-2 px-4 border border-black">
                  {row.attended_lectures}
                </td>
                <td className="py-2 px-4 border border-black">
                  {(row.attended_lectures / row.total_lectures) * 100}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
