import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleQuote =() =>{
    setLoading(true);
    fetch('https://api.quotable.io/random',{})
    .then((res) => {
      if (!res){
        throw Error;
      }
      return res.json();
    })
    .then((data) => {
      setQuote(data);
      console.log(data);
    })
    .catch((e) => {
      setError(true);
    })

  }
  return (
    <div className="quote-container">
      <h3>Quote Generator</h3>
      <div className="quote"> 
        {quote && <p>{quote}</p>}
        <button onClick={()=> {handleQuote}}>New Quote</button>
        <button>copy</button>
        <button>X</button>
      </div>
    </div>
  )
}

export default App
