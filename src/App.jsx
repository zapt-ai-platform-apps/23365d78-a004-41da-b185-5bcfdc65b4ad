import React from 'react';
import CryptoConverter from './components/CryptoConverter';

export default function App(){
    return (
        <div className="min-h-screen h-full flex flex-col">
            <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <h1 className="text-xl font-bold">Crypto Converter</h1>
                <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-sm cursor-pointer">
                    Made on ZAPT
                </a>
            </header>
            <main className="flex-grow flex items-center justify-center bg-gray-100">
                <CryptoConverter />
            </main>
            <footer className="p-4 bg-gray-800 text-white text-center">
                &copy; {new Date().getFullYear()} Crypto Converter. All rights reserved.
            </footer>
        </div>
    )
}