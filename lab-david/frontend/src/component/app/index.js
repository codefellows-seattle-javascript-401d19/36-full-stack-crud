
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from '../dashboard';

class App extends React.Component{
  render(){
    return(
      <div className='app top-banner'> 
        <BrowserRouter>
          <div>
            
            <h1> Budget Tracking </h1>
            <Route exact path='/' component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );

  }
}

export default App;