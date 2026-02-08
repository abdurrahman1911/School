

document.addEventListener("DOMContentLoaded", function () {

    const canvas = document.getElementById("successChart");
    if (!canvas || typeof Chart === "undefined") return;

    const ctx = canvas.getContext("2d");
    let successChart;

    function drawChart() {
        successChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["الأول", "الثاني", "الثالث"],
                datasets: [
                    {
                        label: "النجاح",
                        data: [80, 85, 78],
                        backgroundColor: "#4CAF50"
                    },
                    {
                        label: "الرسوب",
                        data: [5, 7, 6],
                        backgroundColor: "#e53935"
                    }
                ]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    drawChart();
});