import { JourneyPicker } from '../../components/JourneyPicker';
import { JourneyDetail } from '../../components/JourneyDetail/JourneyDetail';
import { useState } from 'react';
import { useNavigate } from "react-router";
import { SelectedSeat } from '../../components/SelectedSeat/SelectedSeat';

/*
Vložte do komponenty HomePage oddíl s tlačítkem „Rezervovat" (zkopírujte potřebný kód z dodaného designu). Stále v komponentě HomePage vytvořte funkci handleBuy a zařiďte, aby byla tato funkce volána při kliknutí na tlačítko „Rezervovat". Ve funkci si zatím můžete vypsat nějakou zprávu do konzole (třeba 'Funguju!').
*/
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

