import { createContext, useState, useEffect } from 'react';

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        setWatchlist(storedWatchlist);
    }, []);

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    return (
        <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};
