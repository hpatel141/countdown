import React from 'react';
import './Countdown.css';

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    }
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date.dateMismatch ? (this.setState(date) && this.stop()) : this.setState(date);
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;
    if(isNaN(diff)){
      return {dateMismatch:true}
    }
    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  render() {
    const countDown = this.state;

    return (
      <div className='Countdown'>
      {countDown.dateMismatch && <div className="Countdown-invalid">Invalid Date</div>}
      {!countDown.dateMismatch && (<>
      <div className="countdown-col">
          <div className='time'>{this.addLeadingZeros(countDown.days)}</div>
          <div className='units'>{countDown.days === 1 ? 'Day' : 'Days'}</div>
        </div>

        <div className="countdown-col">
          <div className='time'>{this.addLeadingZeros(countDown.hours)}</div>
          <div className='units'>Hours</div>
        </div>

        <div className="countdown-col">
          <div className='time'>{this.addLeadingZeros(countDown.min)}</div>
          <div className='units'>Min</div>
        </div>

        <div className="countdown-col">
          <div className='time'>{this.addLeadingZeros(countDown.sec)}</div>
          <div className='units'>Sec</div>
        </div>
        </>)
      
  }
      </div>
    );
  }
}

export default Countdown;