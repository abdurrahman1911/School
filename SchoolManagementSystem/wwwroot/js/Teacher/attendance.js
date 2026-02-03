// Test data for students with notes
let studentsNotesData = [
    { 
        id: 1, 
        studentName: "أحمد محمد", 
        class: "الصف الأول", 
        notes: [
            { date: "2023-10-15", note: "متفوق في الرياضيات ويحتاج لمزيد من التحديات" },
            { date: "2023-10-18", note: "شارك بنشاط في الحصة اليوم" }
        ] 
    },
    { 
        id: 2, 
        studentName: "سارة علي", 
        class: "الصف الثاني", 
        notes: [
            { date: "2023-10-16", note: "تتطلب مزيداً من التركيز في مادة اللغة العربية" }
        ] 
    },
    { 
        id: 3, 
        studentName: "محمد خالد", 
        class: "الصف الثالث", 
        notes: [] 
    },
    { 
        id: 4, 
        studentName: "فاطمة أحمد", 
        class: "الصف الأول", 
        notes: [
            { date: "2023-10-18", note: "متميزة في الأنشطة الفنية" },
            { date: "2023-10-20", note: "تحتاج لمتابعة في الواجبات المنزلية" }
        ] 
    },
    { 
        id: 5, 
        studentName: "علي حسن", 
        class: "الصف الثاني", 
        notes: [] 
    },
    { 
        id: 6, 
        studentName: "نورة سعيد", 
        class: "الصف الثالث", 
        notes: [
            { date: "2023-10-21", note: "متألقة في القراءة والكتابة" }
        ] 
    },
    { 
        id: 7, 
        studentName: "خالد وليد", 
        class: "الصف الأول", 
        notes: [] 
    },
    { 
        id: 8, 
        studentName: "لينا عماد", 
        class: "الصف الثاني", 
        notes: [
            { date: "2023-10-22", note: "تحتاج لمزيد من التدريب على العمليات الحسابية" }
        ] 
    }
];

// Filter variables
let currentLevelFilter = 'all';
let currentClassFilter = 'all';
let currentDateFilter = '';
let currentNotesFilter = 'all';

// DOM Elements
const attendanceTableBody = document.getElementById('attendanceTableBody');
const attendanceRowTemplate = document.getElementById('attendance-row-template');
const emptyTableTemplate = document.getElementById('empty-table-template');
const totalStudentsCount = document.getElementById('totalStudentsCount');
const studentsWithNotesCount = document.getElementById('studentsWithNotesCount');
const todayNotesCount = document.getElementById('todayNotesCount');
const totalNotesCount = document.getElementById('totalNotesCount');
const attendanceTitle = document.getElementById('attendanceTitle');
const addNoteToAllBtn = document.getElementById('addNoteToAllBtn');
const applyAttendanceFilter = document.getElementById('applyAttendanceFilter');
const clearAttendanceFilter = document.getElementById('clearAttendanceFilter');
const attendanceLevelFilter = document.getElementById('attendanceLevelFilter');
const attendanceClassFilter = document.getElementById('attendanceClassFilter');
const attendanceDateFilter = document.getElementById('attendanceDateFilter');
const hasNotesFilter = document.getElementById('hasNotesFilter');
const exportNotesBtn = document.getElementById('exportNotesBtn');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');

// Function to get today's date in YYYY-MM-DD format
function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

// Initialize date field with today's date
attendanceDateFilter.value = getTodayDate();
currentDateFilter = getTodayDate();

// Function to update statistics
function updateStats() {
    const filteredStudents = filterStudents();
    
    // Total students
    totalStudentsCount.textContent = filteredStudents.length;
    
    // Students with notes
    const withNotes = filteredStudents.filter(student => student.notes.length > 0);
    studentsWithNotesCount.textContent = withNotes.length;
    
    // Today's notes
    const today = getTodayDate();
    let todayNotes = 0;
    let allNotes = 0;
    
    filteredStudents.forEach(student => {
        student.notes.forEach(note => {
            allNotes++;
            if (note.date === today) {
                todayNotes++;
            }
        });
    });
    
    todayNotesCount.textContent = todayNotes;
    totalNotesCount.textContent = allNotes;
}

