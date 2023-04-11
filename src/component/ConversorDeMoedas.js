import React, { useState, useEffect } from "react";
import axios from "axios";

const Converter = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("BRL");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {fetchExchangeRate();}, [baseCurrency, targetCurrency]);

  
  const fetchExchangeRate = async () => {

      await axios
      .get(`https://economia.awesomeapi.com.br/json/last/${baseCurrency}-${targetCurrency}`)
      .then(response => {
        const rate = response.data[`${baseCurrency}${targetCurrency}`].bid;
        setExchangeRate(rate)
        console.log(rate)
        
      })
      .catch (error => {
      console.error("Erro ao obter cotação, tente novamente.", error)
      })
  }

  const handleConversion = () => {
    const convertedValue = amount * exchangeRate;
    const convertedAmount = setConvertedAmount(convertedValue.toFixed(2));
  }

  return (
    <div className="container">
      <h1>Conversor de Moedas</h1>
      <form>
        <label>
          Moeda base:
          <select
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
          >
            <option value="USD">USD (Dólar Americano)</option>
            <option value="EUR">EUR (Euro)</option>
            <option value="GBP">GBP (Libra Esterlina)</option>
            <option value="JPY">JPY (Iene Japonês)</option>
            <option value="BRL">BRL (Real Brasileiro)</option>
            <option value="CAD">CAD (Dólar Canadense)</option>
            <option value="AUD">AUD (Dólar Australiano)</option>
            <option value="CHF">CHF (Franco Suíço)</option>
          </select>
        </label>

        <label>
          Moeda alvo:
          <select
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
          >
            <option value="USD">USD (Dólar Americano)</option>
            <option value="EUR">EUR (Euro)</option>
            <option value="GBP">GBP (Libra Esterlina)</option>
            <option value="JPY">JPY (Iene Japonês)</option>
            <option value="BRL">BRL (Real Brasileiro)</option>
            <option value="CAD">CAD (Dólar Canadense)</option>
            <option value="AUD">AUD (Dólar Australiano)</option>
            <option value="CHF">CHF (Franco Suíço)</option>
          
          </select>
        </label>

        <label>
          Valor: 
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        
        <button type="button" onClick={handleConversion}>
          Converter
        </button>
      </form>

      {exchangeRate && (
        <p>
          Taxa de câmbio: 1 {baseCurrency} = {exchangeRate} {targetCurrency}
        </p>
      )}
      {convertedAmount && (
        <p>
          Valor convertido: {amount} {baseCurrency} = {convertedAmount}{" "}
          {targetCurrency}
        </p>
      )}
    </div>

  );
}

export default Converter;
