import { JourneyPicker } from '../../components/JourneyPicker';
import { JourneyDetail } from '../../components/JourneyDetail/JourneyDetail';
import { useState } from 'react';
import { SelectedSeat } from '../../components/SelectedSeat/SelectedSeat';

export const HomePage = () => {

  const [journey, setJourney] = useState(null);


  const handleJourneyChange = (journeyData) => {
    setJourney(journeyData);
  }
  
  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange}/>
      {journey && <JourneyDetail journey={journey}/>}
      {journey && <SelectedSeat number={journey.autoSeat}/>}
    </main>
  );
};

