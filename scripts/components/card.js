const Card = ({ name, photo, description, availableFrom, availableTo, country, city, price, rooms }) => {

  const dateStart = new Date(availableFrom)
  const dateEnd = new Date(availableTo)
  return (
    <div className="card">
      <img className="card__img" src={photo}></img>
      <div className="card__data">
        <h2 className="heading-secondary">{name}</h2>
        <p className="paragraph-card">{description}</p>
        <br />
        <p>From: {dateStart.toISOString().slice(0,10)}</p>
        <p>To: {dateEnd.toISOString().slice(0,10)}</p>
        <p>Country: {country}</p>
        <p>City: {city}</p>
        <p>Price range ID: {price}</p>
        <p>Rooms: {rooms}</p>
      </div>
      <button className="card__btn">Reservar</button>
    </div>
  )
}
