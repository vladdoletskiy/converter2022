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
    const [options, setOptions] = useState([]);
    const [currency, setCurrency] = useState(0);
    const [convertValue, setConvertValue] = useState(0);
  

    useEffect(() => {
        axios.get( `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
       .then((res) => {
        setInfo(res.data[from]);
        })
        .catch((error) =>  console.log(error))
    }, [from]);



  useEffect(() => {
    setOptions(Object.keys(info));
    setCurrency(info[to]);
  }, [info, to])

  useEffect(() => {
   console.log('input1', input1);
   console.log('input2', input2);
   console.log('currency', currency);
   console.log('convertValue', convertValue);
  }, [input1, input2,currency])

   
 
  const flip = () => {
    let temp = from;
    setFrom(to);
    setTo(temp);
  }


  const getValue1 = (e) => {
    setInput1(e.target.value);
    setInput2(e.target.value * currency);

  }

  const getValue2 = (e) => {
    setInput2(e.target.value);
    setInput1(e.target.value * currency);

}

// const convert = (input, currency) => {
//     setConvertValue(input * currency);
// }



  return (
    <div className='converterWrapper'>


        <div className='converter'> 
            <div className='converter-input' >
                <Input onChange={getValue1} value={input1}/>
            </div>
            <div className='converter-input' >
                <Input onChange={getValue2} value={input2}/>
            </div>
            {/* <div className='converter-input' >
                <Input onChange={(e) => setInput1(e.target.value)} value={input1}/>
            </div>
            <div className='converter-input' >
                <Input onChange={(e) => setInput2(e.target.value)} value={input2}/>
            </div> */}
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