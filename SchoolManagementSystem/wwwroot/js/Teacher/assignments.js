/* ASSIGNMENTS PAGE JAVASCRIPT */

// DOM Elements
const assignmentsTableBody = document.getElementById('assignmentsTableBody');
const assignmentsTitle = document.getElementById('assignmentsTitle');
const assignmentLevelFilter = document.getElementById('assignmentLevelFilter');
const assignmentClassFilter = document.getElementById('assignmentClassFilter');
const assignmentSubjectFilter = document.getElementById('assignmentSubjectFilter');
const assignmentStatusFilter = document.getElementById('assignmentStatusFilter');
const applyAssignmentFilter = document.getElementById('applyAssignmentFilter');
const clearAssignmentFilter = document.getElementById('clearAssignmentFilter');
const addAssignmentBtn = document.getElementById('addAssignmentBtn');

// Initialize page when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ صفحة الواجبات تم تحميلها');
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize grade filter options
    updateGradeOptions();
    
    // Load and display assignments
    filterAndDisplayAssignments();
    
    // Mobile menu toggle
    setupMobileMenu();
});

/* EVENT LISTENERS SETUP */

function setupEventListeners() {
    // Level filter change
    if (assignmentLevelFilter) {
        assignmentLevelFilter.addEventListener('change', function() {
            updateGradeOptions();
        });
    }

    // Apply filter button
    if (applyAssignmentFilter) {
        applyAssignmentFilter.addEventListener('click', filterAndDisplayAssignments);
    }

    // Clear filter button
    if (clearAssignmentFilter) {
        clearAssignmentFilter.addEventListener('click', resetFilters);
    }

    // Add assignment button
    if (addAssignmentBtn) {
        addAssignmentBtn.addEventListener('click', openAddAssignmentModal);
    }

    // Subject filter change
    if (assignmentSubjectFilter) {
        assignmentSubjectFilter.addEventListener('change', filterAndDisplayAssignments);
    }

    // Status filter change
    if (assignmentStatusFilter) {
        assignmentStatusFilter.addEventListener('change', filterAndDisplayAssignments);
    }

    // Event delegation for dynamic elements
    document.addEventListener('click', function(e) {
        // Edit assignment button
        if (e.target.closest('.edit-assignment-btn')) {
            const button = e.target.closest('.edit-assignment-btn');
            const assignmentId = parseInt(button.dataset.id);
            editAssignment(assignmentId);
        }

        // Delete assignment button
        if (e.target.closest('.delete-assignment-btn')) {
            const button = e.target.closest('.delete-assignment-btn');
            const assignmentId = parseInt(button.dataset.id);
            deleteAssignment(assignmentId);
        }

        // Modal close buttons
        if (e.target.classList.contains('close-modal') || e.target.classList.contains('btn-cancel')) {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        }

        // Save new assignment
        if (e.target.id === 'saveNewAssignmentBtn') {
            saveNewAssignment();
        }

        // Save assignment edit
        if (e.target.id === 'saveAssignmentEditBtn') {
            const assignmentId = parseInt(e.target.dataset.id);
            const gradeKey = e.target.dataset.grade;
            saveAssignmentEdit(assignmentId, gradeKey);
        }

        // File upload click
        if (e.target.closest('.file-upload-label')) {
            const fileInput = e.target.closest('.file-upload-container').querySelector('.file-input');
            if (fileInput) {
                fileInput.click();
            }
        }

        // File input change
        if (e.target.classList.contains('file-input')) {
            const fileName = e.target.files[0]?.name;
            if (fileName) {
                showNotification(`تم اختيار الملف: ${fileName}`, 'success');
            }
        }
    });
}

/* MOBILE MENU SETUP */

function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
}

/* FILTER FUNCTIONS */

