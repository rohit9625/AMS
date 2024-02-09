import { React, useState, useEffect } from "react";

export default function Attendance({ students, subjects }) {
  const [attendance, setAttendance] = useState([]);
  const [studentsWithAttendance, setStudentsWithAttendance] =
    useState(students);

  useEffect(() => {
    // Fetch attendance of all students from the database
    const fetchAttendance = async () => {
      try {
        const response = await fetch("/api/attendance");
        const data = await response.json();
        setAttendance(data.attendance);

        // Update students with attendance data
        setStudentsWithAttendance((prevStudents) => {
          const updatedStudents = prevStudents.map((student) => {
            const studentAttendance = data.attendance.filter(
              (entry) => entry.student_id === student.id
            );

            return {
              ...student,
              attendance: studentAttendance,
            };
          });

          return updatedStudents;
        });
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    // Call the fetchAttendance function
    fetchAttendance();
  }, []);

  // Check if any of the data is not available
  if (!subjects.length || !students.length || !attendance.length) {
    return (
      <div className="mx-auto mt-10 font-bold text-2xl">
        Attendance Not Found
      </div>
    ); // or any loading indicator
  }

  return (
    <div className="bg-white space-y-2 rounded-lg h-full px-0 relative shadow-2xl">
      <div className="w-full px-4 py-8 text-xs">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-[#B6DCFE] text-black">
            <tr className="">
              <th className="py-2 px-4 border border-black">Name</th>
              <th className="py-2 px-4 border border-black">Roll No</th>
              {/* Subjects */}
              {subjects.map((subject, index) => {
                return (
                  <th key={index} className="py-2 px-4 border border-black">
                    {subject.name}
                  </th>
                );
              })}
              <th className="py-2 px-4 border border-black">Total Lectures</th>
              <th className="py-2 px-4 border border-black">Percentage</th>
            </tr>
          </thead>
          <tbody className="border">
            {studentsWithAttendance.map((student, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border border-black">
                  {student.name}
                </td>
                <td className="py-2 px-4 border border-black">
                  {student.roll_no}
                </td>
                {student.attendance.length > 0
                  ? student.attendance.map((row, index) => (
                      <td key={index} className="py-2 px-4 border border-black">
                        {row.attended_lectures}
                      </td>
                    ))
                  : // Display 0 for all subjects when attendance array is empty
                    subjects.map((subject, index) => (
                      <td key={index} className="py-2 px-4 border border-black">
                        0
                      </td>
                    ))}
                <td className="py-2 px-4 border border-black">
                  {student.attendance.reduce((totalAttended, subject) => {
                    return totalAttended + subject.attended_lectures;
                  }, 0)}
                </td>
                <td className="py-2 px-4 border border-black">
                  {(student.attendance.reduce((totalAttended, subject) => {
                    return totalAttended + subject.attended_lectures;
                  }, 0) /
                    studentsWithAttendance[0].attendance.reduce(
                      (totalLectures, subject) => {
                        return totalLectures + subject.attended_lectures;
                      },
                      0
                    )) *
                    100}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