// Function to filter students
function filterStudents() {
    let filtered = [...studentsNotesData];
    
    if (currentClassFilter !== 'all') {
        const classNames = {
            'class1': 'الصف الأول',
            'class2': 'الصف الثاني',
            'class3': 'الصف الثالث',
            'class4': 'الصف الرابع',
            'class5': 'الصف الخامس',
            'class6': 'الصف السادس'
        };
        const className = classNames[currentClassFilter];
        filtered = filtered.filter(student => student.class === className);
    }
    
    if (currentDateFilter !== '') {
        filtered = filtered.map(student => {
            const notesForDate = student.notes.filter(note => note.date === currentDateFilter);
            return { ...student, filteredNotes: notesForDate };
        });
    }
    
    if (currentNotesFilter !== 'all') {
        if (currentNotesFilter === 'with') {
            filtered = filtered.filter(student => student.notes.length > 0);
        } else if (currentNotesFilter === 'without') {
            filtered = filtered.filter(student => student.notes.length === 0);
        }
    }
    
    return filtered;
}

// Function to update table title
function updateTableTitle() {
    let title = 'سجلات الطلاب والملاحظات';
    
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
    
    if (currentDateFilter) {
        const dateObj = new Date(currentDateFilter);
        const formattedDate = dateObj.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        title += ` - ${formattedDate}`;
    }
    
    attendanceTitle.textContent = title;
}

