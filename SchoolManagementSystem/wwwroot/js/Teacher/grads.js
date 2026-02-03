// Test grades data
let gradesData = [
    { id: 1, studentName: "أحمد محمد", subject: "الرياضيات", grade: 95, date: "2023-10-15" },
    { id: 2, studentName: "سارة علي", subject: "اللغة العربية", grade: 88, date: "2023-10-16" },
    { id: 3, studentName: "محمد خالد", subject: "العلوم", grade: 92, date: "2023-10-17" },
    { id: 4, studentName: "فاطمة أحمد", subject: "اللغة الإنجليزية", grade: 78, date: "2023-10-18" },
    { id: 5, studentName: "علي حسن", subject: "التاريخ", grade: 85, date: "2023-10-19" },
    { id: 6, studentName: "نورة سعيد", subject: "الرياضيات", grade: 96, date: "2023-10-20" },
    { id: 7, studentName: "خالد وليد", subject: "الجغرافيا", grade: 91, date: "2023-10-21" },
    { id: 8, studentName: "لينا عماد", subject: "العلوم", grade: 82, date: "2023-10-22" }
];

// Students data
const studentsData = [
    { id: 1, name: "أحمد محمد", class: "الصف الأول" },
    { id: 2, name: "سارة علي", class: "الصف الثاني" },
    { id: 3, name: "محمد خالد", class: "الصف الثالث" },
    { id: 4, name: "فاطمة أحمد", class: "الصف الأول" },
    { id: 5, name: "علي حسن", class: "الصف الثاني" },
    { id: 6, name: "نورة سعيد", class: "الصف الثالث" },
    { id: 7, name: "خالد وليد", class: "الصف الأول" },
    { id: 8, name: "لينا عماد", class: "الصف الثاني" },
    { id: 9, name: "يوسف كامل", class: "الصف الثالث" },
    { id: 10, name: "هدى سمير", class: "الصف الأول" }
];

// Filter variables
let currentSubjectFilter = 'all';
let currentLevelFilter = 'all';
let currentClassFilter = 'all';

// DOM Elements
const gradesTableBody = document.getElementById('gradesTableBody');
const gradeRowTemplate = document.getElementById('grade-row-template');
const emptyTableTemplate = document.getElementById('empty-table-template');
const gradeStudentCount = document.getElementById('gradeStudentCount');
const gradeAverage = document.getElementById('gradeAverage');
const gradeHighest = document.getElementById('gradeHighest');
const gradesTitle = document.getElementById('gradesTitle');
const addGradeBtn = document.getElementById('addGradeBtn');
const applyGradeFilter = document.getElementById('applyGradeFilter');
const clearGradeFilter = document.getElementById('clearGradeFilter');
const gradeSubjectFilter = document.getElementById('gradeSubjectFilter');
const gradeLevelFilter = document.getElementById('gradeLevelFilter');
const gradeClassFilter = document.getElementById('gradeClassFilter');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');

// Function to determine rating based on grade
function getRating(grade) {
    if (grade >= 90) return 'ممتاز';
    if (grade >= 80) return 'جيد جدًا';
    if (grade >= 70) return 'جيد';
    if (grade >= 60) return 'مقبول';
    return 'ضعيف';
}

// Function to determine grade color based on value
function getGradeColor(grade) {
    if (grade >= 90) return 'excellent';
    if (grade >= 80) return 'very-good';
    if (grade >= 70) return 'good';
    if (grade >= 60) return 'pass';
    return 'fail';
}

// Function to update statistics
function updateStats() {
    const filteredGrades = filterGrades();
    
    if (filteredGrades.length === 0) {
        gradeStudentCount.textContent = '0';
        gradeAverage.textContent = '0';
        gradeHighest.textContent = '0';
        return;
    }
    
    const total = filteredGrades.reduce((sum, grade) => sum + grade.grade, 0);
    const average = Math.round(total / filteredGrades.length);
    const highest = Math.max(...filteredGrades.map(grade => grade.grade));
    
    gradeStudentCount.textContent = filteredGrades.length;
    gradeAverage.textContent = average;
    gradeHighest.textContent = highest;
}

// Function to filter grades
function filterGrades() {
    let filtered = [...gradesData];
    
    if (currentSubjectFilter !== 'all') {
        filtered = filtered.filter(grade => grade.subject === getSubjectName(currentSubjectFilter));
    }
    
    // Additional filtering can be added for level and class if data contains this information
    
    return filtered;
}

