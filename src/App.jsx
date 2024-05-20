import React, { useState, useEffect } from "react";
import CourseInput from "./components/CourseInput";

const App = () => {
  const [courses, setCourses] = useState([
    ["", 0, ""],
    ["", 0, ""],
    ["", 0, ""],
    ["", 0, ""],
    ["", 0, ""],
    ["", 0, ""],
    ["", 0, ""],
    ["", 0, ""],
  ]);
  const [hue , setHue] = useState(0)
  const [totalWeightedPoints, setTotalWeightedPoints] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0.0);

  const handleAddCourse = () => {
    const newCourse = ["", 0, ""];
    setCourses([...courses, newCourse]);
  };

  const handleDeleteCourse = (index) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
  };

  const calculateCGPA = () => {
    let allCourses = [...courses],
      points = 0,
      credits = 0;
    allCourses.forEach((course) => {
      if (course[2] !== "") {
        const gradeValue = convertGradeToNumber(course[2]);
        points += course[1] * gradeValue;
        credits += course[1];
      }
    });
    setTotalCredits(credits);
    if (credits > 0) {
      const cgpa = points / credits;
      setTotalWeightedPoints(cgpa.toFixed(2));
    } else {
      setTotalWeightedPoints(0.0);
    }
  };

  useEffect(calculateCGPA, [courses]);

  const gradeConversion = {
    "": 0.0,
    O: 10.0,
    "A+": 9.0,
    A: 8.0,
    "B+": 7.0,
    B: 6.0,
    C: 5.0,
    F: 0.0,
  };

  const convertGradeToNumber = (grade) => {
    return gradeConversion[grade] || 0;
  };

  const handleSubjectChange = (index, e) => {
    let prevCourses = [...courses];
    prevCourses[index][0] = e.target.value;
    setCourses(prevCourses);
  };

  const handleGradeChange = (index, e) => {
    let prevCourses = [...courses];
    prevCourses[index][2] = e.target.value;
    setCourses(prevCourses);
  };

  const handleCreditChange = (index, e) => {
    let prevCourses = [...courses];
    prevCourses[index][1] = Math.max(e.target.value, 0);
    setCourses(prevCourses);
  };
 
  return (
    <div className=" bg-gradient-to-tl from-zinc-950 via-gray-950 to-slate-950 min-w-screen min-h-screen h-auto flex items-center justify-center">
      <div className="fixed w-screen h-screen">
       
        <div
          id="floater-1"
          className="fixed circle-1 top-[117px] duration-[7000ms] left-[1350px] h-[36rem] w-[36rem] bg-gradient-to-br from-yellow-800 via-amber-800 to-orange-800 rounded-full"
        ></div>
        <div
          id="floater-2"
          className="fixed circle-2 top-[695px] duration-[7000ms] left-[-60px] h-[10rem] w-[10rem]  bg-gradient-to-br from-yellow-800 via-amber-800 to-orange-800 rounded-full"
        ></div>
        <div
          id="floater-3"
          className="fixed circle-3 top-[-17px] duration-[7000ms] left-[150px] h-[30rem] w-[30rem]  bg-gradient-to-br from-yellow-800 via-amber-800 to-orange-800 rounded-full"
        ></div>
        <div
          id="floater-4"
          className="fixed circle-4 top-[595px] duration-[7000ms] left-[760px] h-[18rem] w-[18rem]  bg-gradient-to-br from-yellow-800 via-amber-800 to-orange-800 rounded-full"
        ></div>
        <div
          id="floater-5"
          className="fixed circle-4 top-[695px] duration-[7000ms] left-[2000px] h-[20rem] w-[20rem]  bg-gradient-to-br from-yellow-800 via-amber-800 to-orange-800 rounded-full"
        ></div>
      </div>
      <div className={`backdrop-blur-3xl bg-opacity-10 hue-rotate-[${hue}deg] border-white border-2 border-opacity-15 bg-stone-900 rounded-lg container mx-auto py-4 oveflow-x-auto text-[#bdbbbc] flex-col items-center justify-center`}>
        <h1 className="text-3xl font-bold mb-4 text-[#ededed] text-center font-sans uppercase">SRM GPA Calculator</h1>
        <table className=" text-center w-full my-4">
          <thead className="">
            <tr>
              <th className="px-4 py-2 text-center">No</th>
              <th className="px-4 py-2 text-center">Subject</th>
              <th className="px-4 py-2 text-center">Credit</th>
              <th className="px-4 py-2 text-center">Grade</th>
            </tr>
          </thead>
          <tbody className=" text-gray-300">
            {courses.map((course, index) => (
              <CourseInput
                key={index}
                index={index}
                subjectName={course[0]}
                credit={course[1]}
                grade={course[2]}
                handleSubjectChange={handleSubjectChange}
                handleCreditChange={handleCreditChange}
                handleGradeChange={handleGradeChange}
                handleDeleteCourse={handleDeleteCourse}
              />
            ))}
            <tr className="flex-col bg-transparent text-[#ededed] select-none">
              <td className="text-center  sm:w-auto w-1/12   px-2 py-2  rounded-md"></td>
              <td className="text-center  w-1/2 sm:w-auto px-2 py-2 rounded-md text-nowrap">
                <p className="font-semibold ">GPA: {totalWeightedPoints}</p>
              </td>
              <td className="text-center  w-1/6 sm:w-auto px-2 py-2 rounded-md text-nowrap">
                <p className="font-semibold">Credits: {totalCredits}</p>
              </td>

              <td className="flex gap-4 items-center justify-center  bg-transparent  w-full sm:w-auto px-2 py-2 rounded-md">
                <button
                  onClick={handleAddCourse}
                  className="bg-transparent border border-opacity-45 border-gray-50 duration-500 text-nowrap  rounded-md p-2 hover:text-black hover:text-opacity-65 hover:bg-gray-50"
                >
                  Add Course
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
