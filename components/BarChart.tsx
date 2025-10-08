import React from 'react';
import type { SalaryData } from '../types';

interface BarChartProps {
  data: SalaryData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.janJune2025));

  return (
    <div className="p-4 bg-card-light dark:bg-card-dark rounded-xl shadow-soft">
      <h3 className="text-sm font-semibold mb-4 text-center text-text-main-light dark:text-text-main-dark">Среднемесячная заработная плата (без выплат социального характера) по видам экономической деятельности в Пермском крае за январь-июнь 2025 года, руб.</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center text-xs">
            <div className="w-1/3 text-right pr-2 text-text-secondary-light dark:text-text-secondary-dark truncate">{item.name}</div>
            <div className="w-2/3 flex items-center">
              <div
                className="bg-accent-blue-light dark:bg-accent-blue-dark h-5 rounded-r"
                style={{ width: `${(item.janJune2025 / maxValue) * 100}%` }}
              ></div>
              <span className="ml-2 font-semibold text-text-main-light dark:text-text-main-dark">{Math.round(item.janJune2025).toLocaleString('ru-RU')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;