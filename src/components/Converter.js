import React from 'react'
import './Converter.css'
import {useEffect, useState} from 'react'
import Input from '../UI/Input'
import Select from '../UI/Select'
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import axios from 'axios'



const Converter = () => {
    const [from, setFrom] = useState('usd');
    const [to, setTo] = useState("eur");
    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [out, setOut] = useState(0);
    const [options, setOptions] = useState([]);
  

    useEffect(() => {
        axios.get( `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
       .then((res) => {
        setInfo(res.data[from]);
        })
        .catch((error) =>  console.log(error))
    }, [from]);



  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info, to, from, input])
    

  const convert = () => {
    let rate = info[to];
    setOut(input * rate);

  }
  
 
  const flip = () => {
    let temp = from;
    setFrom(to);
    setTo(temp);
  }


  return (
    <div className='converterWrapper'>


        <div className='converter'> 
            <div className='converter-input' >
                <Input onChange={(e) => setInput(e.target.value)} />
            </div>
            
            <div className='selects'>  
                <Select options={options}  onChange={(e) => setFrom(e.value)} value={from} />
                <div className="switch"><HiSwitchHorizontal size="30px"  onClick={flip}/> </div>
                <Select options={options}  onChange={(e) => setTo(e.value)} value={to}/>
            </div>   
            <div className='out'>{`${input} ${from} = ${out.toFixed(2)} ${to}`}</div>
        </div>

    </div>
  )
}

export default Converter