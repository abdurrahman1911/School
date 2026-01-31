// بيانات الجراف لكل أسبوع وشهر
const chartData = {
    supervisorsChart: {
        week: [70, 75, 65, 85, 80],
        month: [60, 68, 70, 75, 72]
    },
    teachersChart: {
        week: [60, 70, 65, 90, 85],
        month: [65, 75, 70, 80, 78]
    },
    studentsChart: {
        week: [55, 65, 60, 88, 82],
        month: [50, 60, 58, 80, 75]
    }
};

// ألوان مختلفة لكل عمود
const colors = ['#ff6b6b', '#f7b32b', '#6a2c70', '#1abc9c', '#3498db'];

function renderChart(chartId, type) {
    const chartEl = document.getElementById(chartId);
    chartEl.innerHTML = ''; // مسح الأعمدة القديمة

    chartData[chartId][type].forEach((value, i) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.background = colors[i % colors.length];
        bar.style.height = '0'; // البداية من الصفر
        chartEl.appendChild(bar);

        // أنيميشن بعد قليل
        setTimeout(() => {
            bar.style.height = value + '%';
        }, 100);
    });
}

// تفعيل الجرافات عند اختيار الأسبوع أو الشهر
document.querySelectorAll('.chart-select').forEach(select => {
    select.addEventListener('change', (e) => {
        const chartId = e.target.dataset.chart;
        const type = e.target.value; // week أو month
        renderChart(chartId, type);
    });
});

// تحميل الجرافات الافتراضي عند فتح الصفحة
['supervisorsChart', 'teachersChart', 'studentsChart'].forEach(chartId => {
    renderChart(chartId, 'week');
});
