const express = require("express");
const app = express();
const port = 4000;

app.get("/dashboard", (req, res) => {
  res.send("Hello, Welcome");
});

let student = [
  {
    id: 1,
    studentName: "paul",
    studentCourse: "Web Development",
    StudentLevel: "ND1",
  },
  {
    id: 2,
    studentName: "Ade",
    studentCourse: "Moobile Developpment",
    StudentLevel: "ND2",
  },
  { id: 3, studentName: "Bola", studentCourse: "Flutter", StudentLevel: "ND3" },
  { id: 4, studentName: "Tayo", studentCourse: "c++", StudentLevel: "ND4" },
  { id: 5, studentName: "Taiwo", studentCourse: "Pascal", StudentLevel: "ND5" },
  { id: 6, studentName: "Tope", studentCourse: "Java", StudentLevel: "ND6" },
  {
    id: 7,
    studentName: "Tolu",
    studentCourse: "Javascript",
    StudentLevel: "ND7",
  },
  { id: 8, studentName: "Chima", studentCourse: "", StudentLevel: "ND1" },
  { id: 9, studentName: "John", studentCourse: "WEB", StudentLevel: "ND1" },
  { id: 10, studentName: "Abiodun", studentCourse: "WEB", StudentLevel: "ND7" },
];

app.get("/students", (req, res) => {
  res.send(student);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
