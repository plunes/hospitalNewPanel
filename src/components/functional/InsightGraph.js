import React from 'react';
import {Line} from 'react-chartjs-2';

import AnimatedMount from "../../HOC/AnimatedMount"
const InsightGraph = (props) => {

  const points = [...props.data]
  let labels = []
  let data_points = []
  points.forEach(item=>{
      if(true){
          labels.push(item.x)
          data_points.push(item.y)
      }
  })

  var ctx = false
  try {
    ctx = document.getElementsByClassName('chartjs-render-monitor')[0].getContext('2d');
  } catch (error) {
    
  }
  var gradient = {}

  if(ctx){
     gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#FF6C40');   
    gradient.addColorStop(1, '#FFFFFF00');
  }
 
 console.log(ctx,"ctx")


  console.log(data_points,"props in InsightGraph")
    const data = {
        labels: labels,
        datasets: [
          {
            label: 'Users',
            fill: props.fill?true:false,
            lineTension: 0.1,
            backgroundColor: gradient,
            borderColor: '#FF6C40',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data_points,
            fontColor:'#fff',
            labelColor:'#fff'
           
          }
        ]
      };
    return (
        <div>
            <Line 
            data= {data}
            options={{
                maintainAspectRatio: true,
                responsive: true,
                label:{
                    fontColor:'#fff'
                },
                legend: {
                   
                    display:false
                },
                scales: {
                    yAxes: [{
                      scaleLabel: {
                        display: true,
                        labelString: 'Users(k)',
                        fontColor:'#fff',
                      },
                      ticks: {
                        fontColor: "white",
                        maxTicksLimit:7,
                        stepSize: 0,
                        autoSkip:true
                    }
                    }],
                    xAxes: [{
                      scaleLabel: {
                        display: true,
                        fontColor:'#fff',
                        labelString: 'Price'
                      },
                      ticks: {
                        fontColor: "white"
                    }
                    }],
                  } 
            }}
             />
      </div>
    )
}


export default AnimatedMount({
    unmountedStyle: {
      opacity: 0,
      transform: 'translate3d(0, -2rem, 0)',
      transition: 'opacity 100ms ease-out, transform 100ms ease-out',
    },
    mountedStyle: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      transition: 'opacity .5s ease-out, transform .5s ease-out',
    },
  })(React.memo(InsightGraph));