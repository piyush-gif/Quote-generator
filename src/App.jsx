import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


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
  return (
    <div className="quote-container">
      <h3>Quote Generator</h3>
      <div className="quote"> 
        {loading && <p>Loading....</p>}
        {error && <p> something went wrong</p>}
        {quote && <p>{quote.text} - {quote.author}</p>}
        <button onClick={handleQuote}>New Quote</button>
        <button>copy</button>
        <button>X</button>
      </div>
    </div>
  )
}

export default App
