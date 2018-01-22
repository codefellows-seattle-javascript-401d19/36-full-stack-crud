export const loadState = () => {
  try {
    const serializedCategory = sessionStorage.getItem('category');
    const serializedExpense = sessionStorage.getItem('expense');
    const category = JSON.parse(serializedCategory);
    const expense = JSON.parse(serializedExpense);

    const returnState = { category, expense };
    console.log(returnState);

    if (returnState.category === null && returnState.expense === null) {
      return undefined;
    }
    
    return returnState;
  } catch(error) {
    return undefined;
  }
};
