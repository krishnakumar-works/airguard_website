const state={aqi:42,temp:27.4,humidity:58,pressure:1008,pm25:18,pm10:32,co:.7,no2:21};
const el=id=>document.getElementById(id);
const labels=["10:00","10:10","10:20","10:30","10:40","10:50","11:00","11:10","11:20","11:30","11:40","Now"];
let values=[38,41,39,44,47,43,46,45,48,44,40,42];

const chart=new Chart(document.getElementById("aqChart"),{
 type:"line",
 data:{labels,datasets:[{label:"AQI",data:values,borderWidth:2,tension:.35,pointRadius:2,fill:false}]},
 options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{
   y:{beginAtZero:true,max:150,grid:{color:"#182531"},ticks:{color:"#718091"}},
   x:{grid:{display:false},ticks:{color:"#718091"}}
 }}
});

function render(){
 el("aqiValue").textContent=state.aqi;
 el("temp").textContent=state.temp.toFixed(1)+"°C";
 el("humidity").textContent=state.humidity+"%";
 el("pressure").textContent=state.pressure+" hPa";
 el("pm25").textContent=state.pm25;
 el("pm10").textContent=state.pm10;
 el("co").textContent=state.co.toFixed(1);
 el("no2").textContent=state.no2;
 el("pm25bar").style.width=Math.min(state.pm25/100*100,100)+"%";
 el("pm10bar").style.width=Math.min(state.pm10/150*100,100)+"%";
 el("cobar").style.width=Math.min(state.co/5*100,100)+"%";
 el("no2bar").style.width=Math.min(state.no2/100*100,100)+"%";
 let status="GOOD", title="Good Air Quality", advice="Air conditions are currently suitable for normal outdoor activity.";
 if(state.aqi>100){status="POOR";title="Poor Air Quality";advice="Sensitive people should reduce prolonged outdoor activity and monitor pollutant levels."}
 else if(state.aqi>50){status="MODERATE";title="Moderate Air Quality";advice="Air quality is acceptable, but unusually sensitive people should consider reducing prolonged outdoor activity."}
 el("statusBadge").textContent=status; el("qualityText").textContent=title; el("qualityAdvice").textContent=advice;
 el("adviceTitle").textContent=state.aqi>100?"Reduce Outdoor Exposure":state.aqi>50?"Monitor Conditions":"Conditions look healthy";
 el("adviceBody").textContent=state.aqi>100?"Pollution is elevated. Investigate the source, improve ventilation where appropriate and reduce unnecessary exposure.":state.aqi>50?"Keep monitoring the trend and check whether any pollutant is increasing.":"Continue normal activities and keep monitoring for sudden changes.";
 el("lastUpdated").textContent="Updated "+new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
}

function simulate(){
 state.aqi=Math.max(20,Math.min(130,state.aqi+Math.round((Math.random()-.5)*12)));
 state.pm25=Math.max(5,Math.min(100,state.pm25+Math.round((Math.random()-.5)*8)));
 state.pm10=Math.max(10,Math.min(150,state.pm10+Math.round((Math.random()-.5)*10)));
 state.co=Math.max(.1,Math.min(5,state.co+(Math.random()-.5)*.4));
 state.no2=Math.max(5,Math.min(100,state.no2+Math.round((Math.random()-.5)*10)));
 state.temp=state.temp+(Math.random()-.5)*.4;
 state.humidity=Math.max(30,Math.min(80,state.humidity+Math.round((Math.random()-.5)*3)));
 values.push(state.aqi);values.shift();chart.data.datasets[0].data=values;chart.update();render();
}
el("refreshBtn").addEventListener("click",simulate);
render();
setInterval(simulate,8000);
