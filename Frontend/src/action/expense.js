import uuid from 'uuid';
import superagent from 'superagent';

export const createAction = ({ description, price, categoryID }) => ({
	type: 'EXPENSE_CREATE',
	payload: {
		description,
		price,
		categoryID,
		timestamp: new Date(),
	}
});

export const updateAction = (expense) => ({
	type: 'EXPENSE_UPDATE',
	payload: expense,
});

export const removeAction = (expense) => ({
	type: 'EXPENSE_REMOVE',
	payload: expense,
});

export const getExpenses = () => (dispatch) => {
	return superagent.get('http://localhost:7000/api/expenses')
		.then((response) => {
			let data = response.body
			console.log('Here\'s teh response', data);
			data.map(data => dispatch(createAction({ name: data.description, budget: data.price, category: data.categoryID}))
			)
		})
		.catch(error);
}

export const postExpenses = (data) => (dispatch) => {
	return superagent.post('http://localhost:7000/api/expenses')
		.send({
			description: data.description,
			price: data.price,
			category: data.catgoryID,
		})
		.then((response) => {
			if (data) {
				console.log('Data!!!', data);
				let data = response.body
				dispatch(createAction({ description: data.name, price: data.budget, category: data.categoryID }))
			} else {
				console.log('Nothing posted.');
			}
		})
};

export const deleteExpenses = () => (dispatch) => {
	return superagent.delete('http://localhost:7000/api/expenses')
		.then((response) => {
			let data = response.body
			dispatch(removeAction({}))
		});
};