function updateGradeOptions() {
    if (!assignmentClassFilter) return;
    
    const level = assignmentLevelFilter ? assignmentLevelFilter.value : 'all';
    assignmentClassFilter.innerHTML = '<option value="all">جميع الفصول</option>';
    
    const gradeList = getGradesByLevel(level);
    gradeList.forEach(grade => {
        const option = document.createElement('option');
        option.value = grade.value;
        option.textContent = grade.name;
        assignmentClassFilter.appendChild(option);
    });
}

function getGradesByLevel(level) {
    const gradeList = [];
    
    if (level === 'all' || level === 'primary') {
        gradeList.push(
            { value: '1-primary', name: 'الصف الأول الابتدائي' },
            { value: '2-primary', name: 'الصف الثاني الابتدائي' },
            { value: '3-primary', name: 'الصف الثالث الابتدائي' },
            { value: '4-primary', name: 'الصف الرابع الابتدائي' },
            { value: '5-primary', name: 'الصف الخامس الابتدائي' },
            { value: '6-primary', name: 'الصف السادس الابتدائي' }
        );
    }
    
    if (level === 'all' || level === 'preparatory') {
        gradeList.push(
            { value: '1-preparatory', name: 'الصف الأول الإعدادي' },
            { value: '2-preparatory', name: 'الصف الثاني الإعدادي' },
            { value: '3-preparatory', name: 'الصف الثالث الإعدادي' }
        );
    }
    
    if (level === 'all' || level === 'secondary') {
        gradeList.push(
            { value: '1-secondary', name: 'الصف الأول الثانوي' },
            { value: '2-secondary', name: 'الصف الثاني الثانوي' },
            { value: '3-secondary', name: 'الصف الثالث الثانوي' }
        );
    }
    
    return gradeList;
}

function resetFilters() {
    if (assignmentLevelFilter) assignmentLevelFilter.value = 'all';
    if (assignmentClassFilter) {
        assignmentClassFilter.value = 'all';
        updateGradeOptions();
    }
    if (assignmentSubjectFilter) assignmentSubjectFilter.value = 'all';
    if (assignmentStatusFilter) assignmentStatusFilter.value = 'all';
    
    filterAndDisplayAssignments();
    showNotification('تم إعادة تعيين الفلاتر', 'info');
}

/* DISPLAY ASSIGNMENTS FUNCTIONS */

function filterAndDisplayAssignments() {
    if (!assignmentsTableBody) return;
    
    const level = assignmentLevelFilter ? assignmentLevelFilter.value : 'all';
    const grade = assignmentClassFilter ? assignmentClassFilter.value : 'all';
    const subject = assignmentSubjectFilter ? assignmentSubjectFilter.value : 'all';
    const status = assignmentStatusFilter ? assignmentStatusFilter.value : 'all';
    
    let filteredAssignments = [];
    let titleText = 'قائمة الواجبات';
    
    // Filter by specific class
    if (grade !== 'all') {
        filteredAssignments = assignments[grade] || [];
        const gradeInfo = getGradeDisplayInfo(grade);
        titleText = `واجبات ${gradeInfo}`;
    } 
    // Filter by level
    else if (level !== 'all') {
        Object.keys(assignments).forEach(gradeKey => {
            if (gradeKey.includes(level)) {
                filteredAssignments = filteredAssignments.concat(assignments[gradeKey] || []);
            }
        });
        const levelName = getLevelDisplayName(level);
        titleText = `واجبات ${levelName}`;
    } 
    // Show all assignments
    else {
        Object.keys(assignments).forEach(gradeKey => {
            filteredAssignments = filteredAssignments.concat(assignments[gradeKey] || []);
        });
        titleText = 'جميع الواجبات';
    }
    
    // Filter by subject
    if (subject !== 'all') {
        filteredAssignments = filteredAssignments.filter(assignment => assignment.subject === subject);
    }
    
    // Filter by status
    if (status !== 'all') {
        filteredAssignments = filteredAssignments.filter(assignment => assignment.status === status);
    }
    
    // Update statistics
    updateAssignmentStats(filteredAssignments);
    
    // Update table title
    if (assignmentsTitle) {
        assignmentsTitle.textContent = `${titleText} (${filteredAssignments.length} واجب)`;
    }

    // Show empty state if no assignments
    if (filteredAssignments.length === 0) {
        showEmptyState();
        return;
    }
    
    // Display assignments in table
    displayAssignmentsInTable(filteredAssignments);
}

