import uuidv1 from 'uuid/v1'

export const creatAction = ({name, price, categoryID}) => ({
  type: 'EXPENSE_CREATE',
  payload: {
    id: uuidv1(),
    categoryID,
    timestamp: new Date(),
    name,
    price,
  }
})

export const updateAction = (expense) => ({
  type : 'EXPENSE_UPDATE',
  payload : expense,
})

export const removeAction = (expense) => ({
  type : 'EXPENSE_REMOVE',
  payload : expense,
})