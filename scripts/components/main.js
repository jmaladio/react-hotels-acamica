const Main = props => {

  const { checkIn, checkOut, country, price, size } = props;

  // constructs the date objects for check-in and check-out and set their time to 00h:00m:00s:000ms
  const dateCheckIn = new Date(checkIn.year, checkIn.month, checkIn.date, 0, 0, 0)
  const dateCheckOut = new Date(checkOut.year, checkOut.month, checkOut.date, 0, 0, 0)

  // auxiliar fn, accepts a date in ms and returns the date in ms with the time set at 00h:00m:00s:000ms
  const dateTimeToZero = (ms) => {
    const workingDate = new Date(ms);
    return workingDate.setHours(0,0,0,0)
  }


  // filters the hotels data for the check in value
  const arrPerCheckIn = checkIn.active ? hotelsData.filter(hotel => {
    return (
      dateCheckIn.valueOf() >= dateTimeToZero(hotel.availabilityFrom) && 
      dateCheckIn.valueOf() <= dateTimeToZero(hotel.availabilityTo)
      )
    })
    : hotelsData;

  // filters the hotels data for the check out value, only works if check-out is equal or greater than check-in
  const arrPerCheckOut = checkOut.active && dateCheckOut >= dateCheckIn ? arrPerCheckIn.filter(hotel => {
    return (
      dateTimeToZero(hotel.availabilityFrom) <= dateCheckOut.valueOf() && 
      dateTimeToZero(hotel.availabilityTo) >= dateCheckOut.valueOf()
      )
    })
    : arrPerCheckIn;

  // filters the hotels data for the country selection
  const arrPerCountry = country ? arrPerCheckOut.filter(hotel => hotel.country === country) : arrPerCheckOut;

  // filters the hotels data for the price selection
  const arrPerPrice = price ? arrPerCountry.filter(hotel => hotel.price === price) : arrPerCountry;

  // filters the hotels data for the size selection
  const arrPerSize = 
    size ? (
      size === 'small' ? arrPerPrice.filter(hotel => hotel.rooms <= 10) : (
        size === 'medium' ? arrPerPrice.filter(hotel => hotel.rooms > 10 && hotel.rooms <= 20) : arrPerPrice.filter(hotel => hotel.rooms > 20)
      )
    ) : arrPerPrice


  return (
    <div className="section-cards">
      <ErrorMessage 
        arrPerCheckIn={arrPerCheckIn}
        arrPerCheckOut={arrPerCheckOut}
        arrPerCountry={arrPerCountry}
        arrPerPrice={arrPerPrice}
        arrPerSize={arrPerSize}  
      />
      {
        arrPerSize.map((hotel) => (
          <Card 
            name={hotel.name} 
            photo={hotel.photo} 
            description={hotel.description} 
            availableFrom={hotel.availabilityFrom} 
            availableTo={hotel.availabilityTo} 
            country={hotel.country} 
            city={hotel.city} 
            price={hotel.price} 
            rooms={hotel.rooms} 
            key={hotel.slug} 
          />)
        )
      }
    </div>
  )
}

const ErrorMessage = props => {

  const { arrPerCheckIn, arrPerCheckOut, arrPerCountry, arrPerPrice, arrPerSize } = props;

  const findError = () => {
    if (!arrPerCheckIn.length) {
      return 'No hay hoteles disponibles para la fecha de entrada elegida';
    } else if (!arrPerCheckOut.length) {
      return 'No hay hoteles disponibles para la fecha de salida elegida';
    } else if (!arrPerCountry.length) {
      return 'No hay hoteles disponibles para el país elegido';
    } else if (!arrPerPrice.length) {
      return 'No hay hoteles disponibles para el rango de precios elegido';
    } else if (!arrPerSize.length) {
      return 'No hay hoteles disponibles para el tamaño de hotel elegido';
    } else {
      return '';
    }
  }

  return (
    <React.Fragment >
      {
        findError() ? <p className="paragraph-main">{findError()}</p> : ''
      }
    </React.Fragment>
  )
}