function displayAssignmentsInTable(assignmentsData) {
    const rowTemplate = document.getElementById('assignment-row-template');
    
    assignmentsData.forEach(assignment => {
        const subjectName = getSubjectName(assignment.subject);
        const statusText = getAssignmentStatusText(assignment.status);
        const statusClass = getAssignmentStatusClass(assignment.status);
        const attachmentHtml = assignment.attachment ? 
            `<a href="#" class="file-attachment" title="${assignment.attachment}">
                <i class="fas fa-paperclip"></i> ${assignment.attachment}
            </a>` : 
            '<span class="attachment-status not-attached">لا يوجد</span>';
        
        const clone = rowTemplate.content.cloneNode(true);
        
        // Fill assignment data
        clone.querySelector('.js-name').textContent = assignment.name;
        clone.querySelector('.js-subject').textContent = subjectName;
        clone.querySelector('.js-start-date').textContent = assignment.startDate;
        clone.querySelector('.js-end-date').textContent = assignment.endDate;
        clone.querySelector('.js-attachment').innerHTML = attachmentHtml;
        clone.querySelector('.js-status').textContent = statusText;
        clone.querySelector('.js-status').className = `status js-status ${statusClass}`;
        clone.querySelector('.js-edit-btn').dataset.id = assignment.id;
        clone.querySelector('.js-delete-btn').dataset.id = assignment.id;
        
        // Add row to table
        assignmentsTableBody.appendChild(clone);
    });
}

function showEmptyState() {
    const template = document.getElementById('empty-table-template');
    const clone = template.content.cloneNode(true);
    
    if (assignmentClassFilter && assignmentClassFilter.value !== 'all') {
        clone.querySelector('.js-empty-msg').textContent = 'لا توجد واجبات لهذا الفصل';
    } else {
        clone.querySelector('.js-empty-msg').textContent = 'لم يتم العثور على واجبات';
    }
    
    assignmentsTableBody.appendChild(clone);
}

function updateAssignmentStats(assignmentsData) {
    const stats = {
        total: assignmentsData.length,
        submitted: assignmentsData.filter(a => a.status === 'completed').length,
        pending: assignmentsData.filter(a => a.status === 'pending').length,
        overdue: assignmentsData.filter(a => {
            if (a.status !== 'pending') return false;
            const endDate = new Date(a.endDate.split('-').reverse().join('-'));
            const today = new Date();
            return endDate < today;
        }).length
    };
    
    // Update statistics display
    const totalElement = document.getElementById('totalAssignments');
    const submittedElement = document.getElementById('submittedAssignments');
    const pendingElement = document.getElementById('pendingAssignments');
    const overdueElement = document.getElementById('overdueAssignments');
    
    if (totalElement) totalElement.textContent = stats.total;
    if (submittedElement) submittedElement.textContent = stats.submitted;
    if (pendingElement) pendingElement.textContent = stats.pending;
    if (overdueElement) overdueElement.textContent = stats.overdue;
}

/* ASSIGNMENT STATUS HELPERS */

function getAssignmentStatusText(status) {
    const statuses = {
        "active": "نشط",
        "completed": "مكتمل",
        "pending": "قيد الانتظار"
    };
    return statuses[status] || status;
}

function getAssignmentStatusClass(status) {
    const classes = {
        "active": "status-pending",
        "completed": "status-completed",
        "pending": "status-warning"
    };
    return classes[status] || "";
}

