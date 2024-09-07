import React from 'react';
import Chart from 'react-apexcharts';

const MyChart = () => {
    const chartOptions = {
        series: [{ data: [10, 41, 35, 51, 49, 62, 69, 91, 148] }],
        options: {
            chart: { type: 'line' },
            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] }
        }
    };

    return <Chart options={chartOptions.options} series={chartOptions.series} type="line" />;
};

export default MyChart;
