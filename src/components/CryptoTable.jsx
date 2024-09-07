import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrencyContext } from '../context/CurrencyContext';
import Eye from "../../public/Eye.svg";
import { Row, Col, Card, Statistic, Button, Descriptions, Progress, Tabs } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';
import "../components/selector.css";

const { TabPane } = Tabs;

const CryptoTable = () => {
    const [cryptos, setCryptos] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [activeCryptoId, setActiveCryptoId] = useState(null);
    const { currency } = useContext(CurrencyContext);
    const navigate = useNavigate(); // Use navigate for routing

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=false`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setCryptos(data);
                setTotalPages(Math.ceil(data.length / perPage));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [currency]);

    const filteredCryptos = cryptos.slice((page - 1) * perPage, page * perPage).filter(crypto =>
        crypto.name.toLowerCase().includes(search.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(search.toLowerCase())
    );

    const handleMouseOver = (id) => {
        if (id !== activeCryptoId) {
            setActiveCryptoId(id);
        }
    };

    const handleMouseOut = () => {
        setActiveCryptoId(null);
    };

    const handleClick = (id) => {
        navigate(`/crypto/${id}`); // Navigate to details page
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="crypto-table-wrapper">
            <div className="crypto-table-container">
                <input
                    type="text"
                    placeholder="Search For a Crypto Currency..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="search-input"
                />
                <table className="crypto-table">
                    <thead>
                        <tr>
                            <th className='coin-header'>Coin</th>
                            <th className='price-header'>Price</th>
                            <th className='change-header'>24h Change</th>
                            <th className='cap-header'>Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCryptos.map(crypto => (
                            <tr key={crypto.id} onMouseOver={() => handleMouseOver(crypto.id)}
                            onMouseOut={handleMouseOut}
                            onClick={() => handleClick(crypto.id)} className="crypto-card">
                                <td className='coin-item'>
                                    <img src={crypto.image} alt={crypto.name} width="30" height="30" />
                                    <span>{crypto.name} ({crypto.symbol.toUpperCase()})</span>
                                </td>
                                <td className='price-item'>{new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(crypto.current_price)}</td>
                                <td className='change-item' style={{ color: crypto.price_change_percentage_24h > 0 ? 'green' : 'red' }}>
                                    <span className='btn__of'>
                                        <img
                                            className={`of ${activeCryptoId === crypto.id ? 'active' : ''}`}
                                            src={Eye}
                                            alt="Eye"
                                        />
                                    </span>
                                    {crypto.price_change_percentage_24h.toFixed(2)}%
                                </td>
                                <td className='cap-item'>{new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(crypto.market_cap)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} aria-label="Previous page">
                    &lt;
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={page === index + 1 ? 'active' : ''}
                        onClick={() => handlePageChange(index + 1)}
                        aria-label={`Page ${index + 1}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} aria-label="Next page">
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default CryptoTable;
