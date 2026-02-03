


document.addEventListener("DOMContentLoaded", function () {

    const canvas = document.getElementById("attendanceChart");
    if (!canvas || typeof Chart === "undefined") return;

    const ctx = canvas.getContext("2d");
    let attendanceChart;

    const stageColors = {
        kg: "#4CAF50",
        primary: "#2196F3",
        prep: "#FF9800",
        secondary: "#9C27B0"
    };

    const data = {
        month: {
            primary: {
                labels: ["الأول", "الثاني", "الثالث"],
                present: [90, 88, 92],
                absent: [10, 12, 8]
            }
        }
    };

    function drawChart(stage, period) {
        if (attendanceChart) attendanceChart.destroy();

        attendanceChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: data[period][stage].labels,
                datasets: [
                    {
                        label: "الحضور",
                        data: data[period][stage].present,
                        backgroundColor: stageColors[stage]
                    },
                    {
                        label: "الغياب",
                        data: data[period][stage].absent,
                        backgroundColor: "#e53935"
                    }
                ]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });
    }

    drawChart("primary", "month");
});