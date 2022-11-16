import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

export let data = {
  labels: [],
  datasets: [
    {
      label: '# of Votes',
      data: [],
      backgroundColor: [
        'rgba(165, 35, 35, 0.7)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(165, 35, 35, 0.7)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};


export default function DoughnutChart(){

    const [ stats, setStats ] = useState();
    const { getAccessTokenSilently } = useAuth0();

    async function getData() {
        try {
            const token = await getAccessTokenSilently();
            const result = await axios.get(`/stats/categories`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            let labels= result.data.map(c=>c.category);
            let numbers = result.data.map(c=>Number(c.total));
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
            <h3 style={{fontSize: "1rem", fontWeight: "bold", textAlign: "center"}}>PRODUCTS BY CATEGORY</h3>
            {stats &&
            <Doughnut data={stats} />
            }
        </div>
    )
}