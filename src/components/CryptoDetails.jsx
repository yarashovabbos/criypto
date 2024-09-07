// CryptoDetails.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CurrencyContext } from '../context/CurrencyContext';
import { Row, Col, Card, Descriptions, Tabs } from 'antd';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip } from 'recharts';
import moment from 'moment';
import "./details.css"
import "../components/selector.css"; 

const { TabPane } = Tabs;

const CryptoDetails = () => {
    const { id } = useParams();
    const [crypto, setCrypto] = useState(null);
    const [chartData, setChartData] = useState([]);
    const { currency } = useContext(CurrencyContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => setCrypto(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [id, currency]);

    useEffect(() => {
        if (crypto) {
            fetch(`https://api.coingecko.com/api/v3/coins/${crypto.id}/market_chart?vs_currency=${currency}&days=30`)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    setChartData(data.prices.map(item => ({
                        time: moment(item[0]).format('YYYY-MM-DD'),
                        price: item[1],
                    })));
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [crypto, currency]);

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className='det'>
            <div className="crypto-details-container">
            <div className="crypto-details">
                <div className="crypto-details-header">
                    <button onClick={handleGoBack} aria-label="Go back" className="back-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    {crypto?.image?.small && (
                        <img src={crypto.image.small} alt={crypto?.name} width="50" height="50" className="crypto-image" />
                    )}
                    <h2>{crypto?.name} ({crypto?.symbol.toUpperCase()})</h2>
                </div>
                <div className="crypto-details-body">
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Card title="Overview" bordered={true}>
                                <Descriptions column={1} bordered>
                                    <Descriptions.Item label="Name">{crypto?.name}</Descriptions.Item>
                                    <Descriptions.Item label="Symbol">{crypto?.symbol.toUpperCase()}</Descriptions.Item>
                                    <Descriptions.Item label="Price">
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(crypto?.market_data.current_price[currency])}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Market Cap">
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(crypto?.market_data.market_cap[currency])}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="24h Change" style={{ color: crypto?.market_data.price_change_percentage_24h > 0 ? 'green' : 'red' }}>
                                        {crypto?.market_data.price_change_percentage_24h.toFixed(2)}%
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Price Chart (Last 30 Days)" bordered={true}>
                                <BarChart width={500} height={300} data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="time"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        minTickGap={32}
                                        tickFormatter={(value) => moment(value).format('MMM DD')}
                                    />
                                    <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value)} />
                                    <Bar dataKey="price" fill="#8884d8" />
                                </BarChart>
                            </Card>
                        </Col>
                    </Row>
                    <Tabs defaultActiveKey="1" type="card">
                        <TabPane tab="Overview" key="1">
                      
                        </TabPane>
                        <TabPane tab="Technical Analysis" key="2">
                        
                        </TabPane>
                        <TabPane tab="Community" key="3">
                          
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
        </div>
        
    );
};

export default CryptoDetails;
