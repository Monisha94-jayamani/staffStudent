const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
let Staff = [];
let Student = [];
app.use(bodyParser.json());
app.get("/staff", (req, res) => {
  console.log(" staff success");
  res.json(Staff);
});
app.post("/staff", (req, res) => {
  console.log(" staff success");
  Staff.push(req.body);
  res.json({ Staff });
});
app.get("/student", (req, res) => {
  console.log("student success");
  res.json(Student);
});
app.post("/student", (req, res) => {
  console.log("student post success");
  Student.push(req.body);
  res.json(Student);
});
app.put("/staff/:id", (req, res) => {
  let Id = req.params.id;
  console.log(Id);

  let stafffind = Staff.find((v, index) => v.id == Id);
  console.log(stafffind);
  let count = Student.reduce((acc, cur) => {
    if (cur.staffid == Id) {
      acc = acc + 1;
    }
    return acc;
  }, 0);
  stafffind.studentCount = count;
  console.log("staff count is added");
  res.json({ message: "staff count is updated" });
});

app.delete("/student/:id", (req, res) => {
  let studentId = req.params.id;
  let studentfind = Student.filter((s, index) => s.id == studentId)[0];
  const index = Student.indexOf(studentfind);

  Student.splice(index, 1);
  console.log("deleted");
  res.json({ message: "User deleted." });
});

app.listen(port, () => {
  console.log(`server is listening ${port}`);
});
