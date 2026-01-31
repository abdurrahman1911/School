// فتح الـ Modal
function openModal() {
    const modal = document.getElementById("addTeacherModal");
    if (!modal) return;
    modal.style.display = "flex";
}

// إغلاق الـ Modal
function closeModal() {
    const modal = document.getElementById("addTeacherModal");
    if (!modal) return;
    modal.style.display = "none";
}

// إضافة معلم للجدول
function addTeacher() {
    const name = document.getElementById("teacherName").value.trim();
    const subject = document.getElementById("teacherSubject").value.trim();

    if (!name || !subject) {
        alert("من فضلك أدخل اسم المعلم والمادة");
        return;
    }

    const table = document.getElementById("teachersTable");
    const row = document.createElement("tr");
    row.innerHTML = `<td>${name}</td><td>${subject}</td>`;
    table.appendChild(row);

    // تفريغ الحقول
    document.getElementById("teacherName").value = "";
    document.getElementById("teacherSubject").value = "";

    closeModal();
}

// غلق الـ modal عند الضغط خارج الـ content
window.onclick = function (event) {
    const modal = document.getElementById("addTeacherModal");
    if (event.target === modal) {
        closeModal();
    }
}
