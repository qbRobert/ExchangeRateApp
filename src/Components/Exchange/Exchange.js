import './Exchange.css';
import axios from 'axios';
import { useState } from 'react';
const Exchange = () =>{

    const [curencies, setCurencies] = useState([])
    const[amountChanged, setAmountChanged] = useState('');

    axios.get("https://api.exchangerate.host/latest").then((res) =>{
        setCurencies(Object.keys(res.data.rates));
    })

    const setCurecy = () => {
        const curencyToChange = document.getElementById('curencyToChange').value;
        const curencyChanged = document.getElementById('curencyChanged').value;
        const amountToBeChanged = document.getElementById('amountToBeChanged').value;
      
        axios
          .get(
            `https://api.exchangerate.host/convert?from=${curencyToChange}&to=${curencyChanged}&amount=${amountToBeChanged}`
          )
          .then((res) => {
            setAmountChanged(res.data.result);
          });
      };

    return(
        <>
            <div className='exchange-input-row'>
                <input id="amountToBeChanged" className='input-field' type="number" placeholder='Amount to change' onChange={()=>setCurecy()} /> 
                <select id='curencyToChange' className='select-field' onChange={()=>setCurecy()}>
                    <option value="" selected> Select an option</option>
                    {curencies.map((option) =>(
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div className='exchange-input-row'>
                <input className='input-field result-input ' type="number" placeholder='Amount changed' value = {amountChanged} disabled /> 
                <select id ='curencyChanged' className='select-field' onChange={()=>setCurecy()}>
                    <option value="" selected> Select an option</option>
                    {curencies.map((option) =>(
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default Exchange;