const Header = ({checkIn, checkOut}) => {
  
  const getHeaderDay = (code) => {
    const days = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
    return days[code];
  }
  
  const getHeaderMonth = (code) => {
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return months[code];
  }

  const dateCheckIn = new Date(checkIn.year, checkIn.month, checkIn.date, 0, 0, 0)
  const dateCheckOut = new Date(checkOut.year, checkOut.month, checkOut.date, 0, 0, 0)

  return (
    <header className="section-header">
      <div className="header__container">
        <h1 className="heading-primary">Hoteles</h1>
        <p className="paragraph-header">
          {checkIn.active ? 
            <React.Fragment>
              {'Desde el '}
              <HeaderDate 
                day={getHeaderDay(checkIn.day)} 
                date={checkIn.date} 
                month={getHeaderMonth(checkIn.month)} 
                year={checkIn.year}
              /> 
            </React.Fragment> :
            <React.Fragment>
              {checkOut.active ? '' : 'Elige tu próximo destino'}
            </React.Fragment>
          }
          {checkOut.active && dateCheckOut >= dateCheckIn ?
            <React.Fragment>
              {checkIn.active ? ' hasta el ' : 'Hasta el '}
              <HeaderDate 
                day={getHeaderDay(checkOut.day)}
                date={checkOut.date} 
                month={getHeaderMonth(checkOut.month)} 
                year={checkOut.year}
              /> 
            </React.Fragment> :
            ''
          }
        </p>
      </div>
    </header>
  )
}

const HeaderDate = ({ day, date, month, year }) => <span>{day}, {date} de {month} de {year}</span>