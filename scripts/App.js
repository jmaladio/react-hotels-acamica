class App extends React.Component {

  constructor() {
    super();
    this.state = {
      start: {
        day: 0,
        date: 0,
        month: 0,
        year: 0,
        value: ""
      },
      end: {
        day: 0,
        date: 0,
        month: 0,
        year: 0,
        value: ""
      }
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    console.log(hotelsData.map(el => el.availabilityTo));
    
  }

  // initStateStart() {
  //   const now = new Date();
  //   const ms = Date.now() + 86400000*7;
  //   const tomorrow = new Date(ms);
    
  //   this.setState(
  //     {
  //       start: {
  //         day: now.getDay(),
  //         date: now.getDate(),
  //         month: now.getMonth(),
  //         year: now.getFullYear(),
  //         value: now.toISOString().slice(0,10)
  //       },
  //       end: {
  //         day: tomorrow.getDay(),
  //         date: tomorrow.getDate(),
  //         month: tomorrow.getMonth(),
  //         year: tomorrow.getFullYear(),
  //         value: tomorrow.toISOString().slice(0,10)
  //       }
  //     } 
  //   )
  // }

  handleDateChange(e) {
    if (e.target.value) {
      const date = e.target.valueAsDate;
      this.setState({[e.target.name]: {
        day: date.getUTCDay(),
        date: date.getUTCDate(),
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
        value: e.target.value
        }
      })
    } else {
      this.setState({[e.target.name]: {
        day: 0,
        date: 0,
        month: 0,
        year: 0,
        value: 0
        }
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header start={this.state.start} end={this.state.end}/>
        <main>
          <FiltersMenu onDateChange={this.handleDateChange} />
          <MainView>
            <Card />
          </MainView>
        </main>
      </React.Fragment>
    );
  }
}


const Header = ({start, end}) => {
  
  const getHeaderDay = (code) => {
    const days = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
    return days[code];
  }
  
  const getHeaderMonth = (code) => {
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return months[code];
  }

  return (
    <header className="section-header">
      <div className="header__container">
        <h1 className="heading-primary">Hoteles</h1>
        <p className="paragraph-header">
          {start.value ? 
            <React.Fragment>
              Desde el
              <HeaderDate day={getHeaderDay(start.day)} date={start.date} month={getHeaderMonth(start.month)} year={start.year}/> 
            </React.Fragment> :
            'Elige tu próximo destino'
          }
          {start.value && end.value ?
            <React.Fragment>
              hasta el
              <HeaderDate day={getHeaderDay(end.day)} date={end.date} month={getHeaderMonth(end.month)} year={end.year}/> 
            </React.Fragment> :
            ''
          }
        </p>
      </div>
    </header>
  )
}

const HeaderDate = ({ day, date, month, year }) => <span> {day}, {date} de {month} de {year} </span>

const FiltersMenu = ({onDateChange}) => {

  const listCountries = hotelsData.map(el => el.country).filter((el, index, arr) => {
    return arr.indexOf(el) === index;
  }).sort();

  return (
    <div className="section-filters">
      <div className="filters-container">
        <input type="date" id="start" name="start" onChange={onDateChange}></input>
        <input type="date" id="end" name="end" onChange={onDateChange}></input>
        <select >
          <option value="">Todos los países</option>
          {
            listCountries.map((el, index) => <option key={`${index}-${el.slice(0,3).toLowerCase()}`} value={el}>{el}</option>)
          }
        </select>
        <select>
          <option value="">Cualquier precio</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
        </select>
        <select>
          <option value="">Cualquier tamaño</option>
          <option value="small">Hotel pequeño</option>
          <option value="medium">Hotel mediano</option>
          <option value="large">Hotel grande</option>
        </select>
      </div>
    </div>
  )
}

const MainView = () => {
  return (
    <div className="section-cards">
      
        <Card />
      
    </div>
  )
}

const Card = () => {
  return (
    <div className="card">
      <img className="card__img" src="./images/alto-atacama.jpg"></img>
      <div className="card__data">
        <h2 className="heading-secondary">Alto Atacama</h2>
        <p className="paragraph-card">Descripción</p>
      </div>
      <button className="card__btn">Reservar</button>
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById("app"));