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

export default function PovChart2({
  width = 400,
  height = 400,
  net_worth = [],
  position_ratio = [],
  date = [],
}: Props) {
  const canvasRef = React.useRef();

  React.useEffect(() => {
    let chart: Chart;
    if (canvasRef.current) {
      const ctx = (canvasRef.current as any).getContext('2d');
      if (ctx) {
        chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: date,
            datasets: [
              {
                label: '资产净值',
                data: net_worth,
                order: 1,
                type: 'line',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                borderWidth: 2,
              },
              {
                label: '持仓比例',
                data: position_ratio,
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
    return () => {
      if (chart) chart.destroy();
    };
  });

  return (
    <Ref innerRef={canvasRef}>
      <canvas></canvas>
    </Ref>
  );
}
