const Card = ({ name, photo, description, availableFrom, availableTo, country, city, price, rooms }) => {

  // const dateStart = new Date(availableFrom);
  // const dateEnd = new Date(availableTo);

  const cityPlusCountry = `${city}, ${country}`;

  const priceIcons = [1,2,3,4].map(el => {
    return el <= price ? <i key={el} className="fas fa-dollar-sign"></i> : <i key={el} className="fas fa-dollar-sign dollar-disable"></i>
  })

  return (
    <div className="card">
      <img className="card__img" src={photo}></img>
      <div className="card__data">
        <h2 className="heading-secondary">{name}</h2>
        <p className="paragraph-card">{description}</p>
        <br />

        <div className="card__data--line-1">
          <div className="card__place">
            <div className="card__place--icon">
              <i className="fas fa-map-marker"></i>
            </div>
            <div className="card__place--text">
              <p>{cityPlusCountry}</p>
            </div>
          </div>
        </div>


        <div className="card__data--line-2">
          <div className="card__rooms">
            <div className="card__rooms--icon">
              <i className="fas fa-bed"></i>
            </div>
            <div className="card__rooms--text">
              <p>{rooms} habitaciones</p>
            </div>
          </div>
          <div className="card__price">
          {priceIcons}
        </div>
        </div>
        
        
        {/* <p>From: {dateStart.toISOString()}</p>
        <p>To: {dateEnd.toISOString()}</p>
        <p>Country: {country}</p>
        <p>City: {city}</p>
        <p>Price range ID: {price}</p>
        <p>Rooms: {rooms}</p> */}
      </div>
      <button className="card__btn">Reservar</button>
    </div>
  )
}
