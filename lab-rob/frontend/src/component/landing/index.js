import './landing.scss';

import React from 'react';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div className='landing'>
        <h2>{this.state.date.toLocaleTimeString()}</h2>
        <p><em>Time</em> to track your budget!</p>
      </div>
    );
  }
}

export default Landing;