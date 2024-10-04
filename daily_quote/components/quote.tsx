"use client"

import { useEffect, useState } from "react";
import Header from "./Header"
import MainQuote from "./MainQuote"
import QuoteCard from "./QuoteCard"

/** Add fonts into your Next.js project:

import { Caudex } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'

caudex({
  subsets: ['latin'],
  display: 'swap',
})

cormorant_garamond({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
export function Quote() {
  const [mainQuote, setMainQuote] = useState<{ quote: string; author: string }>({ quote: '', author: '' });
  const [quoteCards, setQuoteCards] = useState<Array<{ quote: string; author: string }>>(
    Array(6).fill({ quote: '', author: '' })
  );

  const getQuote = async () => {
    const response = await fetch('https://quotely-m7oa.onrender.com/quotes') 
    const res = await response.json()
    return  {quote: res.quoteText, author: res.quoteAuthor};
  }

  useEffect(() => {
    const fetchMainQuote = async () => {
      const data = await getQuote();
      setMainQuote(data);
    };

    const fetchQuoteCards = async () => {
      const quotes = await Promise.all(Array(6).fill(null).map(() => getQuote()));
      setQuoteCards(quotes);
    };

    setInterval(fetchMainQuote, 5000);
    fetchMainQuote();
    // fetchQuoteCards();
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <section className="flex flex-col items-center justify-center gap-6 py-12 md:py-24 lg:py-32">
        <Header/>
        <MainQuote quote={mainQuote.quote} author={mainQuote.author} />
      </section>
      <section className="container grid grid-cols-1 gap-6 px-4 py-12 md:grid-cols-2 lg:grid-cols-3 lg:px-6">
      {quoteCards.map((quoteData, index) => (
          <QuoteCard key={index} quote={quoteData.quote} author={quoteData.author} />
        ))}
        
      </section>
    </div>
  )
}


