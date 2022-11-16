import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const data = {
  labels: [],
  datasets: [
    {
      label: '# of Stock',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
  options: {
    scale: {
        ticks: {
            min:5,
            max: 12,
            stepSize: 1
        }
    }
  }
};

export default function PolarAreaChart() {

    const [ stats, setStats ] = useState();
    const { getAccessTokenSilently } = useAuth0();

    async function getData() {
        try {
            const token = await getAccessTokenSilently();
            const result = await axios.get(`/stats/stock`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            let labels= result.data.map(p=>p.name);
            let numbers = result.data.map(p=>Number(p.stock));
            data.labels = labels;
            data.datasets[0].data = numbers;
            setStats(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        getData();
    }, [stats]);

    return (
        <div style={{width:"45%", padding:"5px"}}>
            <h3 style={{fontSize: "1rem", fontWeight: "bold", textAlign: "center"}}>LOW STOCK PRODUCTS</h3>
            {stats &&
            <PolarArea data={stats} options={stats.options}/>
            }
        </div>
    )
}
