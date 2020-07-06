class App extends React.Component {

  constructor() {
    super();
    this.state = {
      start: {
        day: 0,
        date: 0,
        month: 0,
        year: 0,
        value: "0000-00-00"
      },
      end: {
        day: 0,
        date: 0,
        month: 0,
        year: 0,
        value: "0000-00-00"
      }
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    this.initStateStart();
  }

  initStateStart() {
    const now = new Date();
    const ms = Date.now() + 86400000*7;
    const tomorrow = new Date(ms);
    
    this.setState(
      {
        start: {
          day: now.getDay(),
          date: now.getDate(),
          month: now.getMonth(),
          year: now.getFullYear(),
          value: now.toISOString().slice(0,10)
        },
        end: {
          day: tomorrow.getDay(),
          date: tomorrow.getDate(),
          month: tomorrow.getMonth(),
          year: tomorrow.getFullYear(),
          value: tomorrow.toISOString().slice(0,10)
        }
      } 
    )
  }

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
      this.initStateStart();
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header start={this.state.start} end={this.state.end}/>
        <main>
          <FiltersMenu onDateChange={this.handleDateChange} start={this.state.start} end={this.state.end}/>
          <MainView>
            <Card />
          </MainView>
        </main>
      </React.Fragment>
    );
  }
}


const Header = ({start, end}) => {
  
  const getDay = (code) => {
    const days = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
    return days[code];
  }
  
  const getMonth = (code) => {
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return months[code];
  }

  const messageStart = <span>{getDay(start.day)}, {start.date} de {getMonth(start.month)} de {start.year}</span>
  const messageEnd = <span>{getDay(end.day)}, {end.date} de {getMonth(end.month)} de {end.year}</span>

  return (
    <header className="section-header">
      <div className="u-center">
        <h1 className="heading-primary">Hoteles</h1>
        <p className="paragraph-header">desde el {messageStart} hasta el {messageEnd}</p>
      </div>
    </header>
  )
}

const FiltersMenu = ({onDateChange, start, end}) => {

  return (
    <div className="section-filters">
      <div className="filters-container u-center">
        <input type="date" id="start" name="start" onChange={onDateChange} value={start.value}></input>
        <input type="date" id="end" name="end" onChange={onDateChange} value={end.value}></input>
        <select></select>
        <select></select>
        <select></select>
      </div>
    </div>
  )
}

const MainView = () => {
  return (
    <div className="section-cards">
      <div className="u-center">

      </div>
    </div>
  )
}

const Card = () => {
  return (
    <div className="card">

    </div>
  )
}



ReactDOM.render(<App />, document.getElementById("app"));