'use client';

import { useState } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    // State to manage the theme
    const [theme, setTheme] = useState('light');

    // State for the chat functionality
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    // State for the sliders
    const [temperature, setTemperature] = useState(0.7);
    const [maxTokens, setMaxTokens] = useState(512);

    // This function handles sending a message
    const handleSendMessage = () => {
        if (input.trim() === '') return;

        // Add user's message to state
        const userMessage = { text: input, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, userMessage]);

        // Clear the input field
        setInput('');

        // Simulate an AI response after a short delay
        setTimeout(() => {
            const aiMessage = { text: "Hello! This is a mock AI response.", sender: 'ai' };
            setMessages(prevMessages => [...prevMessages, aiMessage]);
        }, 1000);
    };

    return (
        <main className={`min-h-screen flex flex-row ${theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-gray-900 text-gray-300'}`}>
            {/* Left Sidebar */}
            <div className={`w-1/4 p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                <h2 className="text-xl font-semibold mb-4">Model Selector</h2>
                <button
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="p-2 mb-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                >
                    <span className="text-2xl">
                        {theme === 'light' ? '☀' : '☾'}
                    </span>
                </button>
                <div className="mb-6">
                    <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Select a Model</label>
                    <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>GPT-3.5</option>
                        <option>GPT-4</option>
                        <option>Custom</option>
                    </select>
                </div>
            </div>

            {/* Main Content Area */}
            <div className={`flex-grow flex flex-col m-4 rounded-lg shadow-md p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                {/* Chat/Output Area */}
                <div className={`flex-grow overflow-y-auto p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
                    {messages.map((msg, index) => (
    <div key={index} className={`flex mb-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div className={`p-2 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
            {msg.text}
        </div>
    </div>
))}
                </div>

                {/* Prompt Editor and Send Button */}
                <div className="flex items-center mt-4">
                    <textarea
                        className={`w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}
                        rows={4}
                        placeholder="Enter your prompt here..."
                        aria-label="Prompt Editor"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-2 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Send
                    </button>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className={`w-1/4 p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                <h2 className="text-xl font-semibold mb-4">Parameters</h2>

                {/* Temperature Control */}
                <div className="mb-6">
                    <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Temperature</label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={temperature}
                        onChange={(e) => setTemperature(Number(e.target.value))}
                        className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-gray-500 mt-1 block">{temperature.toFixed(2)}</span>
                </div>

                {/* Max Tokens Control */}
                <div className="mb-6">
                    <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Max Tokens</label>
                    <input
                        type="range"
                        min="1"
                        max="2048"
                        step="1"
                        value={maxTokens}
                        onChange={(e) => setMaxTokens(Number(e.target.value))}
                        className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-gray-500 mt-1 block">{maxTokens}</span>
                </div>
            </div>
        </main>
    );
}