// Function to get subject name from value
function getSubjectName(value) {
    const subjects = {
        'math': 'الرياضيات',
        'arabic': 'اللغة العربية',
        'science': 'العلوم',
        'english': 'اللغة الإنجليزية',
        'history': 'التاريخ',
        'geography': 'الجغرافيا'
    };
    return subjects[value] || value;
}

// Function to update table title
function updateTableTitle() {
    let title = 'درجات الطلاب';
    
    if (currentSubjectFilter !== 'all') {
        title += ` - ${getSubjectName(currentSubjectFilter)}`;
    }
    
    if (currentClassFilter !== 'all') {
        const classNames = {
            'class1': 'الصف الأول',
            'class2': 'الصف الثاني',
            'class3': 'الصف الثالث',
            'class4': 'الصف الرابع',
            'class5': 'الصف الخامس',
            'class6': 'الصف السادس'
        };
        title += ` - ${classNames[currentClassFilter] || currentClassFilter}`;
    }
    
    gradesTitle.textContent = title;
}

// Function to display grades in table
function renderGradesTable() {
    gradesTableBody.innerHTML = '';
    
    const filteredGrades = filterGrades();
    
    if (filteredGrades.length === 0) {
        const emptyTemplate = emptyTableTemplate.content.cloneNode(true);
        gradesTableBody.appendChild(emptyTemplate);
        
        // Add event for button in empty state
        const emptyAddBtn = document.getElementById('emptyAddGradeBtn');
        if (emptyAddBtn) {
            emptyAddBtn.addEventListener('click', () => showAddGradeModal());
        }
    } else {
        filteredGrades.forEach(grade => {
            const template = gradeRowTemplate.content.cloneNode(true);
            const row = template.querySelector('tr');
            
            // Fill data
            row.querySelector('.js-name').textContent = grade.studentName;
            row.querySelector('.js-subject').textContent = grade.subject;
            row.querySelector('.js-date').textContent = grade.date;
            
            // Update grade and rating
            const gradeScore = row.querySelector('.js-grade-score');
            gradeScore.textContent = grade.grade;
            gradeScore.className = `grade-score ${getGradeColor(grade.grade)}`;
            
            const rating = row.querySelector('.js-rating');
            rating.textContent = getRating(grade.grade);
            
            // Update progress bar
            const progressBar = row.querySelector('.js-progress-bar');
            progressBar.style.width = `${grade.grade}%`;
            progressBar.className = `grade-progress-bar ${getGradeColor(grade.grade)}`;
            
            // Add button events
            const editBtn = row.querySelector('.js-edit-btn');
            editBtn.setAttribute('data-id', grade.id);
            editBtn.addEventListener('click', () => showEditGradeModal(grade.id));
            
            const deleteBtn = row.querySelector('.js-delete-btn');
            deleteBtn.setAttribute('data-id', grade.id);
            deleteBtn.addEventListener('click', () => deleteGrade(grade.id));
            
            gradesTableBody.appendChild(template);
        });
    }
    
    updateStats();
    updateTableTitle();
}

