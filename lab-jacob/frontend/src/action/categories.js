import uuidv1 from 'uuid/v1'

export const createAction = ({name, budget}) => ({
  type: 'CATEGORY_CREATE',
  payload: {
    name,
    budget,
    id: uuidv1(),
    createdOn: new Date(),
  }
})

export const updateAction = (category) => ({
  type : 'CATEGORY_UPDATE',
  payload : category,
})

export const removeAction = (category) => ({
  type : 'CATEGORY_REMOVE',
  payload : category,
})