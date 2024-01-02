import { React, useState } from "react";

const StudentAttendance = ({ studentID }) => {
  const [expanded, setExpanded] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);

    // Fetch attendance data only if not already fetched
    if (!isFetched && !attendanceData.length) {
      fetchAttendanceData();
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentID: studentID }),
      });

      const data = await response.json();
      setAttendanceData(data.attendanceData);
      setIsFetched(true);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  return (
    <>
      <span
        onClick={handleExpand}
        className="flex justify-center absolute right-10 top-4 items-center text-3xl cursor-pointer hover:text-cyan-700 font-bold"
      >
        <ion-icon
          name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
        ></ion-icon>
      </span>
      {expanded && (
        <div
          style={{ maxHeight: `${expanded ? "300px" : "0"}` }}
          className="expanded-details flex w-full gap-20 text-xs px-8 mb-2 items overflow-hidden transition-all duration-300"
        >
          {/* Details */}
          {attendanceData.length !== 0 ? (
            <table className="min-w-full bg-white border-collapse">
              <thead className="bg-[#B6DCFE] text-black">
                <tr className="">
                  <th className="py-2 px-4 border border-black">Subjects</th>
                  <th className="py-2 px-4 border border-black">
                    Total Lectures
                  </th>
                  <th className="py-2 px-4 border border-black">
                    Attended Lectures
                  </th>
                  <th className="py-2 px-4 border border-black">Percentage</th>
                </tr>
              </thead>
              <tbody className="border">
                {attendanceData.map((row, index) => (
                  <tr key={index} className="text-center">
                    <td className="py-2 px-4 border border-black">
                      {row.subject_name}
                    </td>
                    <td className="py-2 px-4 border border-black">
                      {row.total_lectures}
                    </td>
                    <td className="py-2 px-4 border border-black">
                      {row.attended_lectures}
                    </td>
                    <td className="py-2 px-4 border border-black">
                      {(
                        (row.attended_lectures / row.total_lectures) *
                        100
                      ).toFixed(2)}
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <h1>Attendance not found</h1>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default StudentAttendance;
