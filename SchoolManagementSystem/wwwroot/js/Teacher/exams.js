// DOM Elements
const examsTableBody = document.getElementById('examsTableBody');
const examsTitle = document.getElementById('examsTitle');
const examLevelFilter = document.getElementById('examLevelFilter');
const examClassFilter = document.getElementById('examClassFilter');
const examSubjectFilter = document.getElementById('examSubjectFilter');
const examTypeFilter = document.getElementById('examTypeFilter');
const examStatusFilter = document.getElementById('examStatusFilter');
const applyExamFilter = document.getElementById('applyExamFilter');
const clearExamFilter = document.getElementById('clearExamFilter');
const addExamBtn = document.getElementById('addExamBtn');

// Page initialization
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateGradeOptions();
    filterAndDisplayExams();
    setupMobileMenu();
});

// Setup event listeners
function setupEventListeners() {
    examLevelFilter?.addEventListener('change', updateGradeOptions);
    applyExamFilter?.addEventListener('click', filterAndDisplayExams);
    clearExamFilter?.addEventListener('click', resetFilters);
    addExamBtn?.addEventListener('click', openAddExamModal);
    examSubjectFilter?.addEventListener('change', filterAndDisplayExams);
    examTypeFilter?.addEventListener('change', filterAndDisplayExams);
    examStatusFilter?.addEventListener('change', filterAndDisplayExams);

    document.addEventListener('click', function(e) {
        // Dynamic button events
        if (e.target.closest('.view-exam-btn')) handleViewExam(e);
        if (e.target.closest('.edit-exam-btn')) handleEditExam(e);
        if (e.target.closest('.delete-exam-btn')) handleDeleteExam(e);
        if (e.target.closest('.view-exam-grades-btn')) handleViewGrades(e);
        if (e.target.closest('.close-modal, .btn-cancel')) closeModal(e);
        if (e.target.id === 'saveExamBtn') saveExam();
        if (e.target.id === 'saveExamEditBtn') handleSaveEdit(e);
        if (e.target.id === 'addQuestionBtn') addNewQuestion();
        if (e.target.id === 'addEditQuestionBtn') addEditQuestion();
        if (e.target.closest('.remove-question-btn')) removeQuestion(e);
    });
}

function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    menuToggle?.addEventListener('click', () => sidebar.classList.toggle('active'));
}

// Filters
function updateGradeOptions() {
    if (!examClassFilter) return;
    const level = examLevelFilter?.value || 'all';
    examClassFilter.innerHTML = '<option value="all">جميع الصفوف</option>';
    
    getGradesByLevel(level).forEach(grade => {
        const option = document.createElement('option');
        option.value = grade.value;
        option.textContent = grade.name;
        examClassFilter.appendChild(option);
    });
}

function getGradesByLevel(level) {
    const grades = {
        primary: ['1-primary', '2-primary', '3-primary', '4-primary', '5-primary', '6-primary'],
        preparatory: ['1-preparatory', '2-preparatory', '3-preparatory'],
        secondary: ['1-secondary', '2-secondary', '3-secondary']
    };

    let result = [];
    if (level === 'all' || level === 'primary') {
        grades.primary.forEach(g => result.push({ value: g, name: getGradeDisplayInfo(g) }));
    }
    if (level === 'all' || level === 'preparatory') {
        grades.preparatory.forEach(g => result.push({ value: g, name: getGradeDisplayInfo(g) }));
    }
    if (level === 'all' || level === 'secondary') {
        grades.secondary.forEach(g => result.push({ value: g, name: getGradeDisplayInfo(g) }));
    }
    return result;
}

function resetFilters() {
    examLevelFilter.value = 'all';
    examClassFilter.value = 'all';
    examSubjectFilter.value = 'all';
    examTypeFilter.value = 'all';
    examStatusFilter.value = 'all';
    updateGradeOptions();
    filterAndDisplayExams();
    showNotification('تم إعادة تعيين الفلتر', 'info');
}