// Function to get student's last update date
function getLastUpdateDate(student) {
    if (student.notes.length === 0) return 'لا توجد ملاحظات';
    
    const dates = student.notes.map(note => new Date(note.date));
    const latestDate = new Date(Math.max(...dates));
    
    return latestDate.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Function to display notes in table
function renderAttendanceTable() {
    attendanceTableBody.innerHTML = '';
    
    const filteredStudents = filterStudents();
    
    if (filteredStudents.length === 0) {
        const emptyTemplate = emptyTableTemplate.content.cloneNode(true);
        attendanceTableBody.appendChild(emptyTemplate);
    } else {
        filteredStudents.forEach(student => {
            const template = attendanceRowTemplate.content.cloneNode(true);
            const row = template.querySelector('tr');
            
            // Fill data
            row.querySelector('.js-name').textContent = student.studentName;
            row.querySelector('.js-grade').textContent = student.class;
            row.querySelector('.js-date').textContent = getLastUpdateDate(student);
            
            // Display notes
            const notesDisplay = row.querySelector('.js-notes');
            if (student.notes.length === 0) {
                notesDisplay.textContent = 'لا توجد ملاحظات';
                notesDisplay.classList.add('empty');
            } else {
                // If there's date filtering, show only notes for that date
                let notesToShow = student.notes;
                if (currentDateFilter) {
                    notesToShow = student.notes.filter(note => note.date === currentDateFilter);
                }
                
                if (notesToShow.length === 0) {
                    notesDisplay.textContent = currentDateFilter ? 'لا توجد ملاحظات لهذا التاريخ' : 'لا توجد ملاحظات';
                    notesDisplay.classList.add('empty');
                } else {
                    const latestNote = notesToShow[notesToShow.length - 1];
                    notesDisplay.textContent = latestNote.note;
                    notesDisplay.classList.remove('empty');
                    
                    // Add title to show all notes on hover
                    if (notesToShow.length > 1) {
                        const allNotesText = notesToShow.map((note, index) => 
                            `${index + 1}. ${note.note} (${note.date})`
                        ).join('\n');
                        notesDisplay.setAttribute('title', allNotesText);
                    }
                }
            }
            
            // Add button events
            const addBtn = row.querySelector('.js-add-btn');
            addBtn.setAttribute('data-id', student.id);
            addBtn.addEventListener('click', () => showAddNoteModal(student.id));
            
            const viewBtn = row.querySelector('.js-view-btn');
            viewBtn.setAttribute('data-id', student.id);
            viewBtn.addEventListener('click', () => showViewNotesModal(student.id));
            
            attendanceTableBody.appendChild(template);
        });
    }
    
    updateStats();
    updateTableTitle();
}

// Function to show add note modal
function showAddNoteModal(studentId) {
    const student = studentsNotesData.find(s => s.id === studentId);
    if (!student) return;
    
    const modalHtml = `
        <div class="modal active" id="addNoteModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-plus"></i> إضافة ملاحظة للطالب</h2>
                    <button class="close-modal" id="closeAddNoteModal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="addNoteForm">
                        <div class="form-group">
                            <label for="studentInfo"><i class="fas fa-user"></i> الطالب:</label>
                            <div id="studentInfo" class="filter-select" style="background-color: #f8f9fa; color: #495057; margin-bottom: 20px;">
                                ${student.studentName} - ${student.class}
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="noteDate"><i class="fas fa-calendar"></i> التاريخ:</label>
                            <input type="date" id="noteDate" class="filter-select" 
                                   value="${getTodayDate()}" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="noteText"><i class="fas fa-sticky-note"></i> الملاحظة:</label>
                            <textarea id="noteText" class="filter-select" 
                                      placeholder="أدخل ملاحظتك هنا..." 
                                      maxlength="500" required></textarea>
                            <div class="notes-counter" id="noteCounter">0/500</div>
                        </div>
                        
                        <div style="display: flex; gap: 15px; margin-top: 30px;">
                            <button type="submit" class="btn">
                                <i class="fas fa-save"></i> حفظ الملاحظة
                            </button>
                            <button type="button" class="btn btn-cancel" id="cancelAddNote">
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
    const closeBtn = document.getElementById('closeAddNoteModal');
    const cancelBtn = document.getElementById('cancelAddNote');
    const form = document.getElementById('addNoteForm');
    const noteText = document.getElementById('noteText');
    const noteCounter = document.getElementById('noteCounter');
    
    closeBtn.addEventListener('click', closeAddNoteModal);
    cancelBtn.addEventListener('click', closeAddNoteModal);
    
    // Update character counter
    noteText.addEventListener('input', function() {
        const length = this.value.length;
        noteCounter.textContent = `${length}/500`;
        noteCounter.className = `notes-counter ${length >= 500 ? 'limit' : ''}`;
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveNewNote(studentId);
    });
    
    // Close modal when clicking outside
    const modal = document.getElementById('addNoteModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAddNoteModal();
        }
    });
    
    // Set focus to note field
    setTimeout(() => noteText.focus(), 100);
}

// Function to show view all notes modal
function showViewNotesModal(studentId) {
    const student = studentsNotesData.find(s => s.id === studentId);
    if (!student) return;
    
    let notesHtml = '';
    if (student.notes.length === 0) {
        notesHtml = `
            <div style="text-align: center; padding: 40px 20px; color: #94a3b8;">
                <i class="fas fa-clipboard" style="font-size: 3rem; margin-bottom: 15px;"></i>
                <h3 style="color: #64748b;">لا توجد ملاحظات</h3>
                <p>لم يتم إضافة أي ملاحظات لهذا الطالب بعد</p>
            </div>
        `;
    } else {
        // Sort notes from newest to oldest
        const sortedNotes = [...student.notes].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );
        
        notesHtml = `
            <div style="max-height: 300px; overflow-y: auto; padding: 10px;">
                ${sortedNotes.map((note, index) => `
                    <div style="
                        background-color: ${index % 2 === 0 ? '#f8f9fa' : 'white'};
                        padding: 15px;
                        border-radius: 8px;
                        margin-bottom: 10px;
                        border-left: 4px solid var(--primary-color);
                    ">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <strong style="color: #1e293b;">${note.date}</strong>
                            <button class="btn btn-small btn-danger js-delete-note-btn" 
                                    data-student-id="${studentId}" 
                                    data-note-index="${student.notes.indexOf(note)}"
                                    style="padding: 4px 10px; font-size: 0.8rem;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <p style="color: #333; margin: 0; line-height: 1.5;">${note.note}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    const modalHtml = `
        <div class="modal active" id="viewNotesModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-clipboard-list"></i> ملاحظات الطالب</h2>
                    <button class="close-modal" id="closeViewNotesModal">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 20px;">
                        <div class="filter-select" style="background-color: #f8f9fa; color: #495057;">
                            <strong>${student.studentName}</strong> - ${student.class}
                        </div>
                    </div>
                    
                    ${notesHtml}
                    
                    <div style="display: flex; gap: 15px; margin-top: 30px;">
                        <button class="btn" id="addAnotherNoteBtn">
                            <i class="fas fa-plus"></i> إضافة ملاحظة جديدة
                        </button>
                        <button type="button" class="btn btn-cancel" id="closeViewNotesBtn">
                            <i class="fas fa-times"></i> إغلاق
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const modalsContainer = document.getElementById('modals-container');
    modalsContainer.innerHTML = modalHtml;
    
    // Add events
    const closeBtn = document.getElementById('closeViewNotesModal');
    const closeBtn2 = document.getElementById('closeViewNotesBtn');
    const addAnotherBtn = document.getElementById('addAnotherNoteBtn');
    
    closeBtn.addEventListener('click', closeViewNotesModal);
    closeBtn2.addEventListener('click', closeViewNotesModal);
    addAnotherBtn.addEventListener('click', () => {
        closeViewNotesModal();
        setTimeout(() => showAddNoteModal(studentId), 100);
    });
    
    // Add events for delete note buttons
    document.querySelectorAll('.js-delete-note-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const studentId = parseInt(this.getAttribute('data-student-id'));
            const noteIndex = parseInt(this.getAttribute('data-note-index'));
            deleteNote(studentId, noteIndex);
        });
    });
    
    // Close modal when clicking outside
    const modal = document.getElementById('viewNotesModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeViewNotesModal();
        }
    });
}

