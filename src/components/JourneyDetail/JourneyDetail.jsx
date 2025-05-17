import "./style.css"
import { BusStop } from "../BusStop/BusStop"

export const JourneyDetail = ({journey}) => {
  const journeyStops = journey.stops;

  return(
    <div className="journey-detail container">
      <h2>Podrobnosti cesty</h2>
      <div className="stops">
        {journeyStops.map((stop) => (
          <BusStop key={stop.code} name={stop.name} station={stop.station} time={stop.time}/>
        ))}
      </div>
    </div>
  )
}
