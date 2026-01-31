const ctx = document.getElementById('attendanceChart').getContext('2d');

new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['حضور', 'غياب'],
        datasets: [{
            data: [85, 15],
            backgroundColor: ['#4caf50', '#f44336']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});