import { JourneyPicker } from '../../components/JourneyPicker';
import { useState } from 'react';

/*
Upravte komponentu HomePage tak, aby v případě, kdy ve stavu journey je nějaké spojení, vypsala pod vyhledávací formulář text „Nalezeno spojení s id …“. Místo tří teček bude journeyId z dat o nalezeném spojení.
*/

export const HomePage = () => {

  const [journey, setJourney] = useState(null);


  const handleJourneyChange = (journeyData) => {
    setJourney(journeyData);
  }
  
  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange}/>
      {journey ? <p>Nalezeno spojení s id {journey.journeyId}</p> : ""}
    </main>
  );
};