/* MODAL FUNCTIONS */

function openAddAssignmentModal() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const modalHtml = `
        <div class="modal active assignment-modal" id="addAssignmentModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>إضافة واجب جديد</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="newAssignmentName">اسم الواجب:</label>
                        <input type="text" id="newAssignmentName" placeholder="أدخل اسم الواجب" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="newAssignmentSubject">المادة:</label>
                            <select id="newAssignmentSubject" class="filter-select" required>
                                <option value="">اختر المادة...</option>
                                <option value="math">الرياضيات</option>
                                <option value="arabic">اللغة العربية</option>
                                <option value="english">اللغة الإنجليزية</option>
                                <option value="science">العلوم</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="newAssignmentGrade">الفصل:</label>
                            <select id="newAssignmentGrade" class="filter-select" required>
                                <option value="">اختر الفصل...</option>
                                <option value="1-primary">الصف الأول الابتدائي</option>
                                <option value="2-primary">الصف الثاني الابتدائي</option>
                                <option value="3-primary">الصف الثالث الابتدائي</option>
                                <option value="4-primary">الصف الرابع الابتدائي</option>
                                <option value="5-primary">الصف الخامس الابتدائي</option>
                                <option value="6-primary">الصف السادس الابتدائي</option>
                                <option value="1-preparatory">الصف الأول الإعدادي</option>
                                <option value="2-preparatory">الصف الثاني الإعدادي</option>
                                <option value="3-preparatory">الصف الثالث الإعدادي</option>
                                <option value="1-secondary">الصف الأول الثانوي</option>
                                <option value="2-secondary">الصف الثاني الثانوي</option>
                                <option value="3-secondary">الصف الثالث الثانوي</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="assignmentStartDate">تاريخ البدء:</label>
                            <input type="date" id="assignmentStartDate" value="${today.toISOString().split('T')[0]}" required>
                        </div>
                        <div class="form-group">
                            <label for="assignmentEndDate">تاريخ الاستحقاق:</label>
                            <input type="date" id="assignmentEndDate" value="${tomorrow.toISOString().split('T')[0]}" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="newAssignmentFile">ملف الواجب (PDF فقط):</label>
                        <div class="file-upload-container">
                            <input type="file" id="newAssignmentFile" accept=".pdf" class="file-input" required>
                            <label for="newAssignmentFile" class="file-upload-label">
                                <i class="fas fa-upload"></i> اختر ملف PDF
                            </label>
                        </div>
                        <p class="form-hint">الحد الأقصى لحجم الملف: 10 ميجابايت</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn" id="saveNewAssignmentBtn">
                        <i class="fas fa-save"></i> حفظ الواجب
                    </button>
                    <button class="btn btn-cancel close-modal">
                        <i class="fas fa-times"></i> إلغاء
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.getElementById('modals-container');
    if (modalContainer) {
        modalContainer.innerHTML = modalHtml;
        
        // Pre-select current class if filtered
        if (assignmentClassFilter && assignmentClassFilter.value !== 'all') {
            const gradeSelect = document.getElementById('newAssignmentGrade');
            if (gradeSelect) {
                gradeSelect.value = assignmentClassFilter.value;
            }
        }
    }
}

function editAssignment(assignmentId) {
    // Find assignment data
    let assignmentData = null;
    let assignmentGradeKey = '';
    
    Object.keys(assignments).forEach(gradeKey => {
        const assignment = assignments[gradeKey]?.find(a => a.id === assignmentId);
        if (assignment) {
            assignmentData = assignment;
            assignmentGradeKey = gradeKey;
        }
    });
    
    if (!assignmentData) {
        showNotification('لم يتم العثور على الواجب', 'error');
        return;
    }
    
    // Create modal
    const modalHtml = `
        <div class="modal active assignment-modal" id="editAssignmentModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>تعديل الواجب: ${assignmentData.name}</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="editAssignmentName">اسم الواجب:</label>
                        <input type="text" id="editAssignmentName" value="${assignmentData.name}" required>
                    </div>
                    <div class="form-group">
                        <label for="editAssignmentSubject">المادة:</label>
                        <select id="editAssignmentSubject" class="filter-select">
                            <option value="math" ${assignmentData.subject === 'math' ? 'selected' : ''}>الرياضيات</option>
                            <option value="arabic" ${assignmentData.subject === 'arabic' ? 'selected' : ''}>اللغة العربية</option>
                            <option value="english" ${assignmentData.subject === 'english' ? 'selected' : ''}>اللغة الإنجليزية</option>
                            <option value="science" ${assignmentData.subject === 'science' ? 'selected' : ''}>العلوم</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="editAssignmentStartDate">تاريخ البدء:</label>
                            <input type="date" id="editAssignmentStartDate" value="${getDateInputFormat(assignmentData.startDate)}">
                        </div>
                        <div class="form-group">
                            <label for="editAssignmentEndDate">تاريخ الاستحقاق:</label>
                            <input type="date" id="editAssignmentEndDate" value="${getDateInputFormat(assignmentData.endDate)}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="editAssignmentStatus">الحالة:</label>
                        <select id="editAssignmentStatus" class="filter-select">
                            <option value="pending" ${assignmentData.status === 'pending' ? 'selected' : ''}>قيد الانتظار</option>
                            <option value="completed" ${assignmentData.status === 'completed' ? 'selected' : ''}>مكتمل</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>الملف الحالي: ${assignmentData.attachment}</label>
                        <p class="form-hint">لا يمكن تغيير الملف بعد التحميل</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn" id="saveAssignmentEditBtn" data-id="${assignmentId}" data-grade="${assignmentGradeKey}">
                        <i class="fas fa-save"></i> حفظ التغييرات
                    </button>
                    <button class="btn btn-cancel close-modal">
                        <i class="fas fa-times"></i> إلغاء
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.getElementById('modals-container');
    if (modalContainer) {
        modalContainer.innerHTML = modalHtml;
    }
}

