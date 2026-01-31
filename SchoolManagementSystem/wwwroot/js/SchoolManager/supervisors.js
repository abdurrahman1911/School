function addSupervisor() {
    const input = document.getElementById("supervisorName");
    const list = document.getElementById("supervisorsList");

    const name = input.value.trim();
    if (!name) return;

    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);

    input.value = "";
}

/* ===== Chart ===== */
const ctx = document.getElementById('performanceChart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
        datasets: [{
            data: [65, 70, 80, 85, 90, 95],
            borderColor: '#1e6d92',
            backgroundColor: 'rgba(30,109,146,0.15)',
            tension: 0.45,
            fill: true,
            pointRadius: 4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true, max: 100 }
        }
    }
});