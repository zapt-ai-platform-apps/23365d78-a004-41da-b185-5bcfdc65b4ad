import React, { useState, useEffect } from 'react';
import { cryptoOptions, fiatOptions } from '../constants/currencyOptions';
import { fetchConversionRate } from '../services/api';

export default function CryptoConverter() {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('bitcoin');
    const [toCurrency, setToCurrency] = useState('usd');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleConvert = async () => {
        if (loading) return;
        setLoading(true);
        setError(null);
        setConvertedAmount(null);
        console.log('Conversion started');

        try {
            const rate = await fetchConversionRate(fromCurrency, toCurrency);
            console.log('Conversion rate fetched:', rate);
            setConvertedAmount((amount * rate).toFixed(2));
            console.log(`Converted Amount: ${amount} ${fromCurrency} = ${amount * rate} ${toCurrency}`);
        } catch (err) {
            console.error('Error during conversion:', err);
            setError('Failed to convert currency. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (convertedAmount !== null) {
                handleConvert();
            }
        }, 60000); // Refresh every 60 seconds

        return () => clearInterval(interval);
    }, [convertedAmount, fromCurrency, toCurrency, amount]);

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-semibold mb-4">Live Crypto Converter</h2>
            <div className="flex flex-col md:flex-row md:space-x-4 w-full max-w-md">
                <input
                    type="number"
                    className="box-border p-2 border border-gray-300 rounded mb-4 md:mb-0"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <select
                    className="box-border p-2 border border-gray-300 rounded mb-4 md:mb-0"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    {cryptoOptions.map((crypto) => (
                        <option key={crypto.value} value={crypto.value}>
                            {crypto.label}
                        </option>
                    ))}
                </select>
                <select
                    className="box-border p-2 border border-gray-300 rounded"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                >
                    {fiatOptions.map((fiat) => (
                        <option key={fiat.value} value={fiat.value}>
                            {fiat.label}
                        </option>
                    ))}
                </select>
            </div>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer disabled:opacity-50"
                onClick={handleConvert}
                disabled={loading || !amount}
            >
                {loading ? 'Converting...' : 'Convert'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {convertedAmount && (
                <p className="text-green-500 mt-4 text-xl">
                    {amount} {fromCurrency.toUpperCase()} = {convertedAmount} {toCurrency.toUpperCase()}
                </p>
            )}
        </div>
    );
}