import uuid from 'uuid/v1';
import superagent from 'superagent';
import {reloadAction as reloadExpenseAction} from './expense';

const apiUrl = 'http://localhost:3000';

export const createAction = ({name, budget}) => ({
  type: 'CATEGORY_CREATE',
  payload: {
    name,
    budget,
    timestamp: new Date(),
    id: uuid(),
  },
});

export const updateAction = category => ({
  type: 'CATEGORY_UPDATE',
  payload: category,
});

export const destroyAction = category => ({
  type: 'CATEGORY_DESTROY',
  payload: category,
});

export const clearAction = () => ({
  type: 'CATEGORY_CLEAR',
});

export const reloadCategoryAction = categories => ({
  type: 'CATEGORY_RELOAD',
  payload: categories,
});

export const reloadFromDatabaseAction = () => (store) => {
  return superagent.get(`${apiUrl}/api/categories?populate=true`)
    .then(response => {
      let {categories} = response.body;

      let fetchedCategories = categories.map(category => ({
        name: category.name,
        budget: category.budget,
        timestamp: category.timestamp,
        id: category._id.toString(),
      }));

      let fetchedExpenses = {};
      categories.forEach(category => {
        let expenses = category.expenses.map(expense => ({
          name: expense.name,
          price: expense.price,
          categoryId: category._id.toString(),
          timestamp: expense.timestamp,
          id: expense._id.toString(),
        }));

        fetchedExpenses[category._id.toString()] = expenses;
      });

      // You must reload expenses before categories otherwise an error is thrown
      store.dispatch(reloadExpenseAction(fetchedExpenses));
      store.dispatch(reloadCategoryAction(fetchedCategories));
    });
};