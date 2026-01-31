const ctx = document.getElementById("attendanceChart");

let chart;

const stageColors = {
    kg: "#4CAF50",
    primary: "#2196F3",
    prep: "#FF9800",
    secondary: "#9C27B0"
};

const data = {
    month: {
        kg: { labels: ["KG1", "KG2"], present: [92, 94], absent: [8, 6] },
        primary: {
            labels: ["الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس"],
            present: [90, 88, 91, 92, 89, 90],
            absent: [10, 12, 9, 8, 11, 10]
        },
        prep: { labels: ["الأول", "الثاني", "الثالث"], present: [87, 85, 83], absent: [13, 15, 17] },
        secondary: { labels: ["الأول", "الثاني", "الثالث"], present: [82, 80, 78], absent: [18, 20, 22] }
    },
    year: {
        kg: { labels: ["KG1", "KG2"], present: [95, 96], absent: [5, 4] },
        primary: {
            labels: ["الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس"],
            present: [92, 90, 93, 94, 91, 92],
            absent: [8, 10, 7, 6, 9, 8]
        },
        prep: { labels: ["الأول", "الثاني", "الثالث"], present: [88, 86, 84], absent: [12, 14, 16] },
        secondary: { labels: ["الأول", "الثاني", "الثالث"], present: [85, 83, 81], absent: [15, 17, 19] }
    }
};

function drawChart(stage, period) {
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: data[period][stage].labels,
            datasets: [
                {
                    label: "الحضور",
                    data: data[period][stage].present,
                    backgroundColor: stageColors[stage],
                    borderRadius: 6
                },
                {
                    label: "الغياب",
                    data: data[period][stage].absent,
                    backgroundColor: "#e53935",
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            animation: {
                duration: 1200,
                easing: "easeInOutQuart"
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

const stageSelect = document.getElementById("stageSelect");
const periodSelect = document.getElementById("periodSelect");

stageSelect.addEventListener("change", () => {
    drawChart(stageSelect.value, periodSelect.value);
});

periodSelect.addEventListener("change", () => {
    drawChart(stageSelect.value, periodSelect.value);
});

/* رسم افتراضي */
drawChart("primary", "month");
