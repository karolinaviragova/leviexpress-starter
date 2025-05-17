import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import "./style.css"

export const ReservationPage = () => {
  let params = useParams()
  const id = params.id
  console.log(id)
  const [reservation, setReservation] = useState(null);
  
  useEffect(() => {
    const fetchTicket = async () => {
      const response = await fetch(`https://apps.kodim.cz/daweb/leviexpress/api/reservation?id=${id}`);
      const responseData = await response.json();
      setReservation(responseData.results)
    }
    fetchTicket();
  }, [])
  console.log(reservation)
  return reservation &&(
    <>
      <div className="reservation container">
      <h2>Vaše e-jízdenka č. HAQBAQASf7M</h2>
        <div className="reservation__body">
          <div className="reservation__headings">
            <p>Datum cesty:</p>
            <p>Odjezd:</p>
            <p>Příjezd:</p>
            <p>Sedadlo:</p>
          </div>
          <div className="reservation__info">
            <p>{reservation.date}</p>
            <p>{reservation.fromCity.name}, {reservation.fromCity.time}</p>
            <p>{reservation.toCity.name}, {reservation.toCity.time}</p>
            <p>{reservation.seatNumber}</p>
          </div>
        </div>
      </div>
    </>
  )
}
