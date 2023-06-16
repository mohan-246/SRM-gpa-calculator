var credits;
var credit;
var tot_credit = 0;
var grades;
var grade;
var grade_credit = 0;
var tot_grade_credit = 0;
var sgpa;
var courses = 6;
var main = $(".main-container").html();
var allcgpa = [];
grade_points = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  P: 4,
  F: 0,
  Ab: 0,
  "*": 0,
};

function calc(event) {
  credits = document.querySelectorAll(".credits");
  // console.log(credits);
  grades = document.querySelectorAll(".grades");

  for (var i = 0; i < credits.length; i++) {
    if (credits[i].value === "") {
      credit = 0;
    } else {
      credit = Number(credits[i].value);
      tot_credit += credit;
    }
    //  console.log(grade_points[grades[i].value]);
    grade = grade_points[grades[i].value];
    // console.log(credit,grade);
    tot_grade_credit += grade * credit;
    //  console.log(tot_grade_credit);
  }
  // console.log(typeof(tot_grade_credit),typeof(tot_credit));
  sgpa = tot_grade_credit / tot_credit;
  console.log(sgpa);
  if (Number.isNaN(sgpa)) {
    window.alert("Please enter valid credit number.");
  } else {
    //document.getElementById("gpa").classList.remove("hidden");
    $("#gpa").removeClass("hidden");
    $("#gpa").html("Your have scored a GPA of " + sgpa.toFixed(2));
    $("#reset").removeClass("hidden");
    allcgpa.push(sgpa.toFixed(2));
  }
}

$("#add").on("click", () => {
  courses++;
  $("table tbody").append(
    "<tr><th scope='row' class='text-neutral-400'>" +
      courses +
      "</th><td><input type='number' id='one'class='credits  font-sans font-semibold m-5 block  shadow rounded focus:outline-none focus:shadow-outline content-center text-center w-[70%] lg:w-[90%]'min='1'></input></td><td> <select class='grades font-sans font-semibold cursor-pointer drop-shadow-md shadow rounded focus:outline-none w-[70%]'><option>O</option><option>A+</option><option>A</option><option>B+</option><option>B</option><option>C</option><option>P</option><option>F</option><option>Ab</option><option>*</option></select></td></tr>"
  );
});

$("#reset").on("click", () => {
  $("#gpa").addClass("hidden");
  $("#reset").addClass("hidden");
});
