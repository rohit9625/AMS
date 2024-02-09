import { React, useEffect, useState } from "react";

export default function MarkAttendance({ students, facultyID }) {
  const currentDate = new Date().toLocaleDateString(); // Get current date
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [subject, setSubject] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const handleStatusChange = (studentId, status) => {
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [studentId]: status,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ facultyID }),
      });

      const data = await response.json();
      setSubject(data.subject);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const attendanceEmpty = Object.keys(attendanceStatus).length === 0; 

    if (attendanceEmpty) {
      setErrorMsg("All fields must be selected");
      return;
    }
    setErrorMsg("");

    const attendance = {
        attendanceStatus: attendanceStatus,
        currentDate: currentDate,
        subject: subject
    }

    try {
      const response = await fetch("/api/insert_attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendance),
      });
      
      const data = await response.json();

      if(response.ok) {
        setErrorMsg(data.msg);
        console.log("Attendance submitted successfully");
      }else {
        setErrorMsg(data.error)
        console.log("Failed to submit attendance");
      }
    } catch (error) {
      console.error("Error storing attendance: ", error);
      return;
    }
  };

  return (
    <div className="bg-white space-y-2 rounded-lg h-full px-0 relative shadow-2xl">
      <div className="w-full relative h-14 bg-[#2A628F] rounded-t-lg text-white flex justify-around items-center">
        <div className="font-semibold text-xl">
          <h1>Subject: {subject.name}</h1>
        </div>
        <div className="text-lg font-semibold bg-white text-black px-4 py-1 rounded-lg">
          <h2>Date: {currentDate}</h2>
        </div>
      </div>
      <p className="text-center h-8 text-red-500 font-semibold text-lg">
        {errorMsg}
      </p>
      <div className="px-8">
        <table className="min-w-full bg-white table-fixed border-collapse">
          <thead className="bg-[#B6DCFE] text-black">
            <tr className="">
              <th className="w-16 border border-black">Sr.</th>
              <th className="py-2 px-4 border border-black">Name</th>
              <th className="py-2 px-4 border border-black">Roll No</th>
              <th className="py-2 px-4 border border-black">Branch</th>
              <th className="py-2 px-4 border border-black">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id} className="text-center">
                <td className="py-2 px-4 border border-black">{index + 1}</td>
                <td className="py-2 px-4 border border-black">
                  {student.name}
                </td>
                <td className="py-2 px-4 border border-black">
                  {student.roll_no}
                </td>
                <td className="py-2 px-4 border border-black">
                  {student.branch}
                </td>
                <td className="py-2 border border-black ">
                  <div className="flex justify-center space-x-4">
                    <label className="">
                      <input
                        type="radio"
                        name={`status_${student.id}`}
                        value="present"
                        checked={attendanceStatus[student.id] === "present"}
                        onChange={() =>
                          handleStatusChange(student.id, "present")
                        }
                      />
                      Present
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`status_${student.id}`}
                        value="absent"
                        checked={attendanceStatus[student.id] === "absent"}
                        onChange={() =>
                          handleStatusChange(student.id, "absent")
                        }
                      />
                      Absent
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={handleSubmit}
          className="font-semibold text-lg mt-4 hover:shadow-xl shadow-gray-500 transition-all duration-300 border-2 focus:bg-cyan-700 focus:text-white border-cyan-700 rounded-lg px-6 py-2 text-cyan-700 absolute top-50 right-10"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
