import React, { useEffect, useState } from 'react';
import './style.css';

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

export const DatesOptions = ({dates}) => {
  return(
    <>
      <option value="">Vyberte</option>
      {dates.map((date) => (
        <option key={date.dateBasic} value={date.dateBasic} >{date.dateCs}</option>
      ))}
    </>
  )
}

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("");
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]);
  const isFormValid = fromCity && toCity && date;

  useEffect(() => {
    const fetchCity = async () => {
      const response = await fetch(`https://apps.kodim.cz/daweb/leviexpress/api/cities`);
      const responseData = await response.json();
      setCities(responseData.results)
    }
    fetchCity();
    const fetchDate = async () => {
      const response = await fetch(`https://apps.kodim.cz/daweb/leviexpress/api/dates`);
      const responseData = await response.json();
      setDates(responseData.results)
    }
    fetchDate()
  }, [])
/*
Ve funkci handleSubmit v komponentě JourneyPicker nyní vypisujete nalezená spojení jen do konzole prohlížeče. Tento výpis nahraďte voláním funkce uložené v property onJourneyChange, které jako parametr předáte data získaná z volání API pod klíčem results.

*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://apps.kodim.cz/daweb/leviexpress/api/journey?fromCity=${fromCity}&toCity=${toCity}&date=${date}`);
    const responseData = await response.json();
    onJourneyChange(responseData.results);
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
            <DatesOptions dates={dates}/>
          </select>
        </label>
        <div className="journey-picker__controls">
          <button 
            className="btn" 
            type="submit"
            disabled={!isFormValid}
          > 
            Vyhledat spoj
          </button>
        </div>
      </form>
      <img className="journey-picker__map" src="/map.svg" />
    </div>
  </div>
)};

