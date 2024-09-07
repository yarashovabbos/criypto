import React from 'react';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CryptoDetails from './components/CryptoDetails';
import { CurrencyProvider } from './context/CurrencyContext';
import { WatchlistProvider } from './context/WatchlistContext';
import CryptoTable from './components/CryptoTable';
import HeroCarousel from './components/HeroCarousel';
import CurrencySelector from './components/CurrencySelector';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/Banner';


const HomePage = () => {
    return (
      <div className="app__page">
        <CurrencyProvider>
            <WatchlistProvider>
                <div>
                    <header>
                        <CurrencySelector />
                        <Banner/>
                    </header>
                    <HeroCarousel />
                </div>
            </WatchlistProvider>
            <Router>
      <Routes>
        <Route path="/" element={<CryptoTable />} />
        <Route path="/crypto/:id" element={<CryptoDetails />} />
      </Routes>
    </Router>
        </CurrencyProvider>
        </div>
    );
};

export default HomePage;
