const Main = ({ checkIn, checkOut, country, price, size }) => {

  const dateCheckIn = new Date(checkIn.year, checkIn.month, checkIn.date, 23, 59, 59)
  const dateCheckOut = new Date(checkOut.year, checkOut.month, checkOut.date, 0, 0, 0)
  const today = new Date();
  const diffTime = dateCheckIn.valueOf() - today.valueOf()
  console.log(diffTime)


  const arrPerCheckIn = checkIn.active ? hotelsData.filter(hotel => dateCheckIn.valueOf() >= hotel.availabilityFrom && dateCheckIn.valueOf() < hotel.availabilityTo ) : hotelsData;

  const arrPerCheckOut = checkOut.active && dateCheckOut >= dateCheckIn ? arrPerCheckIn.filter(hotel => hotel.availabilityFrom <= dateCheckOut.valueOf() && hotel.availabilityTo >= dateCheckOut.valueOf()) : arrPerCheckIn;

  const arrPerCountry = country ? arrPerCheckOut.filter(hotel => hotel.country === country) : arrPerCheckOut;

  const arrPerPrice = price ? arrPerCountry.filter(hotel => hotel.price == price) : arrPerCountry;

  const arrPerSize = 
    size ? (
      size === 'small' ? arrPerPrice.filter(hotel => hotel.rooms <= 10) : (
        size === 'medium' ? arrPerPrice.filter(hotel => hotel.rooms <= 20) : arrPerPrice.filter(hotel => hotel.rooms > 20)
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