import { useEffect, useState, useRef } from 'react'

import './App.css'

function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clicks, setClicks] =useState(0);
  const clickRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setClicks(clickRef.current);
      clickRef.current = 0; 
    }, 3000);
    return () => clearInterval(interval);
  },[]);

  useEffect(() => {

    const savedQuote = localStorage.getItem('lastQuote');
    if (savedQuote) {
      setQuote(JSON.parse(savedQuote));
    }
    else{
      handleQuote();
    }
  },[]);
  useEffect (() => {
    if (quote) {
       localStorage.setItem('lastQuote', JSON.stringify(quote));
    }
  },[quote]);

  const handleQuote =() =>{
    setLoading(true);
    setError(false);
    fetch('http://localhost:8000/quotes')
    .then((res) => {
      if (!res.ok){
        throw new Error('failed to fetch');
      }
      return res.json();
    })
    .then((data) => {
      setLoading(false);
      const randomIndex = Math.floor(Math.random() * data.length);
      setQuote(data[randomIndex]);
      
    })
    .catch((err) => {
      console.log(err);
      setError(true);
      setLoading(false);
    })
  }
  const handleCopy = () => {
    if (!quote) return;

    const textToCopy = `${quote.text} - ${quote.author}`;

    navigator.clipboard.writeText(textToCopy)
    .then(() => {
      alert('Quote copid to clipboard');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const twitterUrl= quote ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quote.text} - ${quote.author}`)}`
  : null;

  
  const handleCount = () => {
    clickRef.current+=1
  }
  
  return (
    <div className="quote-container">
      <h3>Quote Generator</h3>
      {clicks && <p>clicks:{clicks}</p>}
      <div className="quote"> 
        {loading && <p>Loading....</p>}
        {error && <p> something went wrong</p>}
        {quote && <p>{quote.text} - {quote.author}</p>}
        <button onClick={handleQuote}>New Quote</button>
        <button onClick={handleCopy}>copy to clipboard</button>
        {quote && (
          <a 
            href={twitterUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="tweet-button"
          >
            Tweet this
          </a>
          )}
          <button onClick={handleCount}>Clicks in the last 30sec</button>
      </div>
    </div>
  )
}

export default App
