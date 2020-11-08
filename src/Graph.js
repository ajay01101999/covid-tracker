import React from 'react';
import { Line } from 'react-chartjs-2'
import numeral from 'numeral';
import { Card } from '@material-ui/core'
import './Graph.css'

const Graph=({ newCases })=>{
    const options = {
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        maintainAspectRatio: false,
        tooltips: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function (tooltipItem, data) {
              return numeral(tooltipItem.value).format("+0,0");
            },
          },
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                format: "MM/DD/YY",
                tooltipFormat: "ll",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                  return numeral(value).format("0a");
                },
              },
            },
          ],
        },
      };
    return (
        <Card style={{margin:'20px'}}>
            <h2 style={{padding:'20px'}}>Worldwide New Cases</h2>
            <Line className='graph' options={options} data={{datasets:[{backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",data:newCases}]}}/>
        </Card>
    )
}

export default Graph;