/* ASSIGNMENT CRUD OPERATIONS */

function saveNewAssignment() {
    const assignmentName = document.getElementById('newAssignmentName')?.value.trim();
    const assignmentSubject = document.getElementById('newAssignmentSubject')?.value;
    const startDate = document.getElementById('assignmentStartDate')?.value;
    const endDate = document.getElementById('assignmentEndDate')?.value;
    const assignmentGrade = document.getElementById('newAssignmentGrade')?.value;
    const assignmentFile = document.getElementById('newAssignmentFile')?.files[0];
    
    // Validation
    if (!assignmentName) {
        alert('⚠️ الرجاء إدخال اسم الواجب');
        document.getElementById('newAssignmentName')?.focus();
        return;
    }
    
    if (!assignmentSubject) {
        alert('⚠️ الرجاء اختيار المادة');
        document.getElementById('newAssignmentSubject')?.focus();
        return;
    }
    
    if (!assignmentGrade) {
        alert('⚠️ الرجاء اختيار الفصل');
        document.getElementById('newAssignmentGrade')?.focus();
        return;
    }
    
    if (!startDate) {
        alert('⚠️ الرجاء اختيار تاريخ البدء');
        document.getElementById('assignmentStartDate')?.focus();
        return;
    }
    
    if (!endDate) {
        alert('⚠️ الرجاء اختيار تاريخ الاستحقاق');
        document.getElementById('assignmentEndDate')?.focus();
        return;
    }
    
    if (!assignmentFile) {
        alert('⚠️ الرجاء تحميل ملف الواجب');
        document.getElementById('newAssignmentFile')?.click();
        return;
    }
    
    // Check file type
    const allowedTypes = ['.pdf'];
    const fileExt = '.' + assignmentFile.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExt)) {
        alert('⚠️ نوع الملف غير مسموح. الرجاء تحميل ملف PDF فقط');
        document.getElementById('newAssignmentFile').value = '';
        return;
    }
    
    // Check file size
    if (assignmentFile.size > 10 * 1024 * 1024) {
        alert('⚠️ حجم الملف كبير جداً. الحد الأقصى هو 10 ميجابايت');
        document.getElementById('newAssignmentFile').value = '';
        return;
    }
    
    // Generate new assignment ID
    const newId = Date.now();
    
    // Create new assignment object
    const newAssignment = {
        id: newId,
        name: assignmentName,
        subject: assignmentSubject,
        startDate: formatDateForDisplay(startDate),
        endDate: formatDateForDisplay(endDate),
        attachment: assignmentFile.name,
        status: "pending"
    };
    
    // Add to assignments array
    if (!assignments[assignmentGrade]) {
        assignments[assignmentGrade] = [];
    }
    
    assignments[assignmentGrade].push(newAssignment);
    
    // Close modal
    const modal = document.getElementById('addAssignmentModal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    // Refresh display
    filterAndDisplayAssignments();
    
    // Show success message
    showNotification(`تم إضافة الواجب "${assignmentName}" بنجاح`, 'success');
}

