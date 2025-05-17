import React, { useEffect, useState } from 'react';
import './style.css';

/*
Do hlavní komponenty JourneyPicker přidejte useEffect, který se bude volat při prvním zobrazení komponenty. Přesuňte do něj nastavení stavu cities – naše dvě testovací města. Výchozí stav pro cities tedy bude prázdné pole, teprve useEffect nastaví seznam měst na Prahu a Brno. Ověřte v prohlížeči, že se v selectech stále zobrazují obě města. Dejte pozor na to, aby se efekt volal opravdu jen při prvním zobrazení komponenty. Můžete si to ověřit pomocným výpisem do konzole prohlížeče, který se musí objevit jen jednou – když budete překlikávat na jiná města, výpis už se nebude opakovat.
*/
export const CityOptions = ({cities}) => {
  return(
    <>

    <option value="">Vyberte</option>
    {cities.map((city) => (
      <option key={city.code} value={city.code} >{city.name}</option>
    ))}
    </>
  )
}

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("");
  const [cities, setCities] = useState([]);

  /*
  useEffect(() => {setCities(
    [{ name: 'Praha', code: 'CZ-PRG' },
    { name: 'Brno', code: 'CZ-BRQ' }]
  )}, [])
  */
  useEffect(() => {
    const fetchCity = async () => {
      const response = await fetch(`https://apps.kodim.cz/daweb/leviexpress/api/cities`);
      const responseData = await response.json();
      setCities(responseData.results)
    }
    fetchCity();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Odesílám formulář s cestou")
    console.log(fromCity)
    console.log(toCity)
    console.log(date)
    console.log(cities[0].name)
  }

  return(
  <div className="journey-picker container">
    <h2 className="journey-picker__head">Kam chcete jet?</h2>
    <div className="journey-picker__body">
      <form className="journey-picker__form" onSubmit={handleSubmit}>
        <label>
          <div className="journey-picker__label">Odkud:</div>
          <select value={fromCity} onChange={(e) => setFromCity(e.target.value)}>
            <CityOptions cities={cities}/>
          </select>
        </label>
        <label>
          <div className="journey-picker__label">Kam:</div>
          <select value={toCity} onChange={(e) => setToCity(e.target.value)}>
            <CityOptions cities={cities}/>
          </select>
        </label>
        <label>
          <div className="journey-picker__label">Datum:</div>
          <select value={date} onChange={(e) => setDate(e.target.value)}>
            <option value="">Vyberte</option>
            <option value="datum01">Datum 01</option>
            <option value="datum02">Datum 02</option>
            <option value="datum03">Datum 03</option>
            <option value="datum04">Datum 04</option>
            <option value="datum05">Datum 05</option>
          </select>
        </label>
        <div className="journey-picker__controls">
          <button 
            className="btn" 
            type="submit"
          > 
            Vyhledat spoj
          </button>
        </div>
      </form>
      <img className="journey-picker__map" src="/map.svg" />
    </div>
  </div>
)};

