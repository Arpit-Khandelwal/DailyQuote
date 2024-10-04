"use client"

import { useState, useEffect } from 'react'; // Import necessary hooks

export default function Home() {
  const [quote, setQuote] = useState(''); // State to hold the quote

  useEffect(() => {
    // Fetch a quote when the component mounts
    fetch('https://quotely-m7oa.onrender.com/quotes') // Example API for random quotes
      .then(response => response.json())
      .then(data => setQuote(`${data.quoteText} \n - ${data.quoteAuthor}`));
  }, []);

  return (
    <>
      {/* <h1>Daily Motivational Quote</h1> */}
      <p>{quote}</p> {/* Display the fetched quote */}
    </>
  );
}