// Function to show add new grade modal
function showAddGradeModal() {
    const modalHtml = `
        <div class="modal active" id="addGradeModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-plus"></i> إضافة درجة جديدة</h2>
                    <button class="close-modal" id="closeAddGradeModal">&times;</button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <form id="addGradeForm">
                        <div class="form-group" style="margin-bottom: 20px;">
                            <label for="studentSelect" style="display: block; margin-bottom: 8px; font-weight: 600;">
                                <i class="fas fa-user"></i> اسم الطالب
                            </label>
                            <select id="studentSelect" class="filter-select" required style="width: 100%;">
                                <option value="">اختر الطالب</option>
                                ${studentsData.map(student => 
                                    `<option value="${student.id}">${student.name} - ${student.class}</option>`
                                ).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group" style="margin-bottom: 20px;">
                            <label for="subjectSelect" style="display: block; margin-bottom: 8px; font-weight: 600;">
                                <i class="fas fa-book"></i> المادة
                            </label>
                            <select id="subjectSelect" class="filter-select" required style="width: 100%;">
                                <option value="">اختر المادة</option>
                                <option value="math">الرياضيات</option>
                                <option value="arabic">اللغة العربية</option>
                                <option value="science">العلوم</option>
                                <option value="english">اللغة الإنجليزية</option>
                                <option value="history">التاريخ</option>
                                <option value="geography">الجغرافيا</option>
                            </select>
                        </div>
                        
                        <div class="form-group" style="margin-bottom: 20px;">
                            <label for="gradeInput" style="display: block; margin-bottom: 8px; font-weight: 600;">
                                <i class="fas fa-chart-line"></i> الدرجة (من 100)
                            </label>
                            <input type="number" id="gradeInput" class="filter-select" 
                                   min="0" max="100" step="1" required 
                                   style="width: 100%; padding: 12px 15px;"
                                   placeholder="أدخل الدرجة">
                        </div>
                        
                        <div class="form-group" style="margin-bottom: 20px;">
                            <label for="dateInput" style="display: block; margin-bottom: 8px; font-weight: 600;">
                                <i class="fas fa-calendar"></i> تاريخ الدرجة
                            </label>
                            <input type="date" id="dateInput" class="filter-select" 
                                   required style="width: 100%; padding: 12px 15px;"
                                   value="${new Date().toISOString().split('T')[0]}">
                        </div>
                        
                        <div style="display: flex; gap: 15px; margin-top: 30px;">
                            <button type="submit" class="btn" style="flex: 1;">
                                <i class="fas fa-save"></i> حفظ الدرجة
                            </button>
                            <button type="button" class="btn btn-cancel" id="cancelAddGrade" style="flex: 1;">
                                <i class="fas fa-times"></i> إلغاء
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    const modalsContainer = document.getElementById('modals-container');
    modalsContainer.innerHTML = modalHtml;
    
    // Add events
    const closeBtn = document.getElementById('closeAddGradeModal');
    const cancelBtn = document.getElementById('cancelAddGrade');
    const form = document.getElementById('addGradeForm');
    
    closeBtn.addEventListener('click', closeAddGradeModal);
    cancelBtn.addEventListener('click', closeAddGradeModal);
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveNewGrade();
    });
    
    // Close modal when clicking outside
    const modal = document.getElementById('addGradeModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAddGradeModal();
        }
    });
}

// Function to show edit grade modal
function showEditGradeModal(gradeId) {
    const grade = gradesData.find(g => g.id === gradeId);
    if (!grade) return;
    
    const modalHtml = `
        <div class="modal active" id="editGradeModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-edit"></i> تعديل الدرجة</h2>
                    <button class="close-modal" id="closeEditGradeModal">&times;</button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <form id="editGradeForm">
                        <div class="form-group" style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600;">
                                <i class="fas fa-user"></i> اسم الطالب
                            </label>
                            <div class="filter-select" style="background-color: #f8f9fa; color: #495057;">
                                ${grade.studentName}
                            </div>
                        </div>
                        
                        <div class="form-group" style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600;">
                                <i class="fas fa-book"></i> المادة
                            </label>
                            <div class="filter-select" style="background-color: #f8f9fa; color: #495057;">
                                ${grade.subject}
                            </div>
                        </div>
                        
                        <div class="form-group" style="margin-bottom: 20px;">
                            <label for="editGradeInput" style="display: block; margin-bottom: 8px; font-weight: 600;">
                                <i class="fas fa-chart-line"></i> الدرجة (من 100)
                            </label>
                            <input type="number" id="editGradeInput" class="filter-select" 
                                   min="0" max="100" step="1" required 
                                   style="width: 100%; padding: 12px 15px;"
                                   value="${grade.grade}">
                        </div>
                        
                        <div class="form-group" style="margin-bottom: 20px;">
                            <label for="editDateInput" style="display: block; margin-bottom: 8px; font-weight: 600;">
                                <i class="fas fa-calendar"></i> تاريخ الدرجة
                            </label>
                            <input type="date" id="editDateInput" class="filter-select" 
                                   required style="width: 100%; padding: 12px 15px;"
                                   value="${grade.date}">
                        </div>
                        
                        <div style="display: flex; gap: 15px; margin-top: 30px;">
                            <button type="submit" class="btn" style="flex: 1;">
                                <i class="fas fa-save"></i> حفظ التعديلات
                            </button>
                            <button type="button" class="btn btn-cancel" id="cancelEditGrade" style="flex: 1;">
                                <i class="fas fa-times"></i> إلغاء
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    const modalsContainer = document.getElementById('modals-container');
    modalsContainer.innerHTML = modalHtml;
    
    // Add events
    const closeBtn = document.getElementById('closeEditGradeModal');
    const cancelBtn = document.getElementById('cancelEditGrade');
    const form = document.getElementById('editGradeForm');
    
    closeBtn.addEventListener('click', closeEditGradeModal);
    cancelBtn.addEventListener('click', closeEditGradeModal);
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveEditedGrade(gradeId);
    });
    
    // Close modal when clicking outside
    const modal = document.getElementById('editGradeModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeEditGradeModal();
        }
    });
}