function saveAssignmentEdit(assignmentId, gradeKey) {
    const name = document.getElementById('editAssignmentName')?.value.trim();
    const subject = document.getElementById('editAssignmentSubject')?.value;
    const startDate = document.getElementById('editAssignmentStartDate')?.value;
    const endDate = document.getElementById('editAssignmentEndDate')?.value;
    const status = document.getElementById('editAssignmentStatus')?.value;
    
    // Validation
    if (!name) {
        alert('⚠️ الرجاء إدخال اسم الواجب');
        document.getElementById('editAssignmentName')?.focus();
        return;
    }
    
    if (!startDate || !endDate) {
        alert('⚠️ الرجاء اختيار تاريخي البدء والاستحقاق');
        return;
    }
    
    // Find assignment index
    const assignmentIndex = assignments[gradeKey]?.findIndex(a => a.id === assignmentId);
    if (assignmentIndex === -1) {
        showNotification('لم يتم العثور على الواجب', 'error');
        return;
    }
    
    // Update assignment data
    assignments[gradeKey][assignmentIndex].name = name;
    assignments[gradeKey][assignmentIndex].subject = subject;
    assignments[gradeKey][assignmentIndex].startDate = formatDateForDisplay(startDate);
    assignments[gradeKey][assignmentIndex].endDate = formatDateForDisplay(endDate);
    assignments[gradeKey][assignmentIndex].status = status;
    
    // Close modal
    const modal = document.getElementById('editAssignmentModal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    // Refresh display
    filterAndDisplayAssignments();
    
    // Show success message
    showNotification('تم تحديث الواجب بنجاح', 'success');
}

function deleteAssignment(assignmentId) {
    // Confirmation
    if (!confirm('هل أنت متأكد من حذف هذا الواجب؟')) {
        return;
    }
    
    let found = false;
    
    // Find and delete assignment
    Object.keys(assignments).forEach(gradeKey => {
        const assignmentIndex = assignments[gradeKey]?.findIndex(e => e.id === assignmentId);
        if (assignmentIndex !== -1) {
            assignments[gradeKey].splice(assignmentIndex, 1);
            found = true;
        }
    });
    
    if (found) {
        // Refresh display
        filterAndDisplayAssignments();
        
        // Show success message
        showNotification('تم حذف الواجب بنجاح', 'success');
    } else {
        showNotification('لم يتم العثور على الواجب', 'error');
    }
}

/* UTILITY FUNCTIONS */

function getDateInputFormat(dateString) {
    if (!dateString || dateString === 'غير محدد') return '';
    const parts = dateString.split('-');
    if (parts.length !== 3) return '';
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}