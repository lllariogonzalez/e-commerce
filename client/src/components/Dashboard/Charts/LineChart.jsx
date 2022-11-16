import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  scales: {
    yAxes: [{
      id: "y_axis_users"
    },{
      id: "y_axis_money"
    }]
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'weekly yield',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octuber', 'November', 'December'];

export let data = {
  labels,
  datasets: [
    {
      label: ' Monthly activity (new/users)',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.5,
      fill: true,
      pointBorderWidth: 5,
      yAxisID: "y-axis-users"
    },
    {
      label: ' Monthly sales ($)',
      data: [],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      fill: true,
      tension: 0.5,
      pointBorderWidth: 5,
      yAxisID: "y-axis-money"


    },
  ],
};

export default function LineChart() {

    const [ stats, setStats ] = useState();
    const { getAccessTokenSilently } = useAuth0();

    async function getData() {
        try {
            const token = await getAccessTokenSilently();
            const result = await axios.get(`/stats/order`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const users = await axios.get(`/stats/user`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
            let 
            January = 0, 
            February = 0, 
            March = 0, 
            April = 0, 
            May = 0, 
            June = 0, 
            July = 0, 
            August = 0, 
            September = 0, 
            Octuber = 0, 
            November = 0, 
            December = 0
            result.data.map(o=>{
                const day = new Date(o.day).getDay();
                const month = new Date(o.day).getMonth();
                switch(month){
                    case(0):
                        January+=Number(o.total);
                        break;
                    case(1):
                        February+=Number(o.total);
                        break;
                    case(2):
                        March+=Number(o.total);
                        break;
                    case(3):
                        April+=Number(o.total);
                        break;
                    case(4):
                        May+=Number(o.total);
                        break;
                    case(5):
                        June+=Number(o.total);
                        break;
                    case(6):
                        July+=Number(o.total);
                        break;
                    case(7):
                        August+=Number(o.total);
                        break;
                    case(8):
                        September+=Number(o.total);
                        break;
                    case(9):
                        Octuber+=Number(o.total);
                        break;
                    case(10):
                        November+=Number(o.total);
                        break;
                    default:
                        December+=Number(o.total);
                        break;
                }
            });
            
            const resultData = [
              January, 
              February, 
              March, 
              April, 
              May, 
              June, 
              July, 
              August, 
              September,
              Octuber, 
              November, 
              December
            ];
            data.datasets[1].data = resultData;
            let 
            january = 0, 
            february = 0, 
            march = 0, 
            april = 0, 
            may = 0, 
            june = 0, 
            july = 0, 
            august = 0, 
            september = 0, 
            octuber = 0, 
            november = 0, 
            december = 0
            users.data.map(u=>{
              const month = new Date(u.day).getMonth();
              switch(month){
                  case(0):
                      january++;
                      break;
                  case(1):
                      february++;
                      break;
                  case(2):
                      march++;
                      break;
                  case(3):
                      april++;
                      break;
                  case(4):
                      may++;
                      break;
                  case(5):
                      june++;
                      break;
                  case(6):
                      july++;
                      break;
                  case(7):
                      august++;
                      break;
                  case(8):
                      september++;
                      break;
                  case(9):
                      octuber++;
                      break;
                  case(10):
                      november++;
                      break;
                  default:
                      december++;
                      break;
              }
          });
          const userData = [
            january, 
            february,  
            march,  
            april,  
            may,
            june, 
            july, 
            august, 
            september,
            octuber,
            november, 
            december,
          ];
            data.datasets[0].data = userData;
            setStats(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        getData();
    }, [stats]);

  return (
    <div style={{margin: "5em 0"}} className=' column col-12'>
        <h3 style={{fontSize: "1rem", fontWeight: "bold", textAlign: "center"}}>PERFORMANCE {`${new Date().getFullYear()}`}</h3>
        { stats && <Line options={options} data={stats} />}
    </div>
    )
}
