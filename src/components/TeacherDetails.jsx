import { React, useState } from "react";

const TeacherDetails = ({ faculty }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <span onClick={handleExpand} className="flex justify-center absolute right-10 top-4 items-center text-3xl cursor-pointer hover:text-cyan-700 font-bold">
        <ion-icon name={expanded ? "chevron-up-outline" : "chevron-down-outline"}></ion-icon>
      </span>
      {expanded && (
        <div style={{maxHeight:`${expanded? "300px" : "0"}`}} className="expanded-details flex w-full gap-20 text-xs px-8 mb-2 items overflow-hidden transition-all duration-300">
          {/* Details */}
          <div className="flex flex-col justify-center gap-1 w-1/2 max-w-[256px]">
            <div className="flex justify-between">
              <p className="font-semibold">Contact No:</p>
              <p>{faculty.contact_no}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Email:</p>
              <p>{faculty.email}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">UserID:</p>
              <p>{faculty.userID}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Password:</p>
              <p>{faculty.password}</p>
            </div>
          </div>
          {/* Photo */}
          <div className="w-28 h-28 rounded-lg bg-slate-200"></div>
        </div>
      )}
    </>
  );
};

export default TeacherDetails;
