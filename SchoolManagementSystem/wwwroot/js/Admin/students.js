// Students data
let studentsData = [
    {id: 1, name: "محمد احمد السيد", number: "2024001", fatherNumber: "0501234567", attendance: 95, performance: "excellent", grade: 92},
    {id: 2, name: "فاطمة محمود حسن", number: "2024002", fatherNumber: "0502345678", attendance: 98, performance: "excellent", grade: 96},
    {id: 3, name: "خالد السيد محمد", number: "2024003", fatherNumber: "0503456789", attendance: 85, performance: "good", grade: 75},
    {id: 4, name: "مارن محمد عبدالرحمن", number: "2024004", fatherNumber: "0504567890", attendance: 92, performance: "very-good", grade: 88},
    {id: 5, name: "روان محمد ياسر", number: "2024005", fatherNumber: "0505678901", attendance: 96, performance: "excellent", grade: 94}
];

// Update date
function updateDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const arabicDate = now.toLocaleDateString('ar-EG', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        dateElement.textContent = arabicDate;
    }
}

function updateStudentsTable() {
    const tableBody = document.getElementById('studentsTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    studentsData.forEach(student => {
        // Determine performance color
        let performanceClass = '';
        let performanceText = '';
        
        switch(student.performance) {
            case 'excellent':
                performanceClass = 'excellent';
                performanceText = 'ممتاز';
                break;
            case 'very-good':
                performanceClass = 'very-good';
                performanceText = 'جيد جداً';
                break;
            case 'good':
                performanceClass = 'good';
                performanceText = 'جيد';
                break;
        }
        
        // Determine attendance color
        const attendanceClass = student.attendance >= 90 ? 'present' : 'absent';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td><span class="status ${attendanceClass}">${student.attendance}%</span></td>
            <td><span class="performance ${performanceClass}">${performanceText}</span></td>
            <td><span class="grade">${student.grade}%</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-btn" onclick="showStudentDetails(${student.id})">
                        عرض البيانات
                    </button>
                    <button class="action-btn attendance-btn" onclick="showAttendance(${student.id})">
                        الحضور
                    </button>
                    <button class="action-btn grades-btn" onclick="showGrades(${student.id})">
                        الدرجات
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Display student details
function showStudentDetails(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;
    
    document.getElementById('detailName').value = student.name;
    document.getElementById('detailNumber').value = student.number;
    document.getElementById('detailFatherNumber').value = student.fatherNumber;
    document.getElementById('detailAttendance').value = student.attendance + '%';
    document.getElementById('detailGrade').value = student.grade + '%';
    
    document.getElementById('studentDetailsForm').style.display = 'flex';
}

// Display attendance
function showAttendance(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;
    
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    let attendanceHTML = `
        <h4 style="text-align: center; color: #4387AB; margin-bottom: 20px;">حضور ${student.name}</h4>
        <div class="attendance-days">
    `;
    
    // Create week days with random attendance status
    days.forEach(day => {
        const isPresent = Math.random() > 0.2; // 80% attendance probability
        attendanceHTML += `
            <div class="day-attendance">
                <div class="day-name">${day}</div>
                <div class="att-status ${isPresent ? 'present' : 'absent'}">
                    ${isPresent ? '✓ حضور' : '✗ غياب'}
                </div>
            </div>
        `;
    });
    
    attendanceHTML += `
        </div>
        <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 6px; margin-top: 20px;">
            <strong>إجمالي الحضور: ${student.attendance}%</strong>
        </div>
    `;
    
    document.getElementById('attendanceContent').innerHTML = attendanceHTML;
    document.getElementById('attendanceForm').style.display = 'flex';
}

// Display grades
function showGrades(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;
    
    // Subject grades
    const subjects = [
        {name: 'الرياضيات', grade: Math.floor(Math.random() * 20) + 80},
        {name: 'العلوم', grade: Math.floor(Math.random() * 20) + 80},
        {name: 'اللغة العربية', grade: Math.floor(Math.random() * 20) + 80},
        {name: 'اللغة الإنجليزية', grade: Math.floor(Math.random() * 20) + 80},
        {name: 'التربية الإسلامية', grade: Math.floor(Math.random() * 20) + 80},
        {name: 'الاجتماعيات', grade: Math.floor(Math.random() * 20) + 80}
    ];
    
    let gradesHTML = `
        <h4 style="text-align: center; color: #4387AB; margin-bottom: 20px;">درجات ${student.name}</h4>
        <div class="grades-list">
    `;
    
    subjects.forEach(subject => {
        gradesHTML += `
            <div class="subject-grade">
                <span class="subject-name">${subject.name}</span>
                <span class="subject-score">${subject.grade}%</span>
            </div>
        `;
    });
    
    gradesHTML += `
        </div>
        <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 6px; margin-top: 20px;">
            <strong>المعدل العام: ${student.grade}%</strong>
        </div>
    `;
    
    document.getElementById('gradesContent').innerHTML = gradesHTML;
    document.getElementById('gradesForm').style.display = 'flex';
}

// Load student data for editing
function editStudent(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;
    
    document.getElementById('editName').value = student.name;
    document.getElementById('editNumber').value = student.number;
    document.getElementById('editFatherNumber').value = student.fatherNumber;
    document.getElementById('editAttendance').value = student.attendance;
    document.getElementById('editGrade').value = student.grade;
    document.getElementById('editStudentId').value = student.id;
    
    document.getElementById('editStudentForm').style.display = 'flex';
}

// Save student edit
document.getElementById('editForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const studentId = parseInt(document.getElementById('editStudentId').value);
    const index = studentsData.findIndex(s => s.id === studentId);
    
    if (index !== -1) {
        studentsData[index] = {
            ...studentsData[index],
            name: document.getElementById('editName').value,
            number: document.getElementById('editNumber').value,
            fatherNumber: document.getElementById('editFatherNumber').value,
            attendance: parseInt(document.getElementById('editAttendance').value),
            grade: parseInt(document.getElementById('editGrade').value)
        };
        
        updateStudentsTable();
        document.getElementById('editStudentForm').style.display = 'none';
        alert('تم تحديث بيانات الطالب');
    }
});

// Delete student
function deleteStudent(studentId) {
    if (confirm('هل أنت متأكد من حذف هذا الطالب؟')) {
        studentsData = studentsData.filter(student => student.id !== studentId);
        updateStudentsTable();
        alert('تم حذف الطالب');
    }
}

// Close forms
function setupFormEvents() {
    // Close student details form
    document.getElementById('closeDetailsBtn')?.addEventListener('click', function() {
        document.getElementById('studentDetailsForm').style.display = 'none';
    });
    
    // Close attendance form
    document.getElementById('closeAttendanceBtn')?.addEventListener('click', function() {
        document.getElementById('attendanceForm').style.display = 'none';
    });
    
    // Close grades form
    document.getElementById('closeGradesBtn')?.addEventListener('click', function() {
        document.getElementById('gradesForm').style.display = 'none';
    });
    
    // Close edit form
    document.getElementById('cancelEditBtn')?.addEventListener('click', function() {
        document.getElementById('editStudentForm').style.display = 'none';
    });
}

// Page initialization
document.addEventListener('DOMContentLoaded', function() {
    updateDate();
    updateStudentsTable();
    setupFormEvents();
});