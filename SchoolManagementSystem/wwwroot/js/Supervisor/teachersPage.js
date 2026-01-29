function openModal() {
    document.getElementById("addTeacherModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("addTeacherModal").style.display = "none";
}

function addTeacher() {
    const name = document.getElementById("teacherName").value;
    const subject = document.getElementById("teacherSubject").value;

    if (name.trim() === "" || subject.trim() === "") return;

    const table = document.getElementById("teachersTable");
    const row = document.createElement("tr");
    row.innerHTML = `<td>${name}</td><td>${subject}</td>`;
    table.appendChild(row);

    document.getElementById("teacherName").value = "";
    document.getElementById("teacherSubject").value = "";

    closeModal();
}
