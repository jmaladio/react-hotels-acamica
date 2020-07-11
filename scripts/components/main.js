const Main = ({ checkIn, checkOut, country, price, size }) => {

  const dateCheckIn = new Date(checkIn.year, checkIn.month, checkIn.date, 0, 0, 0)
  const dateCheckOut = new Date(checkOut.year, checkOut.month, checkOut.date, 0, 0, 0)

  const dateTimeToZero = (ms) => {
    const workingDate = new Date(ms);
    return workingDate.setHours(0,0,0,0)
  }

  // console.log(dateCheckIn, 'check in')
  // console.log(checkIn.active ? new Date(dateTimeToZero(dateCheckIn.valueOf())): 'pending')
  // console.log(new Date(hotelsData[0].availabilityFrom), 'first check in')
  // console.log(checkIn.active ? dateCheckIn.valueOf() === dateTimeToZero(hotelsData[0].availabilityFrom) : 'not done yet')



  const arrPerCheckIn = checkIn.active ? hotelsData.filter(hotel => {
    return dateCheckIn.valueOf() >= dateTimeToZero(hotel.availabilityFrom) && dateCheckIn.valueOf() <= dateTimeToZero(hotel.availabilityTo)})
    : hotelsData;

  const arrPerCheckOut = checkOut.active && dateCheckOut >= dateCheckIn ? arrPerCheckIn.filter(hotel => {
    return dateTimeToZero(hotel.availabilityFrom) <= dateCheckOut.valueOf() && dateTimeToZero(hotel.availabilityTo) >= dateCheckOut.valueOf()})
    : arrPerCheckIn;

  const arrPerCountry = country ? arrPerCheckOut.filter(hotel => hotel.country === country) : arrPerCheckOut;

  const arrPerPrice = price ? arrPerCountry.filter(hotel => hotel.price === price) : arrPerCountry;

  const arrPerSize = 
    size ? (
      size === 'small' ? arrPerPrice.filter(hotel => hotel.rooms <= 10) : (
        size === 'medium' ? arrPerPrice.filter(hotel => hotel.rooms > 10 && hotel.rooms <= 20) : arrPerPrice.filter(hotel => hotel.rooms > 20)
      )
    ) : arrPerPrice

  return (
    <div className="section-cards">
      {
        arrPerSize.map((hotel) => <Card name={hotel.name} photo={hotel.photo} description={hotel.description} availableFrom={hotel.availabilityFrom} availableTo={hotel.availabilityTo} country={hotel.country} city={hotel.city} price={hotel.price} rooms={hotel.rooms} key={hotel.slug} />)
      }
    </div>
  )
}