// Function to save new grade
function saveNewGrade() {
    const studentId = parseInt(document.getElementById('studentSelect').value);
    const subjectValue = document.getElementById('subjectSelect').value;
    const gradeValue = parseInt(document.getElementById('gradeInput').value);
    const dateValue = document.getElementById('dateInput').value;
    
    if (!studentId || !subjectValue || isNaN(gradeValue) || !dateValue) {
        alert('يرجى ملء جميع الحقول بشكل صحيح');
        return;
    }
    
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;
    
    const newGrade = {
        id: gradesData.length > 0 ? Math.max(...gradesData.map(g => g.id)) + 1 : 1,
        studentName: student.name,
        subject: getSubjectName(subjectValue),
        grade: gradeValue,
        date: dateValue
    };
    
    gradesData.push(newGrade);
    closeAddGradeModal();
    renderGradesTable();
    
    // Show success message
    showMessage('تم إضافة الدرجة بنجاح', 'success');
}

// Function to save grade edits
function saveEditedGrade(gradeId) {
    const gradeValue = parseInt(document.getElementById('editGradeInput').value);
    const dateValue = document.getElementById('editDateInput').value;
    
    if (isNaN(gradeValue) || !dateValue) {
        alert('يرجى ملء جميع الحقول بشكل صحيح');
        return;
    }
    
    const gradeIndex = gradesData.findIndex(g => g.id === gradeId);
    if (gradeIndex === -1) return;
    
    gradesData[gradeIndex].grade = gradeValue;
    gradesData[gradeIndex].date = dateValue;
    
    closeEditGradeModal();
    renderGradesTable();
    
    // Show success message
    showMessage('تم تعديل الدرجة بنجاح', 'success');
}

// Function to delete grade
function deleteGrade(gradeId) {
    if (!confirm('هل أنت متأكد من حذف هذه الدرجة؟')) {
        return;
    }
    
    gradesData = gradesData.filter(g => g.id !== gradeId);
    renderGradesTable();
    
    // Show success message
    showMessage('تم حذف الدرجة بنجاح', 'success');
}

// Function to close add grade modal
function closeAddGradeModal() {
    const modal = document.getElementById('addGradeModal');
    if (modal) {
        modal.remove();
    }
}

// Function to close edit grade modal
function closeEditGradeModal() {
    const modal = document.getElementById('editGradeModal');
    if (modal) {
        modal.remove();
    }
}

// Function to show message to user
function showMessage(message, type = 'info') {
    // Remove any previous message
    const existingMessage = document.querySelector('.message-alert');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const colors = {
        'success': '#4caf50',
        'error': '#f44336',
        'info': '#2196f3',
        'warning': '#ff9800'
    };
    
    const messageHtml = `
        <div class="message-alert" style="
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: ${colors[type] || colors.info};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 2000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideDown 0.3s ease;
        ">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', messageHtml);
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { top: -100px; opacity: 0; }
            to { top: 20px; opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        const messageEl = document.querySelector('.message-alert');
        if (messageEl) {
            messageEl.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }
        style.remove();
    }, 3000);
}

// Add events for filters
applyGradeFilter.addEventListener('click', function() {
    currentSubjectFilter = gradeSubjectFilter.value;
    currentLevelFilter = gradeLevelFilter.value;
    currentClassFilter = gradeClassFilter.value;
    renderGradesTable();
});

clearGradeFilter.addEventListener('click', function() {
    gradeSubjectFilter.value = 'all';
    gradeLevelFilter.value = 'all';
    gradeClassFilter.value = 'all';
    
    currentSubjectFilter = 'all';
    currentLevelFilter = 'all';
    currentClassFilter = 'all';
    
    renderGradesTable();
});

// Add event for add grade button
addGradeBtn.addEventListener('click', () => showAddGradeModal());

// Add events for mobile menu
menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('sidebar-active');
});

document.addEventListener('click', function(event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnMenuToggle = menuToggle.contains(event.target);
    
    if (!isClickInsideSidebar && !isClickOnMenuToggle && window.innerWidth <= 992) {
        sidebar.classList.remove('active');
        mainContent.classList.remove('sidebar-active');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    renderGradesTable();
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from { top: 20px; opacity: 1; }
            to { top: -100px; opacity: 0; }
        }
        
        .main-content.sidebar-active {
            margin-right: 250px;
        }
    `;
    document.head.appendChild(style);
});