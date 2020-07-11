
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      start: {
        active: false,
        day: 0,
        date: 0,
        month: 0,
        year: 0,
        value: "1970-00-00"
      },
      end: {
        active: false,
        day: 0,
        date: 0,
        month: 0,
        year: 0,
        value: "1970-00-00"
      },
      country: "",
      price: 0,
      size: ""
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
  }

  handleDateChange(e) {
    if (e.target.value) {
      const date = e.target.valueAsDate;
      console.log('state', e.target.valueAsDate)
      this.setState({[e.target.name]: {
        active: true,
        day: date.getUTCDay(),
        date: date.getUTCDate(),
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
        value: e.target.value
        }
      }/* , () => console.log("input date", this.state.start) */)
    } else {
      this.setState({[e.target.name]: {
        active: false,
        day: 0,
        date: 0,
        month: 0,
        year: 0,
        value: 0
        }
      })
    }

    
  }

  handleCountryChange(e) {
    this.setState( { country: e.target.value } )
  }

  handlePriceChange(e) {
    this.setState( { price: Number(e.target.value) } )
  }

  handleSizeChange(e) {
    this.setState( { size: e.target.value } )
  }

  componentDidMount() {
    const dateTimeToZero = (ms) => {
      const workingDate = new Date(ms);
      return workingDate.setHours(0,0,0,0)
    }
    const today = new Date();
    // console.log(today);
    // console.log(new Date(dateTimeToZero(today)))
  }

  render() {
    return (
      <React.Fragment>
        <Header 
          checkIn={this.state.start} 
          checkOut={this.state.end}
        />
        
        <main>
          <Filters 
            onDateChange={this.handleDateChange} 
            onCountryChange={this.handleCountryChange} 
            onPriceChange={this.handlePriceChange} 
            onSizeChange={this.handleSizeChange} 
            activeCheckIn={this.state.start.active} 
            limitCheckOut={this.state.start.value}
          />

          <Main 
            checkIn={this.state.start} 
            checkOut={this.state.end} 
            country={this.state.country} 
            price={this.state.price} 
            size={this.state.size} 
          />
        </main>
      </React.Fragment>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("app"));