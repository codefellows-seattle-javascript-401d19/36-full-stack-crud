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
			let categories = response.body
			categories.forEach(category => {
				dispatch(createAction({
				name: category.name, 
				budget: category.budget, 
				id: category._id
			}));
		});
		})
		.catch(error => console.log(error));
};

export const postCategories = (category) => (dispatch) => {
	return superagent.post('http://localhost:7000/api/categories')
		.send({
			name: category.name,
			budget: category.budget,
		})
		.then((response) => {
			let categories = response.body
			dispatch(createAction({
				name: categories.name, 
				budget: categories.budget,
				id: categories._id}))
		})
		.catch(error => console.log(error));
	};

export const updateCategories = (category) => (dispatch) => {
	return superagent.put(`http://localhost:7000/api/categories/${category.id}`)
		.send({
			name: category.name,
			budget: category.budget,
		})
		.then((response) => {
			let category = response.body
			dispatch(updateAction({
				name: category.name,
				budget: category.budget,
				id: category._id
			}));
		})
		.catch(error => console.log(error));
};

export const deleteCategories = (category) => (dispatch) => {
	return superagent.delete(`http://localhost:7000/api/categories/${category.id}`)
		.send({
			name: category.name,
			budget: category.budget,
		})
		.then((response) => {
			let category = response.body
			dispatch(removeAction(category));
		})
		.catch(error => console.log(error));
};
