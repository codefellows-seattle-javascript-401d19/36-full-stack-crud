import uuid from 'uuid';
import superagent from 'superagent';

export const createAction = ({name, budget, id}) => ({
	type: 'CATEGORY_CREATE',
	payload: {
		name,
		budget,
		id,
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

export const getCategories = () => (dispatch) => {
	return superagent.get('http://localhost:7000/api/categories')
		.then((response) => {
			let data = response.body
			console.log('data', data);
			data.map(data => dispatch(createAction({name: data.name, budget: data.budget, id: data._id}))
		)
		});
}

export const postCategories = (data) => (dispatch) => {
	return superagent.post('http://localhost:7000/api/categories')
		.send({
			name: data.name,
			budget: data.budget,
		})
		.then((response) => {
			if (data) {
			let data = response.body
			dispatch(createAction({name: data.name, budget: data.budget}))
			} else {
				console.log('Nothing posted.');
			}
		})
		.catch(error);
	};

// export const deleteCategories = () => (dispatch) => {
// 	return superagent.delete('http://localhost:7000/api/categories')
// 		.then((response) => {
// 			dispatch(createAction({}))
// 		});
// };