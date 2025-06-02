import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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

  return (
    <div className="quote-container">
      <h3>Quote Generator</h3>
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
      </div>
    </div>
  )
}

export default App
