import React, { useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';
import "./selector.css"
const CurrencySelector = () => {
    const { currency, setCurrency } = useContext(CurrencyContext);

    return (
       <div className="loop">
                <div className='flop'><span>CRYPTOFOLIO</span> 
                <div className="btn__flop">
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
        </select>
                    <button className='watch'>WATCH LIST</button>
                    </div>
                    </div>
        </div>

    );
};

export default CurrencySelector;
