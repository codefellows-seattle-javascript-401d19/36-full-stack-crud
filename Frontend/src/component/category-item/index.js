import './_category-item.scss'
import React from 'react';
import {connect} from 'react-redux';
import ExpenseItem from '../expense-item';
import CategoryForm from '../category-form';
import ExpenseForm from '../expense-form';

import * as expenseActions from '../../action/expense';
import * as categoryActions from '../../action/category';

class CategoryItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {editing: false};

		let memberFunctions = Object.getOwnPropertyNames(CategoryItem.prototype);
		for (let functionName of memberFunctions) {
			if (functionName.startsWith('handle')) {
				this[functionName] = this[functionName].bind(this);
			}
		};
	}

		handleUpdate(category) {
			this.props.categoryUpdate(category);
			this.setState({editing: false});
		};

	render () {
		let {
			expenses,
			category,
			expenseCreate, 
			categoryUpdate, 
			categoryRemove
		} = this.props;

		let categoryExpenses = expenses[category.id];

			let editingJSX = <CategoryForm
				category={category}
				onComplete={this.handleUpdate}
			/>;
			let contentJSX = <div className='category-item'>
				<h2>{category.name}: ${category.budget}</h2>
				<button onClick={() => categoryRemove(category)}> Delete </button>
				</div>;
			let renderJSX = this.state.editing ? editingJSX : contentJSX;

		return (
			
			<div className='category'>
				{renderJSX}
				<ExpenseForm 
				category={category}
				onComplete={expenseCreate} />
				<main className='expense-container'>
				{
					categoryExpenses.map((expense, index) => 
				<ExpenseItem
				key={index}
				expense={expense} />)
				}
				</main>
			</div>
		);
	};
}

let mapStateToProps = (state) => ({
	expenses: state.expenses,
});

let mapDispatchToProps = (dispatch) => ({	
	expenseCreate: (data) => dispatch(expenseActions.createAction(data)),
	categoryUpdate: (data) => dispatch(categoryActions.updateAction(data)),
	categoryRemove: (data) => dispatch(categoryActions.removeAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);