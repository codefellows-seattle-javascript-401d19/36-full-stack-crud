import uuidv1 from 'uuid/v1';

export const createAction = ({name, price, categoryID}) => ({
  type: 'WIZARD_CREATE',
  payload: {
    name,
    price,
    categoryID,
    id: uuidv1(),
    timestamp: new Date(),
  },
});

export const updateAction = (wizard) => ({
  type: 'WIZARD_UPDATE',
  payload: wizard,
});

export const removeAction = (wizard) => ({
  type: 'WIZARD_DELETE',
  payload: wizard,
});