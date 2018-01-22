import './_expense-item.scss';
import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from '../expense-form';
import * as expense from '../../action/expense';

class ExpenseItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {editing: false};


		let memberFunctions = Object.getOwnPropertyNames(ExpenseItem.prototype);
		for (let functionName of memberFunctions) {
			if (functionName.startsWith('handle')) {
				this[functionName] = this[functionName].bind(this);
			}
		}
	}

	handleUpdate(expense) {
		console.log(expense);
		this.props.expenseUpdate(expense);
		this.setState({editing: false});
	}

	render() {
		let { 
			expense,
			expenseUpdate, 
			expenseRemove 
		} = this.props;

		let contentJSX = <p> {expense.description}: ${expense.price}</p>
		let editingJSX = <ExpenseForm expense={expense} onComplete={this.handleUpdate} />
		let renderJSX = this.state.editing ? editingJSX : contentJSX;

		return (
			<div className='expense'>
				<button className='delete' onClick={() => expenseRemove(expense)}> X </button>
			<main onDoubleClick={() => this.setState({editing: true})}>{renderJSX}
			</main>
			</div>
		);
	};
} 	

let mapDispatchToProps = (dispatch) => {
	return {
		expenseUpdate: (data) => dispatch(expense.updateAction(data)),
		expenseRemove: (data) => dispatch(expense.removeAction(data)),
	}
};

export default connect(null, mapDispatchToProps)(ExpenseItem);
