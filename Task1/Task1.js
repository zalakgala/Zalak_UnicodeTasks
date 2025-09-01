const addbtn = document.getElementById("addstu");
const form = document.getElementById("addStd");

addbtn.addEventListener("click", () => {
  form.classList.remove("hidden");
  addbtn.style.display = "none";
});

function loadStudents() {
  fetch("https://studentapi-m7a7.onrender.com/student/all")
    .then((res) => res.json())
    .then((studdata) => {
      const tableBody = document.getElementById("studinfo");
      tableBody.innerHTML = "";

      let num = 1;

      studdata.students.forEach((student) => {
        let row = `
          <tr>
            <td>${num++}</td>
            <td>${student.studentName}</td>
            <td>${student.college}</td>
            <td>${student.cgpa}</td>
            <td>${student.phone}</td>
            <td>${student.sapid}</td>
            <td>${student.batch}</td>
            <td>${student.year}</td>
            <td>${student.address}</td>
            <td>
              ${student.isDefault
            ? `Not Applicable`
            : `<button class="editBtn" data-sapid="${student._id}">Edit</button>`
          }
            </td>
            <td>
              ${student.isDefault
            ? `Not Applicable`
            : `<button class="dltBtn" data-sapid="${student._id}">Delete</button>`
          }
            </td>
          </tr>`;
        tableBody.innerHTML += row;
      });

      document.querySelectorAll(".editBtn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const sapid = btn.getAttribute("data-sapid");
          const student = studdata.students.find((s) => s._id === sapid);

          document.getElementById("editSapid").value = student.sapid;
          document.getElementById("editName").value = student.studentName;
          document.getElementById("editCollege").value = student.college;
          document.getElementById("editCgpa").value = student.cgpa;
          document.getElementById("editPhone").value = student.phone;
          document.getElementById("editBatch").value = student.batch;
          document.getElementById("editYear").value = student.year;
          document.getElementById("editAddress").value = student.address;
          document.getElementById("editForm").style.display = "block";
        });
      });
      document.querySelectorAll(".dltBtn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-sapid");
          if (confirm("Are you sure you want to delete this student?")) {
            fetch(`https://studentapi-m7a7.onrender.com/student/delete/${id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("Deleted:", data);
                alert("Student Deleted Successfully");
                loadStudents();
              })
              .catch((err) => console.error("Error deleting student:", err));
          }
        });
      })
    })
    .catch((err) => console.error("Error:", err));
}

document.getElementById("editForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const sapid = document.getElementById("editSapid").value;

  const updatedStudent = {
    studentName: document.getElementById("editName").value,
    college: document.getElementById("editCollege").value,
    cgpa: document.getElementById("editCgpa").value,
    phone: document.getElementById("editPhone").value,
    batch: document.getElementById("editBatch").value,
    year: document.getElementById("editYear").value,
    address: document.getElementById("editAddress").value,
    isDefault: false,
  };

  fetch(`https://studentapi-m7a7.onrender.com/student/update/${sapid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedStudent),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Updated:", data);
      alert("Student Updated Successfully");
      loadStudents();

      document.getElementById("editForm").reset();
      document.getElementById("editForm").style.display = "none";
    })
    .catch((err) => console.error("Error:", err));
});

loadStudents();



document.getElementById("addStd").addEventListener("submit", function (e) {
  e.preventDefault();

  const newStudent = {
    studentName: document.getElementById("name").value,
    college: document.getElementById("college").value,
    cgpa: document.getElementById("cgpa").value,
    phone: document.getElementById("phone").value,
    sapid: document.getElementById("sapid").value,
    batch: document.getElementById("batch").value,
    year: document.getElementById("year").value,
    address: document.getElementById("address").value,
    isDefault: false,

  };

  fetch("https://studentapi-m7a7.onrender.com/student/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newStudent),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Added:", data);
      alert("Student Added Succesfully");
      loadStudents();
      document.getElementById("addStd").reset();
    })
});

