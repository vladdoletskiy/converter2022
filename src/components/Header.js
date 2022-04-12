import React from 'react'
import './Header.css'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Loader from '../components/Loader'

const Header = () => {
    const [rates, setRates] = useState([]);

    function getRates() {
        const usd = axios('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json')
        .then(response => response.data)
        .catch(err => err)
    
        const eur = axios('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json')
        .then(response => response.data)
        .catch(err => err)
    
        Promise.all([usd, eur])
        .then((rates) => {
            setRates(rates)
        })
    }

    
    useEffect(() => {
        getRates();
      }, []);
    

    const fixRates = (rate) => rate.toFixed(2); 

  return (
    <header>
        <div className='headerLogo' >Converter</div> 
        {rates.length ?
         <div className='exchangeRate'>
            <div className='exchangeRate-item'>$ {fixRates(rates[0].usd.uah)}</div> 
           <div className='exchangeRate-item'>€ {fixRates(rates[1].eur.uah)}</div>
        </div>
            :
        <Loader/>
        }
    
    
        
      
    
        
    </header>
  )
}

export default Header