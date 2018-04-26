var canvas = document.getElementById("barChart");

var ctx = canvas.getContext('2d');

Chart.defaults.global.defaultFontColor = 'White';
Chart.defaults.global.defaultFontSize = 16;

var data = {
     labels: ["Outdoor 66%", "Indoor 33%"],
      datasets: [
        {
            fill: true,
            backgroundColor: [
                '#BADF70',
                '#36A2EB'],
            data: [31.5, 68.5],
            hoverBackgroundColor: [
                "#BADF70",
                "#36A2EB",
            ]
        }
    ]
};

var myBarChart = new Chart(ctx, {
    type: 'doughnut',
    data: data
});