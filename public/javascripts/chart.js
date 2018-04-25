var canvas = document.getElementById("barChart");
var ctx = canvas.getContext('2d');

Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 16;

var data = {
     labels: ["Outdoor 66%", "Indoor 33%"],
      datasets: [
        {
            fill: true,
            backgroundColor: [
                'blue',
                'yellow'],
            data: [33, 66],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
            ]
        }
    ]
};

var myBarChart = new Chart(ctx, {
    type: 'doughnut',
    data: data
});