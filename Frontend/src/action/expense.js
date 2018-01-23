import uuid from 'uuid';
import superagent from 'superagent';

export const createAction = ({ description, price, categoryID }) => ({
	type: 'EXPENSE_CREATE',
	payload: {
		description,
		price,
		categoryID,
		id: uuid.v1(),
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

export const postExpenses = () => (dispatch) => {
	return superagent.post('http://localhost:7000/api/expenses')
		.then((response) => {
			let count = response.body.count;
			let data = response.body.data;
			dispatch(createAction({ name: data }))
		});
};
