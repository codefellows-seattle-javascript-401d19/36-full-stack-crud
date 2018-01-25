import './_app.scss';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Dashboard from '../dashboard';

class App extends React.Component {
	render () {
		return (
			<div className='app'>
				<BrowserRouter>
					<div>
						<h1>Rad Expense Tracker</h1>
						<Route exact path='/' component={Dashboard} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;