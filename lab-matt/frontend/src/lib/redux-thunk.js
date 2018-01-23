export default store => action => next => {
    if (typeof action === 'function') {
        return action(store);
    } else {
        return next(action);
    }
}