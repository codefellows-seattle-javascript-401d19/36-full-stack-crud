import './_expense-form.scss';
import React from 'react';

let emptyState = {
	description: '',
	price: 0,
};

class ExpenseForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.expense || emptyState;

		let memberFunctions = Object.getOwnPropertyNames(ExpenseForm.prototype);
		for (let functionName of memberFunctions) {
			if (functionName.startsWith('handle')) {
				this[functionName] = this[functionName].bind(this);
			}
		}
	}

	handleChange(event) {
		let { name, value } = event.target;
		this.setState({ [name]: value });
	}

	handleSubmit(event) {
		event.preventDefault();
		let categoryID = this.props.category ? this.props.category.id : this.props.expense.categoryID;
		this.props.onComplete({
			...this.state,
			categoryID,
		});
		this.setState(emptyState);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.expense)
			this.setState(nextProps.expense);
	}

	render() {
		let buttonText = this.props.expense ? 'Update Expense' : 'Create Expense';

		return (
			<form
				onSubmit={this.handleSubmit}
				className='expense-form'>

				<textarea
					type='text'
					name='description'
					placeholder='description'
					value={this.state.description}
					onChange={this.handleChange}
				/>

				<input
					type='number'
					name='price'
					placeholder='price'
					value={this.state.price}
					onChange={this.handleChange}
				/>

				<button type='submit'> {buttonText} </button>
			</form>
		);
	}
}

export default ExpenseForm;