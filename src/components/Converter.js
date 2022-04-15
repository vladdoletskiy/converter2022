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
    const [input1, setInput1] = useState(0);
    const [input2, setInput2] = useState(0);
    const [output, setOutput] = useState();
    const [out, setOut] = useState(0);
    const [options, setOptions] = useState([]);
    const [currency, setCurrency] = useState();
  

    useEffect(() => {
        axios.get( `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
       .then((res) => {
        setInfo(res.data[from]);
        })
        .catch((error) =>  console.log(error))
    }, [from]);



  useEffect(() => {
    setOptions(Object.keys(info));
    // convert();
    setCurrency(info[to]);
    console.log(currency)
  }, [info, to])


  const convert = () => {
    let rate = info[to];
    // setCurrency(info[to]);
    
  }
  
 
  const flip = () => {
    let temp = from;
    setFrom(to);
    setTo(temp);
  }


  const getValue1 = (e) => {
    setInput1(e.target.value);
    // let rate = info[to];
    setInput2(e.target.value * currency);
    console.log(input1);
  }

  const getValue2 = (e) => {
    setInput2(e.target.value);
    // let rate = info[to];
    setInput1(e.target.value * currency);
    console.log(input2);
}


  return (
    <div className='converterWrapper'>


        <div className='converter'> 
            <div className='converter-input' >
                <Input onChange={getValue1} value={input1}/>
            </div>
            <div className='converter-input' >
                <Input onChange={getValue2} value={input2}/>
            </div>
            
            <div className='selects'>  
                <Select options={options}  onChange={(e) => setFrom(e.value)} value={from} />
                <div className="switch"><HiSwitchHorizontal size="30px"  onClick={flip}/> </div>
                <Select options={options}  onChange={(e) => setTo(e.value)} value={to}/>
            </div>   
        </div>

    </div>
  )
}

export default Converter