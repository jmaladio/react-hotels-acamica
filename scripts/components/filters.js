const Filters = ({ onDateChange, onCountryChange, onPriceChange, onSizeChange, activeCheckIn, limitCheckOut }) => {

  const listCountries = hotelsData.map(el => el.country).filter((el, index, arr) => {
    return arr.indexOf(el) === index;
  }).sort();

  const todayDate = new Date();
  const limitCheckOutDate = new Date(limitCheckOut)

  if (activeCheckIn) {
    // console.log(limitCheckOutDate)
    // console.log(limitCheckOutDate.toISOString())
  }

  const dateStringify = (date) => {
    const numDate = date.getDate();
    const numMonth = date.getMonth() + 1;
    const numYear = date.getFullYear();

    return `${numYear}-${numMonth < 10 ? '0' + numMonth : numMonth}-${numDate < 10 ? '0' + numDate : numDate}`
  }

  return (
    <div className="section-filters">
      <div className="filters-container">
        <input 
          type="date" 
          id="start" 
          name="start" 
          min={dateStringify(todayDate)} 
          onChange={onDateChange}
        ></input>
        <input 
          type="date" 
          id="end" 
          name="end" 
          min={activeCheckIn ? limitCheckOutDate.toISOString().slice(0,10) : dateStringify(todayDate)} 
          onChange={onDateChange}
        ></input>
        <select onChange={onCountryChange}>
          <option value="">Todos los países</option>
          {
            listCountries.map((el, index) => <option key={`${index}-${el.slice(0,3).toLowerCase()}`} value={el}>{el}</option>)
          }
        </select>
        <select onChange={onPriceChange}>
          <option value="">Cualquier precio</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
        </select>
        <select onChange={onSizeChange}>
          <option value="">Cualquier tamaño</option>
          <option value="small">Hotel pequeño</option>
          <option value="medium">Hotel mediano</option>
          <option value="large">Hotel grande</option>
        </select>
      </div>
    </div>
  )
}