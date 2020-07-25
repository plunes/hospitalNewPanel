import React from 'react';
import {Pie} from 'react-chartjs-2';

import AnimatedMount from "../../HOC/AnimatedMount"
const PieChart = (props) =>{
    console.log(props,"props in PieChanrt")
    const data = {
        labels: [
            'Business Gained',
            'Business Lost'
        ],
        datasets: [{
            data: props.data,
            backgroundColor: [
            '#01D35A',
            '#F3E520'
            ],
            hoverBackgroundColor: [
            '#01D35A',
            '#F3E520'
            ]
        }]
    }

    return (
        <div style={{width:'25rem'}}>
          <Pie data={data}
             options={{
              maintainAspectRatio: true,
              responsive: true,
              showLegend:false
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
  })(React.memo(PieChart));
    
