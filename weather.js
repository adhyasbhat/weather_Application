// import * as echarts from 'echarts';

const submitBtn = document.getElementById("submitBtn");

const dates = [];
let temperature = []
submitBtn.addEventListener("click", function() {
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
  
});

const apiKey = '0e52de716b6e5aa91591a984f0116311';
const city = document.getElementById('cityname').value;
console.log(city)
for(let i = 0; i<dates.length;i++){
const selectedTimestamp = new Date(dates[i]).getTime() / 1000;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q={city}&dt=${selectedTimestamp}`;

const url = apiUrl.replace('{city}', city).replace('{apiKey}', apiKey);

fetch(url)
  .then(response => response.json())
  .then(data => {
      console.log(data)
    tempe = data.main.temp;
    console.log("this is  temp " + data.main.temp) 
    // const date = new Date(data.dt * 1000); 

    // const dateString = date.toLocaleDateString();
    // console.log("this is  date " + dateString)
    // console.log(data);
  })
  .catch(error => {
    
    console.error(error);
  });
  temperature.push(tempe)
}



let humidity = [15.2, 14, 15.9 , 14.9, 14]
let  windspeed = [2.9, 2.4, 3.2 , 2.5, 3]
// let dates = ["2023-01-01","2023-01-02","2023-01-03","2023-01-04","2023-01-05"]
console.log(dates)
function submit(){
    
    var chartDom = document.getElementById('graph');
    var myChart = echarts.init(chartDom);
    var option;
    
    option = {
     
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Temperature', 'Humidity', 'Wind Speed']
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
          name: 'Humidity',
          type: 'line',
          stack: 'Total',
          data: humidity,
        },
        {
          name: 'Wind Speed',
          type: 'line',
          stack: 'Total',
          data: windspeed,
        },
       
      ]
    };
    
     myChart.setOption(option);
}
