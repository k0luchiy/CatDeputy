import React from 'react';
import { salaryReportData } from '../data/mockData';
import BarChart from '../components/BarChart';

const ReportViewer: React.FC = () => {
    const totalRow = {
        name: 'Всего по Свердловской области',
        june2025: 86864.4,
        janJune2025: 80108.9,
        percentage: 100
    }

  return (
    <div className="space-y-6">
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-soft overflow-hidden">
            <h2 className="text-center text-sm font-semibold p-4 bg-gray-50 dark:bg-gray-800 text-text-main-light dark:text-text-main-dark">Среднемесячная заработная плата (без выплат социального характера) по видам экономической деятельности в Свердловской области за январь-июнь 2025 г.</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                    <thead className="bg-gray-100 dark:bg-gray-900 text-text-secondary-light dark:text-text-secondary-dark uppercase">
                        <tr>
                            <th scope="col" className="px-4 py-3 w-1/3">Виды экономической деятельности</th>
                            <th scope="col" className="px-4 py-3 text-center">Июнь 2025 г.</th>
                            <th scope="col" className="px-4 py-3 text-center">Январь-июнь 2025 г.</th>
                            <th scope="col" className="px-4 py-3 text-center">% к среднемесячной</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {salaryReportData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="px-4 py-2 font-medium text-text-main-light dark:text-text-main-dark">{row.name}</td>
                                <td className="px-4 py-2 text-center text-text-main-light dark:text-text-main-dark">{row.june2025.toLocaleString('ru-RU')}</td>
                                <td className="px-4 py-2 text-center text-text-main-light dark:text-text-main-dark">{row.janJune2025.toLocaleString('ru-RU')}</td>
                                <td className="px-4 py-2 text-center text-text-main-light dark:text-text-main-dark">{row.percentage.toFixed(1)}</td>
                            </tr>
                        ))}
                        <tr className="bg-gray-200 dark:bg-gray-900 font-bold">
                            <td className="px-4 py-2 text-text-main-light dark:text-text-main-dark">{totalRow.name}</td>
                            <td className="px-4 py-2 text-center text-text-main-light dark:text-text-main-dark">{totalRow.june2025.toLocaleString('ru-RU')}</td>
                            <td className="px-4 py-2 text-center text-text-main-light dark:text-text-main-dark">{totalRow.janJune2025.toLocaleString('ru-RU')}</td>
                            <td className="px-4 py-2 text-center"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <BarChart data={[...salaryReportData].sort((a, b) => a.janJune2025 - b.janJune2025)} />
    </div>
  );
};

export default ReportViewer;