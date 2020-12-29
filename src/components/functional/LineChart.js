import React from 'react';
import {Line} from 'react-chartjs-2';

import AnimatedMount from "../../HOC/AnimatedMount"
const LineChart = (props) => {
  console.log(props,"props in LineChart")
  let users = []
  console.log(props,"props in linechange")
  users = [...props.data]
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', "November",'December'],
        datasets: [
          {
            label: 'Number of Users',
            fill: props.fill?true:false,
            lineTension: 0.3,
            backgroundColor: '#000',
            borderColor: 'rgba(75,192,192,1)',
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
            data: users
          }
        ]
      };
    return (
        <div style={{height:'15rem'}}>
            <Line 
            data={data}
            options={{
                maintainAspectRatio: true,
                responsive: true,
                startFrom:0,
                scales: {
                    yAxes: [{
                      scaleLabel: {
                        display: true,
                        labelString: 'No. of Users'
                      }
                    }],
                    xAxes: [{
                      scaleLabel: {
                        display: false
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
  })(React.memo(LineChart));