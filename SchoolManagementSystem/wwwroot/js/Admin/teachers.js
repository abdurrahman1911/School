// Data
const teachersData = [
    {id: 1, name: "أحمد محمد السيد", number: "1001", phone: "0501234567", specialization: "رياضيات", attendance: 98, performance: "excellent", evaluation: 95},
    {id: 2, name: "سارة علي محمود", number: "1002", phone: "0502345678", specialization: "علوم", attendance: 96, performance: "excellent", evaluation: 94},
    {id: 3, name: "خالد حسن محمد", number: "1003", phone: "0503456789", specialization: "لغة عربية", attendance: 92, performance: "very-good", evaluation: 88},
    {id: 4, name: "لينا سعيد عبدالله", number: "1004", phone: "0504567890", specialization: "لغة إنجليزية", attendance: 85, performance: "good", evaluation: 82},
    {id: 5, name: "محمد ياسر أحمد", number: "1005", phone: "0505678901", specialization: "تربية إسلامية", attendance: 99, performance: "excellent", evaluation: 96},
    {id: 6, name: "فاطمة عبد الرحمن", number: "1006", phone: "0506789012", specialization: "اجتماعيات", attendance: 90, performance: "very-good", evaluation: 85},
    {id: 7, name: "ياسر محمود علي", number: "1007", phone: "0507890123", specialization: "تربية بدنية", attendance: 88, performance: "good", evaluation: 80}
];

// Update date
function updateDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString('ar-EG', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Update teachers table
function updateTeachersTable() {
    const tableBody = document.getElementById('teachersTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    teachersData.forEach(teacher => {
        // Determine performance color
        let performanceClass = '';
        let performanceText = '';
        
        switch(teacher.performance) {
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
        const attendanceClass = teacher.attendance >= 90 ? 'present' : 'absent';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${teacher.name}</td>
            <td><span class="status ${attendanceClass}">${teacher.attendance}%</span></td>
            <td><span class="performance ${performanceClass}">${performanceText}</span></td>
            <td><span class="grade">${teacher.evaluation}%</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-btn" onclick="showTeacherDetails(${teacher.id})">
                        عرض البيانات
                    </button>
                    <button class="action-btn attendance-btn" onclick="showAttendance(${teacher.id})">
                        الحضور
                    </button>
                    <button class="action-btn grades-btn" onclick="showSubjects(${teacher.id})">
                        المواد
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Show teacher details
function showTeacherDetails(teacherId) {
    const teacher = teachersData.find(t => t.id === teacherId);
    if (!teacher) return;
    
    document.getElementById('detailName').value = teacher.name;
    document.getElementById('detailNumber').value = teacher.number;
    document.getElementById('detailPhone').value = teacher.phone;
    document.getElementById('detailSpecialization').value = teacher.specialization;
    document.getElementById('detailAttendance').value = teacher.attendance + '%';
    document.getElementById('detailPerformance').value = teacher.evaluation + '%';
    
    document.getElementById('teacherDetailsForm').style.display = 'flex';
}

// Show teacher attendance
function showAttendance(teacherId) {
    const teacher = teachersData.find(t => t.id === teacherId);
    if (!teacher) return;
    
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    let attendanceHTML = `
        <h4 style="text-align: center; color: #4387AB; margin-bottom: 20px;">حضور ${teacher.name}</h4>
        <div class="attendance-days">
    `;
    
    days.forEach(day => {
        const isPresent = Math.random() > 0.1; // 90% attendance probability
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
            <strong>إجمالي الحضور: ${teacher.attendance}%</strong>
        </div>
    `;
    
    document.getElementById('attendanceContent').innerHTML = attendanceHTML;
    document.getElementById('attendanceForm').style.display = 'flex';
}

// Show subjects taught by teacher
function showSubjects(teacherId) {
    const teacher = teachersData.find(t => t.id === teacherId);
    if (!teacher) return;
    
    // Additional subjects taught by the teacher
    const allSubjects = ["الرياضيات", "العلوم", "اللغة العربية", "اللغة الإنجليزية", 
                        "التربية الإسلامية", "الاجتماعيات", "التربية البدنية", "الحاسب الآلي"];
    
    // Remove teacher's main specialization from the list
    const otherSubjects = allSubjects.filter(subject => subject !== teacher.specialization);
    
    // Select 2-3 random subjects
    const additionalSubjects = otherSubjects
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 2) + 2);
    
    let subjectsHTML = `
        <h4 style="text-align: center; color: #4387AB; margin-bottom: 20px;">المواد التي يدرسها ${teacher.name}</h4>
        <div class="grades-list">
            <div class="subject-grade" style="background: #e3f2fd;">
                <span class="subject-name">${teacher.specialization}</span>
                <span class="subject-score">المادة الأساسية</span>
            </div>
    `;
    
    additionalSubjects.forEach(subject => {
        subjectsHTML += `
            <div class="subject-grade">
                <span class="subject-name">${subject}</span>
                <span class="subject-score">مادة إضافية</span>
            </div>
        `;
    });
    
    subjectsHTML += '</div>';
    
    document.getElementById('subjectsContent').innerHTML = subjectsHTML;
    document.getElementById('subjectsForm').style.display = 'flex';
}

// Form close events
function setupFormEvents() {
    document.getElementById('closeDetailsBtn')?.addEventListener('click', function() {
        document.getElementById('teacherDetailsForm').style.display = 'none';
    });
    
    document.getElementById('closeAttendanceBtn')?.addEventListener('click', function() {
        document.getElementById('attendanceForm').style.display = 'none';
    });
    
    document.getElementById('closeSubjectsBtn')?.addEventListener('click', function() {
        document.getElementById('subjectsForm').style.display = 'none';
    });
}

// Page initialization
document.addEventListener('DOMContentLoaded', function() {
    updateDate();
    updateTeachersTable();
    setupFormEvents();
});