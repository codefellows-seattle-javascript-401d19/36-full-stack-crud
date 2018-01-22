
const uuidv1 = require('uuid/v1');

export const createAction = ({name, price, categoryID}) => ({
  type : 'EXPENSE_CREATE',
  payload : {
    name,
    price,
    categoryID,
    id: uuidv1(),
    timeStamp: new Date(), 
  },
});

// update 
export const updateAction = (expense) => ({
  type : 'EXPENSE_UPDATE',
  payload : expense,
});

// remove
export const removeAction = (expense) => ({
  type : 'EXPENSE_DELETE',
  payload : expense,
});