// Supervisors data
const supervisorsData = [
    {id: 1, name: "علي محمد حسن", number: "2001", phone: "0511234567", role: "مشرف تربوي", attendance: 98, performance: "excellent", evaluation: 96},
    {id: 2, name: "نورة أحمد سعيد", number: "2002", phone: "0512345678", role: "مشرف أكاديمي", attendance: 96, performance: "excellent", evaluation: 94},
    {id: 3, name: "محمود خالد عبدالله", number: "2003", phone: "0513456789", role: "مشرف أنشطة", attendance: 92, performance: "very-good", evaluation: 88},
    {id: 4, name: "هدى يوسف محمد", number: "2004", phone: "0514567890", role: "مشرف تقني", attendance: 85, performance: "good", evaluation: 82},
    {id: 5, name: "سالم راشد العلي", number: "2005", phone: "0515678901", role: "مشرف تربوي", attendance: 99, performance: "excellent", evaluation: 95},
    {id: 6, name: "أمل عبد الرحمن", number: "2006", phone: "0516789012", role: "مشرف جودة", attendance: 90, performance: "very-good", evaluation: 85},
    {id: 7, name: "يوسف محمد أحمد", number: "2007", phone: "0517890123", role: "مشرف امتحانات", attendance: 88, performance: "good", evaluation: 80}
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

// Update supervisors table
function updateSupervisorsTable() {
    const tableBody = document.getElementById('supervisorsTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    supervisorsData.forEach(supervisor => {
        // Determine performance color
        let performanceClass = '';
        let performanceText = '';
        
        switch(supervisor.performance) {
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
        const attendanceClass = supervisor.attendance >= 90 ? 'present' : 'absent';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${supervisor.name}</td>
            <td><span class="status ${attendanceClass}">${supervisor.attendance}%</span></td>
            <td><span class="performance ${performanceClass}">${performanceText}</span></td>
            <td><span class="grade">${supervisor.evaluation}%</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-btn" onclick="showSupervisorDetails(${supervisor.id})">
                        عرض البيانات
                    </button>
                    <button class="action-btn attendance-btn" onclick="showAttendance(${supervisor.id})">
                        الحضور
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Display supervisor details
function showSupervisorDetails(supervisorId) {
    const supervisor = supervisorsData.find(s => s.id === supervisorId);
    if (!supervisor) return;
    
    document.getElementById('detailName').value = supervisor.name;
    document.getElementById('detailNumber').value = supervisor.number;
    document.getElementById('detailPhone').value = supervisor.phone;
    document.getElementById('detailRole').value = supervisor.role;
    document.getElementById('detailAttendance').value = supervisor.attendance + '%';
    document.getElementById('detailPerformance').value = supervisor.evaluation + '%';
    
    document.getElementById('supervisorDetailsForm').style.display = 'flex';
}

// Display supervisor attendance
function showAttendance(supervisorId) {
    const supervisor = supervisorsData.find(s => s.id === supervisorId);
    if (!supervisor) return;
    
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    let attendanceHTML = `
        <h4 style="text-align: center; color: #4387AB; margin-bottom: 20px;">حضور ${supervisor.name}</h4>
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
            <strong>إجمالي الحضور: ${supervisor.attendance}%</strong>
        </div>
    `;
    
    document.getElementById('attendanceContent').innerHTML = attendanceHTML;
    document.getElementById('attendanceForm').style.display = 'flex';
}

// Form close events
function setupFormEvents() {
    document.getElementById('closeDetailsBtn')?.addEventListener('click', function() {
        document.getElementById('supervisorDetailsForm').style.display = 'none';
    });
    
    document.getElementById('closeAttendanceBtn')?.addEventListener('click', function() {
        document.getElementById('attendanceForm').style.display = 'none';
    });
}

// Page initialization
document.addEventListener('DOMContentLoaded', function() {
    updateDate();
    updateSupervisorsTable();
    setupFormEvents();
});