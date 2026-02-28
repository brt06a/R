'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface EarningsChartProps {
  data?: { labels: string[]; earnings: number[] };
}

export function EarningsChart({ data }: EarningsChartProps) {
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    earnings: [0, 0, 0, 0, 0, 0],
  };

  const chartData = data || defaultData;

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Earnings Overview</h3>
      </CardHeader>
      <CardContent>
        <Line
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: 'Earnings (₹)',
                data: chartData.earnings,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#1f2937',
                titleColor: '#fff',
                bodyColor: '#9ca3af',
                borderColor: '#374151',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: '#9ca3af' },
              },
              y: {
                grid: { color: 'rgba(156, 163, 175, 0.1)' },
                ticks: { color: '#9ca3af' },
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
