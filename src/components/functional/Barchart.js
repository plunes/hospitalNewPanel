import React from "react"
import {Bar} from 'react-chartjs-2';
import AnimatedMount from "../../HOC/AnimatedMount"
const should_render = (prevProps, nextProps) => {
    return true
}



const data = {
    labels: ['10-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100'],
    datasets: [
      {
        label: 'Number of Leads',
        backgroundColor: 'rgb(73, 157, 204)',
        borderColor: 'rgb(73, 157, 204)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(44, 100, 130)',
        hoverBorderColor: 'rgb(44, 100, 130)',
        data: [20, 40, 70, 100, 140, 160, 200, 220, 240]
      }
    ]
  };
const Barchart = (props) => {
    console.log('Props in Barchart')
    return (
        <React.Fragment>
                 <div>
              {/* <h2>Bar Example (custom size)</h2> */}
                <Bar
                data={data}
                // width={100}
                // height={50}
                options={{
                    maintainAspectRatio: true,
                    responsive: true,
                    startFrom:0,
                    scales: {
                        yAxes: [{
                          scaleLabel: {
                            display: true,
                            labelString: 'No. of Bids'
                          }
                        }],
                        xAxes: [{
                          scaleLabel: {
                            display: true,
                            labelString: 'Variance %'
                          }
                        }],
                      } 
                }}
                />
      </div>
        </React.Fragment>
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
})(React.memo(Barchart, should_render));