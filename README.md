# teacher-student-system
This system is made under the Intern Assessment given by T18Innovations Private Limited

I have used the following technologies:
1) NodeJS
2) ExpressJS
3) EJS
4) MongoDB
5) Mongoose
6) Bootstrap
7) HTML
8) CSS

Following are the REST APIs exposed:
1) /createStudent (POST request)
   POST body will be like :
    {name: abc,
    email: abc@gmail.com,
    class: 8th,
    section: A,
    assignedTeacher: xyz}
    
2) /createTeacher (POST request)
   POST body will be like :
    {name: xyz,
    email: xyz@gmail.com,
    subject: Maths}
    
3) /filterTeachersAccToSubject (POST request)

4) /filterStudentsAccToClassSection (POST request)

5) /filterStudentsAccToAssignedTeacher (POST request)

6) /editStudentDetail (POST request)
   POST body will be like :
    {name: abc,
    email: abc@gmail.com,
    class: 8th,
    section: A,
    assignedTeacher: xyz}
