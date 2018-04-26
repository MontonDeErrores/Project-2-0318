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
                '#173e43',
                '#fae596'],
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