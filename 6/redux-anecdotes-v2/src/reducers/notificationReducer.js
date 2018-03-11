const initialState = { msg: 'initial state' };

const reducer = (store = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      return {
        ...store,
        msg: action.msg,
      };

    case 'DELETE_NOTIFICATION':
      return {
        ...store,
        msg: '',
      };

    default:
      return store;
  }
};

export const createNotification = msg => ({
  type: 'CREATE_NOTIFICATION',
  msg,
});

export const deleteNotification = () => ({
  type: 'DELETE_NOTIFICATION',
});

export default reducer;