// Display exams
function filterAndDisplayExams() {
    if (!examsTableBody) return;
    
    const filters = {
        level: examLevelFilter?.value || 'all',
        grade: examClassFilter?.value || 'all',
        subject: examSubjectFilter?.value || 'all',
        type: examTypeFilter?.value || 'all',
        status: examStatusFilter?.value || 'all'
    };
    
    let filteredExams = getFilteredExams(filters);
    updateExamStats(filteredExams);
    displayExams(filteredExams, filters);
}

function getFilteredExams(filters) {
    let examsList = [];
    
    // Collect exams by grade or level
    if (filters.grade !== 'all') {
        examsList = exams[filters.grade] || [];
    } else if (filters.level !== 'all') {
        Object.keys(exams).forEach(gradeKey => {
            if (gradeKey.includes(filters.level)) {
                examsList = examsList.concat(exams[gradeKey] || []);
            }
        });
    } else {
        Object.values(exams).forEach(gradeExams => {
            examsList = examsList.concat(gradeExams);
        });
    }
    
    // Apply additional filters
    return examsList.filter(exam => {
        return (filters.subject === 'all' || exam.subject === filters.subject) &&
               (filters.type === 'all' || exam.type === filters.type) &&
               (filters.status === 'all' || exam.status === filters.status);
    });
}

function displayExams(examsList, filters) {
    examsTableBody.innerHTML = '';
    
    if (examsList.length === 0) {
        showEmptyState();
        return;
    }
    
    examsTitle.textContent = getTitleText(examsList.length, filters);
    
    examsList.forEach(exam => {
        examsTableBody.appendChild(createExamRow(exam));
    });
}

function createExamRow(exam) {
    const row = document.createElement('tr');
    const hasGrades = exam.grades && Object.keys(exam.grades).length > 0;
    
    row.innerHTML = `
        <td>${exam.name}</td>
        <td>${getSubjectName(exam.subject)}</td>
        <td><span class="exam-type ${exam.type}">${getExamTypeText(exam.type)}</span></td>
        <td>${exam.date}</td>
        <td>${exam.time}</td>
        <td>${exam.duration} دقيقة</td>
        <td>${exam.totalQuestions || '-'}</td>
        <td>${exam.totalMarks || '-'}</td>
        <td><span class="status ${getExamStatusClass(exam.status)}">${getExamStatusText(exam.status)}</span></td>
        <td class="actions">
            <button class="btn btn-small view-exam-btn" data-id="${exam.id}"><i class="fas fa-eye"></i></button>
            <button class="btn btn-small edit-exam-btn" data-id="${exam.id}"><i class="fas fa-edit"></i></button>
            <button class="btn btn-small btn-danger delete-exam-btn" data-id="${exam.id}"><i class="fas fa-trash"></i></button>
            <button class="btn btn-small view-exam-grades-btn" data-id="${exam.id}" ${hasGrades ? '' : 'disabled'}><i class="fas fa-chart-bar"></i></button>
        </td>
    `;
    
    return row;
}

function showEmptyState() {
    examsTableBody.innerHTML = `
        <tr><td colspan="10" class="empty-state-container">
            <i class="fas fa-file-alt"></i>
            <h3>لا توجد اختبارات</h3>
            <p>انقر على زر "إضافة اختبار جديد" لإضافة اختبارات جديدة</p>
        </td></tr>
    `;
}

function getTitleText(count, filters) {
    if (filters.grade !== 'all') {
        return `اختبارات ${getGradeDisplayInfo(filters.grade)} (${count} اختبار)`;
    } else if (filters.level !== 'all') {
        return `اختبارات ${getLevelDisplayName(filters.level)} (${count} اختبار)`;
    }
    return `جميع الاختبارات (${count} اختبار)`;
}

function updateExamStats(examsList) {
    const stats = {
        total: examsList.length,
        ongoing: examsList.filter(e => e.status === 'ongoing').length,
        completed: examsList.filter(e => e.status === 'completed').length,
        graded: examsList.filter(e => e.grades && Object.keys(e.grades).length > 0).length
    };
    
    document.getElementById('totalExamsCount').textContent = stats.total;
    document.getElementById('ongoingExamsCount').textContent = stats.ongoing;
    document.getElementById('completedExamsCount').textContent = stats.completed;
    document.getElementById('gradedExamsCount').textContent = stats.graded;
}

