import { JourneyPicker } from '../../components/JourneyPicker';
import { JourneyDetail } from '../../components/JourneyDetail/JourneyDetail';
import { useState } from 'react';
import { useNavigate } from "react-router";
import { SelectedSeat } from '../../components/SelectedSeat/SelectedSeat';

export const HomePage = () => {
  const [journey, setJourney] = useState(null);

  const navigate = useNavigate();

  const handleJourneyChange = (journeyData) => {
    setJourney(journeyData);
  }

  const handleBuy = async () => {
    console.log("Neco se deje Kerolajno")
    const response = await fetch(`https://apps.kodim.cz/daweb/leviexpress/api/reservation`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      action: 'create',
      seat: journey.autoSeat,
      journeyId: journey.journeyId,
      }),
    })
    const responseData = await response.json();
    navigate(`/reservation/${responseData.results.reservationId}`)
  }

  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange}/>
      {journey && <JourneyDetail journey={journey}/>}
      {journey && <SelectedSeat number={journey.autoSeat}/>}
      <div className="controls container">
        <button className="btn btn--big" type="button" onClick={handleBuy}>Rezervovat</button>
      </div>
    </main>
  );
};

