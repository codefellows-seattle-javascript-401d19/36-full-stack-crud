import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "../dashboard";

class App extends React.Component {
  render(){
    return (
      <div className="app">
        <h2>Budget Tracker</h2>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;