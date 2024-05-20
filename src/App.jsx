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
  useEffect(() => {
    let i = 0
    const movingElement1 = document.querySelector("#floater-1");
    const movingElement2 = document.querySelector("#floater-2");
    const movingElement3 = document.querySelector("#floater-3");
    const movingElement4 = document.querySelector("#floater-4");
    moveElements(movingElement1 , i);
    moveElements(movingElement2 , i);
    moveElements(movingElement3 , i);
    moveElements(movingElement4 , i);
    setHue((prev) => (prev + 5)%360 )
    setInterval(() => {
      
      moveElements(movingElement1 , i);
      moveElements(movingElement3 , i)
      ++i;
      moveElements(movingElement2 , i);
      moveElements(movingElement4 , i)
    }, 10000);
  }, []);
  const moveElements = (movingElement, i) => {
    const maxX = window.innerWidth - (movingElement.offsetWidth / 2);
    const maxY = window.innerHeight - (movingElement.offsetHeight / 2);
    let x , y 

    if (i % 2 == 0) {
      x = getRandomInt(- movingElement.offsetWidth / 2, maxX / 2);
      y = getRandomInt(- movingElement.offsetHeight / 2, maxY / 2);
    } else {
      x = getRandomInt(maxX / 2, maxX);
      y = getRandomInt(maxY / 2, maxY);
    }
    movingElement.style.left = `${x}px`;
    movingElement.style.top = `${y}px`;
  };
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return (
    <div className=" bg-gradient-to-tl from-[#202020] to-[#181818] min-w-screen min-h-screen h-auto flex items-center justify-center">
      <div className="fixed w-screen h-screen">
       
        <div
          id="floater-1"
          className="fixed top-[67px] duration-[7000ms] left-[1350px] sm:h-96 h-32 sm:w-96 w-32 bg-gradient-to-br from-teal-800 via-cyan-800 to-sky-700 rounded-full"
        ></div>
        <div
          id="floater-2"
          className="fixed top-[595px] duration-[7000ms] left-[560px] sm:h-96 h-32 sm:w-96 w-32 bg-gradient-to-br from-rose-800 via-pink-800 to-fuchsia-700 rounded-full"
        ></div>
        <div
          id="floater-3"
          className="fixed top-[67px] duration-[7000ms] left-[1350px] sm:h-96 h-32 sm:w-96 w-32 bg-gradient-to-br from-yellow-800 via-amber-800 to-orange-700 rounded-full"
        ></div>
        <div
          id="floater-4"
          className="fixed top-[595px] duration-[7000ms] left-[560px] sm:h-96 h-32 sm:w-96 w-32 bg-gradient-to-br from-lime-800 via-green-800 to-emerald-700 rounded-full"
        ></div>
      </div>
      <div className={`backdrop-blur-3xl bg-opacity-10 hue-rotate-[${hue}deg] border-white border-2 border-opacity-15 bg-white rounded-lg container mx-auto py-4 oveflow-x-auto text-gray-50 flex-col items-center justify-center`}>
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
            <tr className="flex-col bg-transparent text-gray-50 select-none">
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
