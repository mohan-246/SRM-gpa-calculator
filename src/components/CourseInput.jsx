import React, { useState } from "react";

const CourseInput = ({ index, subjectName, grade, credit , handleSubjectChange , handleCreditChange , handleGradeChange , handleDeleteCourse }) => {

  return (
    <tr key={index} className="flex-col bg-transparent">
      <td className="text-center sm:w-auto w-1/12   px-2 py-2  rounded-md">{index + 1}</td>
      <td className="text-center w-1/2 sm:w-auto px-2 py-2 rounded-md">
        <input
          type="text"
          id="subjectName"
          value={subjectName}
          onChange={(e) => handleSubjectChange(index , e)}
          className="rounded-md text-center px-2 py-1 focus:outline-none sm:w-2/3 w-full bg-transparent border-white border-[0.5px] border-opacity-45"
        />
      </td>
      <td className="text-center w-1/6 sm:w-auto px-2 py-2 rounded-md">
        <input
          type="number"
          id="credit"
          value={credit}
          onChange={(e) => handleCreditChange(index , e)}
          className="rounded-md text-center px-2 py-1 focus:outline-none sm:w-2/3 w-full bg-transparent border-white border-[0.5px] border-opacity-45"
        />
      </td>

      <td className="flex gap-4 items-center justify-center  bg-transparent w-full sm:w-auto px-2 py-2 rounded-md">
        <select
          id="grade"
          value={grade}
          onChange={(e) => handleGradeChange(index , e)}
          className="rounded-md text-center px-1 py-1 w-full sm:w-1/2 bg-transparent border-white border-[0.5px] border-opacity-45"
        >
          <option className="bg-[#333333]" value="">Select Grade</option>
          <option className="bg-[#333333]" value="O">O</option>
          <option className="bg-[#333333]" value="A+">A+</option>
          <option className="bg-[#333333]" value="A">A</option>
          <option className="bg-[#333333]" value="B+">B+</option>
          <option className="bg-[#333333]" value="B">B</option>
          <option className="bg-[#333333]" value="C">C</option>
          <option className="bg-[#333333]" value="F">F</option>
        </select>
        <div className="sm:block hidden invert opacity-65 hover:opacity-100 duration-300 cursor-pointer">
          <img onClick={() => handleDeleteCourse(index)} src="./delete.svg" alt="" />
        </div>
      </td>
    </tr>
  );
};

export default CourseInput;