// Function to show add note to all modal
function showAddNoteToAllModal() {
    const modalHtml = `
        <div class="modal active" id="addNoteToAllModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-users"></i> إضافة ملاحظة جماعية</h2>
                    <button class="close-modal" id="closeAddNoteToAllModal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="addNoteToAllForm">
                        <div class="form-group">
                            <label for="noteToAllDate"><i class="fas fa-calendar"></i> التاريخ:</label>
                            <input type="date" id="noteToAllDate" class="filter-select" 
                                   value="${getTodayDate()}" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="noteToAllText"><i class="fas fa-sticky-note"></i> الملاحظة:</label>
                            <textarea id="noteToAllText" class="filter-select" 
                                      placeholder="أدخل الملاحظة التي ستضاف لجميع الطلاب..." 
                                      maxlength="500" required></textarea>
                            <div class="notes-counter" id="noteToAllCounter">0/500</div>
                        </div>
                        
                        <div class="form-group">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600;">
                                <i class="fas fa-filter"></i> التصفية:
                            </label>
                            <div style="display: flex; gap: 15px; align-items: center;">
                                <select id="noteToAllClass" class="filter-select" style="flex: 1;">
                                    <option value="all">جميع الفصول</option>
                                    <option value="class1">الصف الأول</option>
                                    <option value="class2">الصف الثاني</option>
                                    <option value="class3">الصف الثالث</option>
                                </select>
                                <div style="font-size: 0.9rem; color: #64748b;">
                                    <span id="affectedStudentsCount">0</span> طالب
                                </div>
                            </div>
                        </div>
                        
                        <div style="display: flex; gap: 15px; margin-top: 30px;">
                            <button type="submit" class="btn btn-success" style="flex: 1;">
                                <i class="fas fa-save"></i> حفظ للجميع
                            </button>
                            <button type="button" class="btn btn-cancel" id="cancelAddNoteToAll" style="flex: 1;">
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
    
    // Update affected students count
    function updateAffectedCount() {
        const classFilter = document.getElementById('noteToAllClass').value;
        let affectedStudents = studentsNotesData;
        
        if (classFilter !== 'all') {
            const classNames = {
                'class1': 'الصف الأول',
                'class2': 'الصف الثاني',
                'class3': 'الصف الثالث'
            };
            const className = classNames[classFilter];
            affectedStudents = affectedStudents.filter(student => student.class === className);
        }
        
        document.getElementById('affectedStudentsCount').textContent = affectedStudents.length;
    }
    
    // Add events
    const closeBtn = document.getElementById('closeAddNoteToAllModal');
    const cancelBtn = document.getElementById('cancelAddNoteToAll');
    const form = document.getElementById('addNoteToAllForm');
    const noteText = document.getElementById('noteToAllText');
    const noteCounter = document.getElementById('noteToAllCounter');
    const classSelect = document.getElementById('noteToAllClass');
    
    closeBtn.addEventListener('click', closeAddNoteToAllModal);
    cancelBtn.addEventListener('click', closeAddNoteToAllModal);
    
    // Update character counter
    noteText.addEventListener('input', function() {
        const length = this.value.length;
        noteCounter.textContent = `${length}/500`;
        noteCounter.className = `notes-counter ${length >= 500 ? 'limit' : ''}`;
    });
    
    // Update student count when class changes
    classSelect.addEventListener('change', updateAffectedCount);
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveNoteToAll();
    });
    
    // Close modal when clicking outside
    const modal = document.getElementById('addNoteToAllModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAddNoteToAllModal();
        }
    });
    
    // Update count on load
    updateAffectedCount();
    
    // Set focus to note field
    setTimeout(() => noteText.focus(), 100);
}

// Function to save new note
function saveNewNote(studentId) {
    const noteDate = document.getElementById('noteDate').value;
    const noteText = document.getElementById('noteText').value.trim();
    
    if (!noteDate || !noteText) {
        showMessage('يرجى ملء جميع الحقول', 'error');
        return;
    }
    
    const student = studentsNotesData.find(s => s.id === studentId);
    if (!student) return;
    
    student.notes.push({
        date: noteDate,
        note: noteText
    });
    
    closeAddNoteModal();
    renderAttendanceTable();
    
    showMessage('تم إضافة الملاحظة بنجاح', 'success');
}

// Function to save note to all students
function saveNoteToAll() {
    const noteDate = document.getElementById('noteToAllDate').value;
    const noteText = document.getElementById('noteToAllText').value.trim();
    const classFilter = document.getElementById('noteToAllClass').value;
    
    if (!noteDate || !noteText) {
        showMessage('يرجى ملء جميع الحقول', 'error');
        return;
    }
    
    let affectedStudents = studentsNotesData;
    
    if (classFilter !== 'all') {
        const classNames = {
            'class1': 'الصف الأول',
            'class2': 'الصف الثاني',
            'class3': 'الصف الثالث'
        };
        const className = classNames[classFilter];
        affectedStudents = affectedStudents.filter(student => student.class === className);
    }
    
    affectedStudents.forEach(student => {
        student.notes.push({
            date: noteDate,
            note: noteText
        });
    });
    
    closeAddNoteToAllModal();
    renderAttendanceTable();
    
    showMessage(`تم إضافة الملاحظة لـ ${affectedStudents.length} طالب`, 'success');
}

// Function to delete note
function deleteNote(studentId, noteIndex) {
    if (!confirm('هل أنت متأكد من حذف هذه الملاحظة؟')) {
        return;
    }
    
    const student = studentsNotesData.find(s => s.id === studentId);
    if (!student || !student.notes[noteIndex]) return;
    
    student.notes.splice(noteIndex, 1);
    
    // Re-open popup
    closeViewNotesModal();
    setTimeout(() => showViewNotesModal(studentId), 100);
    
    // Reload table
    setTimeout(() => renderAttendanceTable(), 200);
    
    showMessage('تم حذف الملاحظة بنجاح', 'success');
}

// Function to export notes
function exportNotes() {
    const filteredStudents = filterStudents();
    
    if (filteredStudents.length === 0) {
        showMessage('لا توجد بيانات للتصدير', 'warning');
        return;
    }
    
    let csvContent = "data:text/csv;charset=utf-8,\ufeff";
    
    // File header
    csvContent += "اسم الطالب,الفصل,تاريخ الملاحظة,الملاحظة\n";
    
    // Data
    filteredStudents.forEach(student => {
        if (student.notes.length === 0) {
            csvContent += `${student.studentName},${student.class},,لا توجد ملاحظات\n`;
        } else {
            let notesToExport = student.notes;
            if (currentDateFilter) {
                notesToExport = student.notes.filter(note => note.date === currentDateFilter);
            }
            
            if (notesToExport.length === 0) {
                csvContent += `${student.studentName},${student.class},${currentDateFilter || ''},لا توجد ملاحظات لهذا التاريخ\n`;
            } else {
                notesToExport.forEach(note => {
                    // Clean text from commas to avoid CSV issues
                    const cleanNote = note.note.replace(/"/g, '""').replace(/,/g, '،');
                    csvContent += `${student.studentName},${student.class},${note.date},"${cleanNote}"\n`;
                });
            }
        }
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ملاحظات_الطلاب_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showMessage(`تم تصدير ${filteredStudents.length} طالب`, 'success');
}

// Functions to close modals
function closeAddNoteModal() {
    const modal = document.getElementById('addNoteModal');
    if (modal) modal.remove();
}

function closeViewNotesModal() {
    const modal = document.getElementById('viewNotesModal');
    if (modal) modal.remove();
}

function closeAddNoteToAllModal() {
    const modal = document.getElementById('addNoteToAllModal');
    if (modal) modal.remove();
}

// Function to show message to user
function showMessage(message, type = 'info') {
    // Remove any existing message
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
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                             type === 'error' ? 'exclamation-circle' : 
                             type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
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
        @keyframes slideUp {
            from { top: 20px; opacity: 1; }
            to { top: -100px; opacity: 0; }
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
applyAttendanceFilter.addEventListener('click', function() {
    currentLevelFilter = attendanceLevelFilter.value;
    currentClassFilter = attendanceClassFilter.value;
    currentDateFilter = attendanceDateFilter.value;
    currentNotesFilter = hasNotesFilter.value;
    renderAttendanceTable();
});

clearAttendanceFilter.addEventListener('click', function() {
    attendanceLevelFilter.value = 'all';
    attendanceClassFilter.value = 'all';
    attendanceDateFilter.value = getTodayDate();
    hasNotesFilter.value = 'all';
    
    currentLevelFilter = 'all';
    currentClassFilter = 'all';
    currentDateFilter = getTodayDate();
    currentNotesFilter = 'all';
    
    renderAttendanceTable();
});

// Add event for add note to all button
addNoteToAllBtn.addEventListener('click', () => showAddNoteToAllModal());

// Add event for export notes button
exportNotesBtn.addEventListener('click', exportNotes);

// Add events for mobile menu
menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('sidebar-active');
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnMenuToggle = menuToggle.contains(event.target);
    
    if (!isClickInsideSidebar && !isClickOnMenuToggle && window.innerWidth <= 992) {
        sidebar.classList.remove('active');
        mainContent.classList.remove('sidebar-active');
    }
});

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', function() {
    renderAttendanceTable();
    
    // Add CSS for messages and menu
    const style = document.createElement('style');
    style.textContent = `
        .main-content.sidebar-active {
            margin-right: 250px;
        }
    `;
    document.head.appendChild(style);
});