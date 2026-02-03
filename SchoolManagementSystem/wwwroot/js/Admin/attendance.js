// Attendance and absence data
const attendanceData = {
    primary: [
        { grade: 'الصف الأول', present: 95, absent: 5 },
        { grade: 'الصف الثاني', present: 92, absent: 8 },
        { grade: 'الصف الثالث', present: 96, absent: 4 },
        { grade: 'الصف الرابع', present: 94, absent: 6 },
        { grade: 'الصف الخامس', present: 90, absent: 10 },
        { grade: 'الصف السادس', present: 93, absent: 7 }
    ],
    middle: [
        { grade: 'الصف السابع', present: 88, absent: 12 },
        { grade: 'الصف الثامن', present: 85, absent: 15 },
        { grade: 'الصف التاسع', present: 92, absent: 8 }
    ],
    secondary: [
        { grade: 'الصف العاشر', present: 90, absent: 10 },
        { grade: 'الصف الحادي عشر', present: 87, absent: 13 },
        { grade: 'الصف الثاني عشر', present: 95, absent: 5 }
    ]
};

// Create attendance chart
function createAttendanceChart(stageData) {
    const chartContainer = document.getElementById('attendanceChart');
    if (!chartContainer) return;
    
    const maxHeight = 280;
    const maxValue = Math.max(...stageData.map(item => Math.max(item.present, item.absent)));
    
    let chartHTML = `
        <div class="chart-bar">
    `;
    
    stageData.forEach(item => {
        const presentHeight = (item.present / maxValue) * maxHeight;
        const absentHeight = (item.absent / maxValue) * maxHeight;
        
        chartHTML += `
            <div class="chart-item">
                <div class="bar bar-present" style="height: ${presentHeight}px">
                    <span class="chart-value">${item.present}%</span>
                </div>
                <div class="bar bar-absent" style="height: ${absentHeight}px; margin-top: 5px">
                    <span class="chart-value">${item.absent}%</span>
                </div>
                <div class="chart-label">${item.grade}</div>
            </div>
        `;
    });
    
    chartHTML += `</div>`;
    chartContainer.innerHTML = chartHTML;
}

// Update data
function updateAttendanceData() {
    const stageSelect = document.getElementById('stageSelect');
    const monthSelect = document.getElementById('monthSelect');
    const currentStage = document.getElementById('currentStage');
    
    if (!stageSelect || !monthSelect || !currentStage) return;
    
    const stage = stageSelect.value;
    const month = monthSelect.value;
    
    // Update title
    const stageNames = {
        'primary': 'المرحلة الإبتدائية',
        'middle': 'المرحلة المتوسطة', 
        'secondary': 'المرحلة الثانوية'
    };
    const monthNames = {
        'january': 'يناير', 'february': 'فبراير', 'march': 'مارس',
        'april': 'أبريل', 'may': 'مايو', 'june': 'يونيو',
        'july': 'يوليو', 'august': 'أغسطس', 'september': 'سبتمبر',
        'october': 'أكتوبر', 'november': 'نوفمبر', 'december': 'ديسمبر'
    };
    
    currentStage.textContent = `${stageNames[stage]} - ${monthNames[month]}`;
    
    // Update chart
    const stageData = attendanceData[stage] || [];
    createAttendanceChart(stageData);
    
    // Update statistics
    if (stageData.length > 0) {
        const avgPresent = Math.round(stageData.reduce((sum, item) => sum + item.present, 0) / stageData.length);
        const avgAbsent = Math.round(stageData.reduce((sum, item) => sum + item.absent, 0) / stageData.length);
        
        console.log(`Average attendance: ${avgPresent}% | Average absence: ${avgAbsent}%`);
    }
}

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

// Add simple interactions
function addInteractions() {
    // Menu items interaction
    const menuItems = document.querySelectorAll('.menu-item, .item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            alert(`Clicked on: ${this.textContent}`);
        });
    });
    
    // Month selector interaction
    const monthSelector = document.querySelector('.month-selector');
    if (monthSelector) {
        monthSelector.addEventListener('click', function() {
            alert('Month selection menu will open');
        });
    }
}

// Page initialization
document.addEventListener('DOMContentLoaded', function() {
    updateDate();
    updateAttendanceData();
    addInteractions();
    
    // Change events
    const stageSelect = document.getElementById('stageSelect');
    const monthSelect = document.getElementById('monthSelect');
    const applyBtn = document.getElementById('applyFilters');
    
    if (stageSelect) stageSelect.addEventListener('change', updateAttendanceData);
    if (monthSelect) monthSelect.addEventListener('change', updateAttendanceData);
    if (applyBtn) applyBtn.addEventListener('click', updateAttendanceData);
});