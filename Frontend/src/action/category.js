import uuid from 'uuid';

export const createAction = ({name, budget}) => ({
	type: 'CATEGORY_CREATE',
	payload: {
		name,
		budget,
		id: uuid.v1(),
		timestamp: new Date(),
	}
});

export const updateAction = (category) => ({
	type: 'CATEGORY_UPDATE',
	payload: category,
});

export const removeAction = (category) => ({
	type: 'CATEGORY_REMOVE',
	payload: category,
});

export const getExpenses = () => (dispatch) => {
	return superagent.get('http://localhost:7000/api/expenses')
	.then((response) => {
		let count = response.body.count;
		let data = response.body.data;
		dispatch(createAction({name: 'Hooray!!!'}))
	})
}