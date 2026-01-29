function openModal() {
    document.getElementById("addStudentModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("addStudentModal").style.display = "none";
}

function addStudent() {
    const name = document.getElementById("studentName").value;
    if (name.trim() === "") return;

    const table = document.getElementById("studentsTable");
    const row = document.createElement("tr");
    row.innerHTML = `<td>${name}</td>`;
    table.appendChild(row);

    document.getElementById("studentName").value = "";
    closeModal();
}
