const ctx = document.getElementById("successChart");

let chart;

const stageColors = {
    kg: "#4CAF50",
    primary: "#2196F3",
    prep: "#FF9800",
    secondary: "#9C27B0"
};

const data = {
    month: {
        kg: { labels: ["KG1", "KG2"], success: [88, 90], fail: [2, 3] },
        primary: {
            labels: ["الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس"],
            success: [78, 75, 79, 80, 76, 77],
            fail: [2, 3, 1, 2, 3, 2]
        },
        prep: { labels: ["الأول", "الثاني", "الثالث"], success: [72, 70, 68], fail: [6, 7, 8] },
        secondary: { labels: ["الأول", "الثاني", "الثالث"], success: [65, 62, 60], fail: [10, 12, 15] }
    },
    year: {
        kg: { labels: ["KG1", "KG2"], success: [90, 92], fail: [4, 5] },
        primary: {
            labels: ["الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس"],
            success: [80, 78, 82, 83, 79, 81],
            fail: [5, 6, 4, 5, 6, 5]
        },
        prep: { labels: ["الأول", "الثاني", "الثالث"], success: [75, 73, 71], fail: [8, 9, 10] },
        secondary: { labels: ["الأول", "الثاني", "الثالث"], success: [70, 68, 66], fail: [12, 14, 16] }
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
                    label: "النجاح",
                    data: data[period][stage].success,
                    backgroundColor: stageColors[stage],
                    borderRadius: 6
                },
                {
                    label: "الرسوب",
                    data: data[period][stage].fail,
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
                y: { beginAtZero: true }
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

drawChart("primary", "month");
