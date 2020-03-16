import React from 'react';
import { Ref } from 'semantic-ui-react';
import Chart from 'chart.js';
import 'chart.js/dist/Chart.css';

interface Props {
  width?: number;
  height?: number;
  net_worth?: number[];
  position_ratio?: number[];
  date?: number[];
}

export default function PovChart(props: Props) {
  const canvasRef = React.useRef();

  React.useEffect(() => {
    console.log(canvasRef.current);
    // const e = document.getElementById('app');
    // e.getContext('2d')
    let chart: any = null;
    if (canvasRef.current) {
      const ctx = (canvasRef.current as any).getContext('2d');
      if (ctx) {
        chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['20200309', '20200310', '20200311', '20200312', '20200313'],
            datasets: [
              {
                label: '资产净值',
                data: [0.7, 0.95, 0.91, 0.91, 0.9],
                order: 1,
                type: 'line',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                borderWidth: 2,
              },
              {
                label: '持仓比例',
                data: [0.57, 1.07, 1.1, 1.1, 1.1],
                order: 2,
                backgroundColor: 'rgba(54, 162, 235, 1)',
              },
            ],
          },
          options: {
            scales: {
              xAxes: [
                {
                  type: 'time',
                  time: {
                    unit: 'day',
                    displayFormats: {
                      day: 'MM-DD',
                    },
                  },
                },
              ],
            },
          },
        });
      }
    }
  });

  return (
    <Ref innerRef={canvasRef}>
      <canvas {...props}></canvas>
    </Ref>
  );
}
