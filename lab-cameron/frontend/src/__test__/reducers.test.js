import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import categoryReducer from '../reducer/category';
import expenseReducer from '../reducer/expense';

describe('reducers tests', () => {
  describe('reducer/category.js', () => {
    describe('CATEGORY_CREATE', () => {
      test('should return an updated state with new category', () => {
        const state = [];
        const action = {
          type: 'CATEGORY_CREATE',
          payload: {
            name: 'Test',
            budget: '100',
            id: '123',
            timestamp: new Date(),
          },
        };

        const reduceCategory = categoryReducer(state, action);

        expect(reduceCategory).toEqual([action.payload]);
      });
    });

    describe('CATEGORY_UPDATE', () => {
      test('should return an existing state with an update cateogry', () => {
        const state = [];
        const createAction = {
          type: 'CATEGORY_CREATE',
          payload: {
            name: 'Test',
            budget: '100',
            id: '123',
            timestamp: new Date(),
          },
        };

        let updatedState = categoryReducer(state, createAction);

        const updateAction = {
          type: 'CATEGORY_UPDATE',
          payload: {
            name: 'New Test',
            budget: '200',
            id: '123',
            timestamp: new Date(),
          },
        };


        updatedState = categoryReducer(updatedState, updateAction);

        expect(updatedState).toEqual([updateAction.payload]);
      });
    });

    describe('CATEGORY_DESTORY', () => {
      test('should return an existing state with an update cateogry', () => {
        const state = [];
        const createAction = {
          type: 'CATEGORY_CREATE',
          payload: {
            name: 'Test',
            budget: '100',
            id: '123',
            timestamp: new Date(),
          },
        };

        let updatedState = categoryReducer(state, createAction);

        const updateAction = {
          type: 'CATEGORY_DESTROY',
          payload: {
            name: 'New Test',
            budget: '200',
            id: '123',
            timestamp: new Date(),
          },
        };


        updatedState = categoryReducer(updatedState, updateAction);

        expect(updatedState).toEqual([]);
      });
    });
  });

  describe('reducer/expense.js', () => {
    describe('CATEGORY_CREATE', () => {
      test('should create an empty expense array for the new category', () => {
        const state = [];
        const createAction = {
          type: 'CATEGORY_CREATE',
          payload: {
            name: 'New Test',
            budget: '200',
            id: '123',
            timestamp: new Date(),
          },
        };

        const updatedState = expenseReducer(state, createAction);
        expect(updatedState).toEqual({ '123': [] });
      });
    });

    describe('CATEGORY_DESTROY', () => {
      test('should remove the category and all expenses in array', () => {
        const state = [];
        const createAction = {
          type: 'CATEGORY_CREATE',
          payload: {
            name: 'Test',
            budget: '100',
            id: '123',
            timestamp: new Date(),
          },
        };

        let updatedState = expenseReducer(state, createAction);

        const removeAction = {
          type: 'CATEGORY_DESTROY',
          payload: {
            name: 'New Test',
            budget: '200',
            id: '123',
            timestamp: new Date(),
          },
        };

        updatedState = expenseReducer(updatedState, removeAction);

        expect(updatedState).toEqual({});
      });
    });

    describe('EXPENSE_CREATE', () => {
      test('should create a new expense in categoryId array', () => {
        const state = { '123': [] };
        const createAction = {
          type: 'EXPENSE_CREATE',
          payload: {
            name: 'Test',
            price: '100',
            categoryId: '123',
            id: '456',
            timestamp: new Date(),
          },
        };

        let updatedState = expenseReducer(state, createAction);

        expect(updatedState['123'][0].name).toEqual('Test');
        expect(updatedState['123'][0].price).toEqual('100');
        expect(updatedState['123'][0].categoryId).toEqual('123');
        expect(updatedState['123'][0].id).toEqual('456');
        expect(updatedState['123'][0].timestamp).toBeTruthy();
      });
    });

    describe('EXPENSE_UPDATE', () => {
      test('should update an existing expense array', () => {
        const state = { '123': [] };
        const createAction = {
          type: 'EXPENSE_CREATE',
          payload: {
            name: 'Test',
            price: '100',
            categoryId: '123',
            id: '456',
            timestamp: new Date(),
          },
        };

        let updatedState = expenseReducer(state, createAction);

        const updateAction = {
          type: 'EXPENSE_UPDATE',
          payload: {
            name: 'New Test',
            price: '200',
            categoryId: '123',
            id: '456',
            timestamp: new Date(),
          },
        };

        updatedState = expenseReducer(updatedState, updateAction);

        expect(updatedState['123'][0]).toEqual(updateAction.payload);
      });
    });

    describe('EXPENSE_DELETE', () => {
      test('should remove an existing expense array', () => {
        const state = { '123': [] };
        const createAction = {
          type: 'EXPENSE_CREATE',
          payload: {
            name: 'Test',
            price: '100',
            categoryId: '123',
            id: '456',
            timestamp: new Date(),
          },
        };

        let updatedState = expenseReducer(state, createAction);

        const deleteAction = {
          type: 'EXPENSE_DELETE',
          payload: {
            name: 'Test',
            price: '100',
            categoryId: '123',
            id: '456',
            timestamp: new Date(),
          },
        };

        updatedState = expenseReducer(updatedState, deleteAction);

        expect(updatedState['123']).toEqual([]);
      });
    });
  });
});
