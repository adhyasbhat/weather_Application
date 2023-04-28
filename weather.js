// import * as echarts from 'echarts';

const submitBtn = document.getElementById("submitBtn");

const dates = [];
let temperature = []
let tempe, wspeed;
let windSpeed =[]
submitBtn.addEventListener("click", function() {
  dates.length = 0;
  temperature.length = 0;
  windSpeed.length = 0;
    const startDate = new Date(document.getElementById('start-date').value); 
    console.log(startDate)
    const endDate = new Date(document.getElementById('end-date').value);
    console.log(endDate)
    
    let currentDate = startDate;
    
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().slice(0, 10)); 
      currentDate.setDate(currentDate.getDate() + 1); 
    }
    
    console.log(dates);
    getData();
  
});

function getData(){
  const apiKey = '0e52de716b6e5aa91591a984f0116311';
  const city = document.getElementById('cityname').value;
  console.log(city)

  for(let i = 0; i<dates.length;i++){
    console.log("dates"+dates[i])
  const selectedTimestamp = new Date(dates[i]).getTime() / 1000;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&dt=${selectedTimestamp}`;
  
  const url = apiUrl.replace('{city}', city).replace('{apiKey}', apiKey);
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      
      tempe = data.main.temp;
      wspeed = data.wind.speed;
   
      console.log("date is"+dates[i]+"temp"+tempe+"windspeed"+wspeed)
      temperature.push(tempe)
    
    windSpeed.push(wspeed)
   
    
    plotGraph()
    })
    .catch(error => {
      
      console.error(error);
    });
    
  }
}
var myChart
function plotGraph(){
    var chartDom = document.getElementById('graph');
     myChart = echarts.init(chartDom);
    var option;
    
    option = {
     
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Temperature','Wind Speed']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Temperature',
          type: 'line',
          stack: 'Total',
          data: temperature,
        },
        {
          name: 'Wind Speed',
          type: 'line',
          stack: 'Total',
          data: windSpeed,
        },
       
      ]
    };
    
     myChart.setOption(option);
}
window.addEventListener('resize', function() {
  myChart.resize();
});