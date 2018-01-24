import uuid from 'uuid';

export const createAction = ({name, content, categoryID}) => ({
  type: 'EXPENSE_CREATE',
  payload : {
    name,
    content,
    categoryID,
    id: uuid.v1(),
  },
});

export const updateAction = (expense) => ({
  type : 'EXPENSE_UPDATE',
  payload : expense,
});

export const removeAction = (expense) => ({
  type : 'EXPENSE_REMOVE',
  payload : expense,
});
