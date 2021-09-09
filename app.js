require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.locals.arr = [];

mongoose.connect('mongodb+srv://' + process.env.DATABASE_USERNAME + '@cluster0.otbtt.mongodb.net/Details', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let allTeachersDetail = [];
let allStudentsDetail = [];

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  class: String,
  section: String,
  assignedTeacher: String
});

const Student = mongoose.model('Student', studentSchema);

const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String
});

const Teacher = mongoose.model('Teacher', teacherSchema);

app.get("/", function(req, res) {

  Teacher.find({}, function(err, teacherData) {
    if (err) {
      console.log(err);
    } else {
      Student.find({}, function(err, studentData) {
        if (err) {
          console.log(err);
        }

        res.render("home", {
          teachersDetail: teacherData,
          studentsDetail: studentData
        });
      });
    }
  });
});

app.get("/filter", function(req, res) {
  Teacher.find({}, function(err, teacherData) {
    if (err) {
      console.log(err);
    } else {
      Student.find({}, function(err, studentData) {
        if (err) {
          console.log(err);
        }

        res.render("filter", {
          teachersDetail: teacherData,
          studentsDetail: studentData,
          teachersDetailAccToSubject: "false",
          studentsDetailAccToClassSection: "false",
          studentsDetailAccToAssignedTeacher: "false"
        });
      });
    }
  });
});

app.get("/editStudentDetails", function(req, res) {
  Teacher.find({}, function(err, teacherData) {
    if (err) {
      console.log(err);
    } else {
      Student.find({}, function(err, studentData) {
        if (err) {
          console.log(err);
        }

        res.render("editDetails", {
          teachersDetail: teacherData,
          studentsDetail: studentData
        });
      });
    }
  });
});

app.post("/createStudent", (req, res) => {
  const newStudent = new Student({
    name: req.body.name,
    email: req.body.email,
    class: req.body.class,
    section: req.body.section,
    assignedTeacher: req.body.selectedTeacher
  });

  newStudent.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
})

app.post("/createTeacher", (req, res) => {
  const newTeacher = new Teacher({
    name: req.body.tName,
    email: req.body.tEmail,
    subject: req.body.tSubject
  });

  newTeacher.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
})

app.post("/filterTeachersAccToSubject", (req, res) => {
  Teacher.find({}, function(err, teacherData) {
    if (err) {
      console.log(err);
    } else {
      let arr = [];

      if (req.body.selectedSubject != "null") {
        teacherData.forEach(function(item) {
          if (item.subject === req.body.selectedSubject) {
            arr.push(item);
          }
        })
      }

      Student.find({}, function(err, studentData) {
        if (err) {
          console.log(err);
        }

        res.render("filter", {
          teachersDetail: teacherData,
          studentsDetail: studentData,
          teachersDetailAccToSubject: arr,
          studentsDetailAccToClassSection: "false",
          studentsDetailAccToAssignedTeacher: "false"
        });
      });
    }
  });
})

app.post("/filterStudentsAccToClassSection", (req, res) => {
  Teacher.find({}, function(err, teacherData) {
    if (err) {
      console.log(err);
    } else {

      Student.find({}, function(err, studentData) {
        if (err) {
          console.log(err);
        } else {
          let arr = [];

          if (req.body.selectedClass != "null" && req.body.selectedSection != "null") {
            studentData.forEach(function(item) {
              if (item.class === req.body.selectedClass && item.section === req.body.selectedSection) {
                arr.push(item);
              }
            })
          } else if (req.body.selectedClass != "null") {
            studentData.forEach(function(item) {
              if (item.class === req.body.selectedClass) {
                arr.push(item);
              }
            })
          } else if (req.body.selectedSection != "null") {
            studentData.forEach(function(item) {
              if (item.section === req.body.selectedSection) {
                arr.push(item);
              }
            })
          }

          res.render("filter", {
            teachersDetail: teacherData,
            studentsDetail: studentData,
            teachersDetailAccToSubject: "false",
            studentsDetailAccToClassSection: arr,
            studentsDetailAccToAssignedTeacher: "false"
          });
        }

      });
    }
  });
})

app.post("/filterStudentsAccToAssignedTeacher", (req, res) => {
  Teacher.find({}, function(err, teacherData) {
    if (err) {
      console.log(err);
    } else {

      Student.find({}, function(err, studentData) {
        if (err) {
          console.log(err);
        } else {
          let arr = [];

          if (req.body.selectedTeacher != "null") {
            studentData.forEach(function(item) {
              if (item.assignedTeacher === req.body.selectedTeacher) {
                arr.push(item);
              }
            })
          }

          res.render("filter", {
            teachersDetail: teacherData,
            studentsDetail: studentData,
            teachersDetailAccToSubject: "false",
            studentsDetailAccToClassSection: "false",
            studentsDetailAccToAssignedTeacher: arr
          });
        }
      });
    }
  });
})

app.post("/editStudentDetail", function(req, res) {
  Student.findByIdAndUpdate(req.body.studentID, {
    name: req.body.name,
    email: req.body.email,
    class: req.body.class,
    section: req.body.section,
    assignedTeacher: req.body.selectedTeacher
  }, function(err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect("/editStudent");
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
