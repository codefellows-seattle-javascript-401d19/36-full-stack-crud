import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Landing from '../landing';
import './app.scss'

//TODO: add something here to check for localstorage?

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <div className='center'>
            <h1> Welcome to the Basic Budget & Expense Tracker </h1>
            <h2> Don't leave this page or you'll lose everything!</h2>
            <Route exact path ='/' component={Landing} />
            <footer> &copy; MIT Seth Donohue 
            <p> <a href="https://github.com/SethDonohue/31-34-budget-tracker/tree/seth-lab-32"> Github Repo</a> </p> </footer> 
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;