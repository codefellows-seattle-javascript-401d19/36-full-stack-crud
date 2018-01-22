import React from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Dashboard from '../dashboard/index';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0" 
        />
        <BrowserRouter>
          <div>
            <nav>
              <Link to='/'> Home </Link>
            </nav>
            <Route exact path='/' component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;