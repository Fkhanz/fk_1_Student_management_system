#! /usr/bin/env node 
import inquirer from "inquirer";
class student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseId = 10000;
let studentId = "";
let countinueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Please select an option:\n",
        choices: ["Enroll a student", "show student status"]
    });
    if (action.ans === "Enroll a student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Please Enter Your Name:"
        });
        let trimedStudentName = (studentName.ans).trim().toLowerCase();
        let studentNameCheck = students.map(obj => obj.name);
        if (studentNameCheck.includes(trimedStudentName) === false) {
            if (trimedStudentName !== "") {
                baseId++;
                studentId = "STID" + baseId;
                console.log("\n\tYour account has been created");
                console.log(`Welcome, ${trimedStudentName}!!`);
                let cource = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Please select a cource",
                    choices: ["IT", "English", "Typescript"]
                });
                let courceFees = 0;
                switch (cource.ans) {
                    case "IT":
                        courceFees = 5000;
                        break;
                    case "English":
                        courceFees = 500;
                        break;
                    case "Typescript":
                        courceFees = 8000;
                        break;
                }
                let courceConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to enroll in this cource"
                });
                if (courceConfirm.ans === true) {
                    let Student = new student(studentId, trimedStudentName, [cource.ans], courceFees);
                    students.push(Student);
                    console.log("You have enrolled in this course");
                }
            }
            else {
                console.log("this name is already exists");
            }
        }
    }
    else if (action.ans === "Shoe student status") {
        if (students.length !== 0) {
            let studentNamescheck = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Please select name",
                choices: studentNamescheck
            });
            let foundstudent = students.find(student => student.name === selectedStudent.ans);
            console.log("Student information");
            console.log(foundstudent);
            console.log("\n");
        }
        else {
            console.log("Record is empty");
        }
        let userConfirm = await inquirer.prompt({
            type: "confirm",
            name: "ans",
            message: "Do you want to countinue?"
        });
        if (userConfirm.ans === false) {
            countinueEnrollment = false;
        }
    }
} while (countinueEnrollment);
