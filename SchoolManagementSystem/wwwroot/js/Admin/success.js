// Data
const data = {
    primary: [
        { grade: 'الصف الأول', success: 95, failure: 5 },
        { grade: 'الصف الثاني', success: 90, failure: 10 },
        { grade: 'الصف الثالث', success: 92, failure: 8 },
        { grade: 'الصف الرابع', success: 88, failure: 12 },
        { grade: 'الصف الخامس', success: 85, failure: 15 },
        { grade: 'الصف السادس', success: 80, failure: 20 }
    ],
    middle: [
        { grade: 'الصف السابع', success: 82, failure: 18 },
        { grade: 'الصف الثامن', success: 78, failure: 22 },
        { grade: 'الصف التاسع', success: 75, failure: 25 }
    ],
    secondary: [
        { grade: 'الصف العاشر', success: 85, failure: 15 },
        { grade: 'الصف الحادي عشر', success: 80, failure: 20 },
        { grade: 'الصف الثاني عشر', success: 88, failure: 12 }
    ]
};

// Create the chart
function createChart(stageData) {
    const chartContainer = document.getElementById('successChart');
    if (!chartContainer) return;
    
    let chartHTML = `
        <div class="chart-bar">
    `;
    
    const maxHeight = 280;
    const maxValue = Math.max(...stageData.map(item => Math.max(item.success, item.failure)));
    
    stageData.forEach(item => {
        const successHeight = (item.success / maxValue) * maxHeight;
        const failureHeight = (item.failure / maxValue) * maxHeight;
        
        chartHTML += `
            <div class="chart-item">
                <div class="bar bar-success" style="height: ${successHeight}px">
                    <span class="chart-value">${item.success}%</span>
                </div>
                <div class="bar bar-failure" style="height: ${failureHeight}px; margin-top: 5px">
                    <span class="chart-value">${item.failure}%</span>
                </div>
                <div class="chart-label">${item.grade}</div>
            </div>
        `;
    });
    
    chartHTML += `</div>`;
    chartContainer.innerHTML = chartHTML;
}

// Update data based on stage and month
function updateData() {
    const stageSelect = document.getElementById('stageSelect');
    const monthSelect = document.getElementById('monthSelect');
    const currentStage = document.getElementById('currentStage');
    
    if (!stageSelect || !monthSelect || !currentStage) return;
    
    const stage = stageSelect.value;
    const month = monthSelect.value;
    
    // Update stage title
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
    
    // Get the appropriate data
    let stageData = data[stage] || [];
    
    // Update chart only
    createChart(stageData);
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



// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateDate();
    updateData();
    addChartInteractions();
    
    // Change events
    const stageSelect = document.getElementById('stageSelect');
    const monthSelect = document.getElementById('monthSelect');
    const applyBtn = document.getElementById('applyFilters');
    
    if (stageSelect) stageSelect.addEventListener('change', updateData);
    if (monthSelect) monthSelect.addEventListener('change', updateData);
    if (applyBtn) applyBtn.addEventListener('click', function() {
        updateData();
        addChartInteractions();
    });
});
