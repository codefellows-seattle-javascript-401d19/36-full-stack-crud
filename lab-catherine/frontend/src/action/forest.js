import uuidv1 from 'uuid/v1';

export const createAction = ({name, population, continentID}) => ({
  type: 'FOREST_CREATE',
  payload: {
    name,
    population,
    continentID,
    id: uuidv1(),
    timestamp: new Date(),
  },
});

export const updateAction = (forest) => ({
  type: 'FOREST_UPDATE',
  payload: forest,
});

export const removeAction = (forest) => ({
  type: 'FOREST_DELETE',
  payload: forest,
});