// Event handlers
function handleViewExam(e) {
    const examId = parseInt(e.target.closest('.view-exam-btn').dataset.id);
    viewExamDetails(examId);
}

function handleEditExam(e) {
    const examId = parseInt(e.target.closest('.edit-exam-btn').dataset.id);
    editExam(examId);
}

function handleDeleteExam(e) {
    const examId = parseInt(e.target.closest('.delete-exam-btn').dataset.id);
    if (confirm('هل أنت متأكد من حذف هذا الاختبار؟')) {
        deleteExam(examId);
    }
}

function handleViewGrades(e) {
    const examId = parseInt(e.target.closest('.view-exam-grades-btn').dataset.id);
    viewExamGrades(examId);
}

function handleSaveEdit(e) {
    const examId = parseInt(e.target.dataset.id);
    const gradeKey = e.target.dataset.grade;
    saveExamEdit(examId, gradeKey);
}

function closeModal(e) {
    const modal = e.target.closest('.modal');
    modal?.classList.remove('active');
}

function removeQuestion(e) {
    const questionItem = e.target.closest('.question-item');
    questionItem?.remove();
    updateQuestionNumbers();
}

// Exam forms
function openAddExamModal() {
    const today = new Date().toISOString().split('T')[0];
    
    const modalHtml = `
        <div class="modal active" id="addExamModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>إضافة اختبار جديد</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="addExamForm">
                        <div class="form-group">
                            <label for="examName">اسم الاختبار:</label>
                            <input type="text" id="examName" placeholder="أدخل اسم الاختبار" required>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="examSubject">المادة:</label>
                                <select id="examSubject" required>
                                    <option value="">اختر المادة...</option>
                                    <option value="math">الرياضيات</option>
                                    <option value="arabic">اللغة العربية</option>
                                    <option value="english">اللغة الإنجليزية</option>
                                    <option value="science">العلوم</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="examType">نوع الاختبار:</label>
                                <select id="examType" required>
                                    <option value="">اختر النوع...</option>
                                    <option value="quiz">اختبار قصير</option>
                                    <option value="midterm">منتصف الفصل</option>
                                    <option value="final">نهائي</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="examGrade">الصف الدراسي:</label>
                                <select id="examGrade" required>
                                    ${getGradeOptions()}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="examDate">تاريخ الاختبار:</label>
                                <input type="date" id="examDate" value="${today}" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="examTime">وقت الاختبار:</label>
                                <input type="time" id="examTime" value="08:00" required>
                            </div>
                            <div class="form-group">
                                <label for="examDuration">المدة (دقائق):</label>
                                <input type="number" id="examDuration" min="10" max="180" value="60" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="examStatus">حالة الاختبار:</label>
                            <select id="examStatus" required>
                                <option value="upcoming">قادم</option>
                                <option value="ongoing">جاري</option>
                                <option value="completed">منتهي</option>
                            </select>
                        </div>
                        
                        <div class="section-title">
                            <h3><i class="fas fa-question-circle"></i> أسئلة الاختبار</h3>
                            <button type="button" class="btn btn-small" id="addQuestionBtn">
                                <i class="fas fa-plus"></i> إضافة سؤال
                            </button>
                        </div>
                        
                        <div id="examQuestionsContainer"></div>
                        
                        <div class="form-group">
                            <label for="examNotes">ملاحظات:</label>
                            <textarea id="examNotes" rows="3" placeholder="ملاحظات إضافية (اختياري)"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn" id="saveExamBtn"><i class="fas fa-save"></i> حفظ الاختبار</button>
                    <button class="btn btn-cancel close-modal"><i class="fas fa-times"></i> إلغاء</button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('modals-container').innerHTML = modalHtml;
    addNewQuestion();
    
    // Set current grade if filtered
    if (examClassFilter?.value !== 'all') {
        document.getElementById('examGrade').value = examClassFilter.value;
    }
}

function getGradeOptions() {
    return getGradesByLevel('all').map(grade => 
        `<option value="${grade.value}">${grade.name}</option>`
    ).join('');
}

function addNewQuestion() {
    const container = document.getElementById('examQuestionsContainer');
    const questionCount = container.children.length + 1;
    
    container.insertAdjacentHTML('beforeend', `
        <div class="question-item">
            <div class="question-header">
                <h4>السؤال ${questionCount}</h4>
                <button type="button" class="btn btn-danger btn-small remove-question-btn">
                    <i class="fas fa-trash"></i> حذف
                </button>
            </div>
            
            <div class="form-group">
                <label>نص السؤال:</label>
                <textarea class="question-text" placeholder="أدخل نص السؤال" rows="3" required></textarea>
            </div>
            
            <div class="form-group">
                <label>درجة السؤال:</label>
                <input type="number" class="question-marks" min="1" max="20" value="10" required>
            </div>
            
            <div class="options-container">
                <h5>الخيارات:</h5>
                ${['أ', 'ب', 'ج', 'د'].map((letter, i) => `
                    <div class="option-row">
                        <input type="radio" name="question${questionCount}_correct" value="${String.fromCharCode(97 + i)}" class="correct-option" ${i === 0 ? 'required' : ''}>
                        <input type="text" class="option-text" placeholder="الخيار ${letter}" required>
                    </div>
                `).join('')}
            </div>
            <hr class="question-divider">
        </div>
    `);
}

function updateQuestionNumbers() {
    document.querySelectorAll('.question-item').forEach((item, index) => {
        const header = item.querySelector('.question-header h4');
        if (header) header.textContent = `السؤال ${index + 1}`;
        
        item.querySelectorAll('.correct-option').forEach(radio => {
            radio.name = `question${index + 1}_correct`;
        });
    });
}

function saveExam() {
    const formData = getFormData();
    if (!validateForm(formData)) return;
    
    const questions = collectQuestions();
    if (!validateQuestions(questions)) return;
    
    const newExam = createExamObject(formData, questions);
    addExamToData(newExam, formData.grade);
    
    document.getElementById('addExamModal')?.classList.remove('active');
    filterAndDisplayExams();
    showNotification(`تم إضافة الاختبار "${formData.name}" بنجاح`, 'success');
}

function getFormData() {
    return {
        name: document.getElementById('examName')?.value.trim() || '',
        subject: document.getElementById('examSubject')?.value || '',
        type: document.getElementById('examType')?.value || '',
        grade: document.getElementById('examGrade')?.value || '',
        date: document.getElementById('examDate')?.value || '',
        time: document.getElementById('examTime')?.value || '',
        duration: parseInt(document.getElementById('examDuration')?.value) || 60,
        status: document.getElementById('examStatus')?.value || 'upcoming',
        notes: document.getElementById('examNotes')?.value.trim() || ''
    };
}

function validateForm(data) {
    const required = ['name', 'subject', 'type', 'grade', 'date', 'time'];
    for (const field of required) {
        if (!data[field]) {
            alert(`⚠️ يرجى ${getFieldName(field)}`);
            document.getElementById(`exam${field.charAt(0).toUpperCase() + field.slice(1)}`)?.focus();
            return false;
        }
    }
    return true;
}

function getFieldName(field) {
    const names = {
        name: 'إدخال اسم الاختبار',
        subject: 'اختيار المادة',
        type: 'اختيار نوع الاختبار',
        grade: 'اختيار الصف الدراسي',
        date: 'تحديد تاريخ الاختبار',
        time: 'تحديد وقت الاختبار'
    };
    return names[field] || `ملء الحقل ${field}`;
}

function collectQuestions() {
    const questions = [];
    document.querySelectorAll('#examQuestionsContainer .question-item').forEach((item, index) => {
        const questionText = item.querySelector('.question-text')?.value.trim() || '';
        const questionMarks = parseInt(item.querySelector('.question-marks')?.value) || 10;
        const correctOption = item.querySelector('.correct-option:checked');
        
        const options = [];
        item.querySelectorAll('.option-text').forEach((input, i) => {
            const optionText = input.value.trim() || '';
            const optionId = String.fromCharCode(97 + i);
            const isCorrect = correctOption?.value === optionId;
            
            options.push({ id: optionId, text: optionText, isCorrect });
        });
        
        questions.push({
            id: index + 1,
            question: questionText,
            marks: questionMarks,
            options
        });
    });
    return questions;
}

function validateQuestions(questions) {
    if (questions.length === 0) {
        alert('⚠️ يرجى إضافة سؤال واحد على الأقل');
        return false;
    }
    
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        if (!q.question) {
            alert(`⚠️ يرجى إدخال نص السؤال ${i + 1}`);
            return false;
        }
        if (q.options.some(opt => !opt.text)) {
            alert(`⚠️ يرجى إدخال جميع خيارات السؤال ${i + 1}`);
            return false;
        }
        if (!q.options.some(opt => opt.isCorrect)) {
            alert(`⚠️ يرجى تحديد الإجابة الصحيحة للسؤال ${i + 1}`);
            return false;
        }
    }
    return true;
}

function createExamObject(formData, questions) {
    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
    
    return {
        id: Date.now(),
        name: formData.name,
        subject: formData.subject,
        type: formData.type,
        date: formatDateForDisplay(formData.date.split('-').reverse().join('-')),
        time: formData.time,
        duration: formData.duration,
        totalQuestions: questions.length,
        totalMarks: totalMarks,
        passingMarks: 50,
        status: formData.status,
        questions: questions,
        notes: formData.notes,
        studentsSubmitted: [],
        grades: {}
    };
}

function addExamToData(examData, gradeKey) {
    if (!exams[gradeKey]) exams[gradeKey] = [];
    exams[gradeKey].push(examData);
}

// View exam details
function viewExamDetails(examId) {
    const examInfo = getExamInfo(examId);
    if (!examInfo.exam) {
        showNotification('لم يتم العثور على الاختبار', 'error');
        return;
    }
    
    const modalHtml = createExamDetailsModal(examInfo);
    document.getElementById('modals-container').innerHTML = modalHtml;
}

function getExamInfo(examId) {
    for (const gradeKey in exams) {
        const exam = exams[gradeKey].find(e => e.id === examId);
        if (exam) return { exam, gradeKey };
    }
    return { exam: null, gradeKey: '' };
}

function createExamDetailsModal(examInfo) {
    const { exam, gradeKey } = examInfo;
    const questionsHtml = exam.questions?.map((q, i) => `
        <div class="exam-question-display">
            <div class="question-header">
                <strong>السؤال ${i + 1}:</strong>
                <span class="question-marks">(${q.marks} درجة)</span>
            </div>
            <p>${q.question}</p>
            <div class="options-display">
                ${q.options.map(opt => `
                    <div class="option-display ${opt.isCorrect ? 'correct-option' : ''}">
                        ${opt.id.toUpperCase()}) ${opt.text} ${opt.isCorrect ? '<span class="correct-badge">✓</span>' : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('') || '<p class="no-questions">لا توجد أسئلة لهذا الاختبار</p>';
    
    return `
        <div class="modal active">
            <div class="modal-content wide-modal">
                <div class="modal-header">
                    <h2>تفاصيل الاختبار: ${exam.name}</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="exam-info-grid">
                        <div class="info-item"><strong>المادة:</strong><span>${getSubjectName(exam.subject)}</span></div>
                        <div class="info-item"><strong>الصف:</strong><span>${getGradeDisplayInfo(gradeKey)}</span></div>
                        <div class="info-item"><strong>النوع:</strong><span>${getExamTypeText(exam.type)}</span></div>
                        <div class="info-item"><strong>التاريخ:</strong><span>${exam.date}</span></div>
                        <div class="info-item"><strong>الوقت:</strong><span>${exam.time}</span></div>
                        <div class="info-item"><strong>المدة:</strong><span>${exam.duration} دقيقة</span></div>
                    </div>
                    <div class="questions-section">
                        <h3>أسئلة الاختبار</h3>
                        ${questionsHtml}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-cancel close-modal"><i class="fas fa-times"></i> إغلاق</button>
                </div>
            </div>
        </div>
    `;
}

// View exam grades
function viewExamGrades(examId) {
    const examInfo = getExamInfo(examId);
    if (!examInfo.exam) {
        showNotification('لم يتم العثور على الاختبار', 'error');
        return;
    }
    
    const modalHtml = createExamGradesModal(examInfo);
    document.getElementById('modals-container').innerHTML = modalHtml;
}

function createExamGradesModal(examInfo) {
    const { exam, gradeKey } = examInfo;
    const grades = exam.grades || {};
    
    let gradesHtml = '';
    if (Object.keys(grades).length > 0) {
        let totalScore = 0;
        Object.entries(grades).forEach(([studentId, grade]) => {
            const student = students[studentId];
            const studentName = student?.name || `طالب ${studentId}`;
            const passed = grade >= exam.passingMarks;
            totalScore += grade;
            
            gradesHtml += `
                <tr>
                    <td>${studentId}</td>
                    <td>${studentName}</td>
                    <td>${grade}</td>
                    <td>${exam.totalMarks}</td>
                    <td>${exam.passingMarks}</td>
                    <td><span class="status ${passed ? 'status-ongoing' : 'status-upcoming'}">${passed ? 'ناجح' : 'راسب'}</span></td>
                </tr>
            `;
        });
        
        const averageScore = Math.round(totalScore / Object.keys(grades).length);
        gradesHtml += `
            <tr class="summary-row">
                <td colspan="2"><strong>المجموع:</strong></td>
                <td><strong>${totalScore}</strong></td>
                <td colspan="2"><strong>المتوسط:</strong></td>
                <td><strong>${averageScore}</strong></td>
            </tr>
        `;
    } else {
        gradesHtml = `
            <tr><td colspan="6" class="empty-state-container">
                <i class="fas fa-chart-bar"></i>
                <h3>لا توجد درجات مسجلة</h3>
                <p>لم يتم تسجيل أي درجات لهذا الاختبار بعد</p>
            </td></tr>
        `;
    }
    
    return `
        <div class="modal active">
            <div class="modal-content wide-modal">
                <div class="modal-header">
                    <h2>درجات الاختبار: ${exam.name}</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="exam-info-grid">
                        <div class="info-item"><strong>المادة:</strong><span>${getSubjectName(exam.subject)}</span></div>
                        <div class="info-item"><strong>الصف:</strong><span>${getGradeDisplayInfo(gradeKey)}</span></div>
                        <div class="info-item"><strong>التاريخ:</strong><span>${exam.date}</span></div>
                        <div class="info-item"><strong>الدرجة الكلية:</strong><span>${exam.totalMarks}</span></div>
                        <div class="info-item"><strong>درجة النجاح:</strong><span>${exam.passingMarks}</span></div>
                        <div class="info-item"><strong>عدد الطلاب:</strong><span>${Object.keys(grades).length}</span></div>
                    </div>
                    
                    <div class="table-container" style="margin-top: 20px;">
                        <h3>قائمة الدرجات</h3>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>رقم الطالب</th>
                                    <th>اسم الطالب</th>
                                    <th>الدرجة</th>
                                    <th>الدرجة الكلية</th>
                                    <th>درجة النجاح</th>
                                    <th>الحالة</th>
                                </tr>
                            </thead>
                            <tbody>${gradesHtml}</tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-cancel close-modal"><i class="fas fa-times"></i> إغلاق</button>
                </div>
            </div>
        </div>
    `;
}

// Edit exam
function editExam(examId) {
    const examInfo = getExamInfo(examId);
    if (!examInfo.exam) {
        showNotification('لم يتم العثور على الاختبار', 'error');
        return;
    }
    
    const modalHtml = createEditExamModal(examInfo);
    document.getElementById('modals-container').innerHTML = modalHtml;
}

function createEditExamModal(examInfo) {
    const { exam, gradeKey } = examInfo;
    const questionsHtml = exam.questions?.map((q, i) => `
        <div class="question-item">
            <div class="question-header">
                <h4>السؤال ${i + 1}</h4>
                <button type="button" class="btn btn-danger btn-small remove-question-btn">
                    <i class="fas fa-trash"></i> حذف
                </button>
            </div>
            <div class="form-group">
                <label>نص السؤال:</label>
                <textarea class="question-text" rows="2">${q.question}</textarea>
            </div>
            <div class="options-container">
                ${q.options.map((opt, j) => `
                    <div class="option-row">
                        <input type="radio" name="edit_question${i}_correct" value="${opt.id}" class="correct-option" ${opt.isCorrect ? 'checked' : ''}>
                        <input type="text" class="option-text" value="${opt.text}">
                    </div>
                `).join('')}
            </div>
            <div class="form-group">
                <label>درجة السؤال:</label>
                <input type="number" class="question-marks" min="1" max="20" value="${q.marks}">
            </div>
        </div>
    `).join('') || '';
    
    return `
        <div class="modal active">
            <div class="modal-content wide-modal">
                <div class="modal-header">
                    <h2>تعديل الاختبار: ${exam.name}</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="editExamForm">
                        <div class="form-group">
                            <label for="editExamName">اسم الاختبار:</label>
                            <input type="text" id="editExamName" value="${exam.name}" required>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="editExamSubject">المادة:</label>
                                <select id="editExamSubject" required>
                                    ${['math', 'arabic', 'english', 'science'].map(subj => `
                                        <option value="${subj}" ${exam.subject === subj ? 'selected' : ''}>${getSubjectName(subj)}</option>
                                    `).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="editExamType">نوع الاختبار:</label>
                                <select id="editExamType" required>
                                    ${['quiz', 'midterm', 'final'].map(type => `
                                        <option value="${type}" ${exam.type === type ? 'selected' : ''}>${getExamTypeText(type)}</option>
                                    `).join('')}
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="editExamDate">تاريخ الاختبار:</label>
                                <input type="date" id="editExamDate" value="${getDateInputFormat(exam.date)}" required>
                            </div>
                            <div class="form-group">
                                <label for="editExamTime">وقت الاختبار:</label>
                                <input type="time" id="editExamTime" value="${exam.time}" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="editExamDuration">المدة (دقائق):</label>
                                <input type="number" id="editExamDuration" min="10" max="180" value="${exam.duration}" required>
                            </div>
                            <div class="form-group">
                                <label for="editExamStatus">حالة الاختبار:</label>
                                <select id="editExamStatus" required>
                                    ${['upcoming', 'ongoing', 'completed'].map(status => `
                                        <option value="${status}" ${exam.status === status ? 'selected' : ''}>${getExamStatusText(status)}</option>
                                    `).join('')}
                                </select>
                            </div>
                        </div>
                        
                        <div class="section-title">
                            <h3>أسئلة الاختبار</h3>
                            <button type="button" class="btn btn-small" id="addEditQuestionBtn">
                                <i class="fas fa-plus"></i> إضافة سؤال
                            </button>
                        </div>
                        
                        <div id="editExamQuestionsContainer">${questionsHtml}</div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn" id="saveExamEditBtn" data-id="${exam.id}" data-grade="${gradeKey}">
                        <i class="fas fa-save"></i> حفظ التعديلات
                    </button>
                    <button class="btn btn-cancel close-modal"><i class="fas fa-times"></i> إلغاء</button>
                </div>
            </div>
        </div>
    `;
}

function addEditQuestion() {
    const container = document.getElementById('editExamQuestionsContainer');
    const questionCount = container.children.length + 1;
    
    container.insertAdjacentHTML('beforeend', `
        <div class="question-item">
            <div class="question-header">
                <h4>السؤال ${questionCount}</h4>
                <button type="button" class="btn btn-danger btn-small remove-question-btn">
                    <i class="fas fa-trash"></i> حذف
                </button>
            </div>
            <div class="form-group">
                <label>نص السؤال:</label>
                <textarea class="question-text" rows="2"></textarea>
            </div>
            <div class="options-container">
                ${['أ', 'ب', 'ج', 'د'].map((letter, i) => `
                    <div class="option-row">
                        <input type="radio" name="edit_newquestion${questionCount}_correct" value="${String.fromCharCode(97 + i)}" class="correct-option">
                        <input type="text" class="option-text" placeholder="الخيار ${letter}">
                    </div>
                `).join('')}
            </div>
            <div class="form-group">
                <label>درجة السؤال:</label>
                <input type="number" class="question-marks" min="1" max="20" value="10">
            </div>
        </div>
    `);
}

function saveExamEdit(examId, gradeKey) {
    const formData = getEditFormData();
    if (!validateEditForm(formData)) return;
    
    const questions = collectEditQuestions();
    if (!validateQuestions(questions)) return;
    
    updateExamData(examId, gradeKey, formData, questions);
    
    document.querySelector('#editExamModal')?.classList.remove('active');
    filterAndDisplayExams();
    showNotification('تم تحديث الاختبار بنجاح', 'success');
}

function getEditFormData() {
    return {
        name: document.getElementById('editExamName')?.value.trim() || '',
        subject: document.getElementById('editExamSubject')?.value || '',
        type: document.getElementById('editExamType')?.value || '',
        date: document.getElementById('editExamDate')?.value || '',
        time: document.getElementById('editExamTime')?.value || '',
        duration: parseInt(document.getElementById('editExamDuration')?.value) || 60,
        status: document.getElementById('editExamStatus')?.value || 'upcoming'
    };
}

function validateEditForm(data) {
    const required = ['name', 'subject', 'type', 'date', 'time'];
    for (const field of required) {
        if (!data[field]) {
            alert(`⚠️ يرجى ${getFieldName(field)}`);
            document.getElementById(`editExam${field.charAt(0).toUpperCase() + field.slice(1)}`)?.focus();
            return false;
        }
    }
    return true;
}

function collectEditQuestions() {
    const questions = [];
    document.querySelectorAll('#editExamQuestionsContainer .question-item').forEach((item, index) => {
        const questionText = item.querySelector('.question-text')?.value.trim() || '';
        const questionMarks = parseInt(item.querySelector('.question-marks')?.value) || 10;
        const correctOption = item.querySelector('.correct-option:checked');
        
        const options = [];
        item.querySelectorAll('.option-text').forEach((input, i) => {
            const optionText = input.value.trim() || '';
            const optionId = String.fromCharCode(97 + i);
            const isCorrect = correctOption?.value === optionId;
            
            options.push({ id: optionId, text: optionText, isCorrect });
        });
        
        questions.push({
            id: index + 1,
            question: questionText,
            marks: questionMarks,
            options
        });
    });
    return questions;
}

function updateExamData(examId, gradeKey, formData, questions) {
    const examIndex = exams[gradeKey]?.findIndex(e => e.id === examId);
    if (examIndex === -1) return;
    
    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
    
    exams[gradeKey][examIndex] = {
        ...exams[gradeKey][examIndex],
        name: formData.name,
        subject: formData.subject,
        type: formData.type,
        date: formatDateForDisplay(formData.date.split('-').reverse().join('-')),
        time: formData.time,
        duration: formData.duration,
        totalQuestions: questions.length,
        totalMarks: totalMarks,
        status: formData.status,
        questions: questions
    };
}

// Delete exam
function deleteExam(examId) {
    for (const gradeKey in exams) {
        const examIndex = exams[gradeKey]?.findIndex(e => e.id === examId);
        if (examIndex !== -1) {
            exams[gradeKey].splice(examIndex, 1);
            filterAndDisplayExams();
            showNotification('تم حذف الاختبار بنجاح', 'success');
            return;
        }
    }
    showNotification('لم يتم العثور على الاختبار', 'error');
}

// Notifications
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    existingNotification?.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}