import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import * as categoryAction from '../action/category';
import * as expenseAction from '../action/expense';

describe('action-creators test', () => {
  describe('category.js action creators', () => {
    describe('createAction({<name>, <budget>})', () => {
      test('should return an object with name and budget', () => {
        const name = 'Test';
        const budget = '100';
        const createAction = categoryAction.createAction({ name, budget });

        expect(createAction.payload).toBeTruthy();
        expect(createAction.type).toEqual('CATEGORY_CREATE');
        expect(createAction.payload.name).toEqual(name);
        expect(createAction.payload.budget).toEqual('100');
        expect(createAction.payload.uuid).toBeTruthy();
        expect(createAction.payload.timestamp).toBeTruthy();
      });
    });

    describe('updateAction(<category>)', () => {
      test('should take a category object and return it', () => {
        const category = {
          name: 'Test',
          budget: '100',
          uuid: '123',
          timestamp: new Date(),
        };

        const updateAction = categoryAction.updateAction(category);

        expect(updateAction)
          .toEqual({'payload': category, type: 'CATEGORY_UPDATE'});
      });
    });

    describe('removeAction(<category>)', () => {
      test('should take a category object and return it', () => {
        const category = {
          name: 'Test',
          budget: '100',
          uuid: '123',
          timestamp: new Date(),
        };

        const removeAction = categoryAction.removeAction(category);

        expect(removeAction)
          .toEqual({'payload': category, type: 'CATEGORY_DESTROY'});
      });
    });
  });

  describe('expense.js action creators', () => {
    describe('createAction(<name>, <price>, <categoryId>)', () => {
      test('should return an object with name, price and categoryId', () => {
        const name = 'Test';
        const price = 100;
        const categoryId = '123';

        const createAction = expenseAction.createAction({ name, price, categoryId });

        expect(createAction.payload).toBeTruthy();
        expect(createAction.type).toEqual('EXPENSE_CREATE');
        expect(createAction.payload.name).toEqual(name);
        expect(createAction.payload.price).toEqual(price);
        expect(createAction.payload.categoryId).toEqual(categoryId);
        expect(createAction.payload.uuid).toBeTruthy();
        expect(createAction.payload.timestamp).toBeTruthy();
      });
    });

    describe('updateAction(<expense>)', () => {
      test('should take an expense and return it', () => {
        const expense = {
          name: 'Test',
          price: '100',
          categoryId: '123',
        };

        const updateAction = expenseAction.updateAction(expense);

        expect(updateAction)
          .toEqual({ 'payload': expense, 'type': 'EXPENSE_UPDATE'});
      });
    });

    describe('removeAction(<expense>)', () => {
      test('should take an expense and return it', () => {
        const expense = {
          name: 'Test',
          price: '100',
          categoryId: '123',
        };

        const removeAction = expenseAction.removeAction(expense);

        expect(removeAction)
          .toEqual({ 'payload': expense, 'type': 'EXPENSE_DELETE'});
      });
    });
  });
});
