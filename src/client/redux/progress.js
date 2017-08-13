import { bindActionCreators } from 'redux';
// {
//   type: 'A_UNQIUE_NAME_ALWAYS_IN_CAPS_WITH_UNDERSCORES',
//   data: 'some data' // can be string, array, etc
// }

// export const incrementProgress = () => {
//   return {
//     type: 'INCREMENT_PROGRESS',
//   };
// };

// wrap in it in parenthesis ie () or it javascript will think you are opening
// a function and not setting a return value
export const PROGRESS_INCREMENT = () => ({ type: 'PROGRESS_INCREMENT' });
// export const incrementProgress = () => (dispatch) => ({ type: 'PROGRESS_INCREMENT' });

// // examples of implicit returns
// const returnTrue = () => true;
// const sayHi = (firstName, lastName) => `Hi, ${firstName} ${lastName}!`;
// // only need to wrap it up in parenthesis if it returns more than one item
// // myArray is only returning length
// const showLength = myArray => myArray.length;

export const PROGRESS_DECREMENT = () => ({ type: 'PROGRESS_DECREMENT' });

export const PROGRESS_REDUCER = (state = 0, action) => {
  switch (action.type) {
    case 'PROGRESS_INCREMENT': {
      return state + 1;
    }
    case 'PROGRESS_DECREMENT': {
      return Math.max(state - 1, 0); // Don't go lower than 0
    }
    default: {
      return state;
    }
  }
};

export const mapDispatchToProps = dispatch => (bindActionCreators({
  PROGRESS_INCREMENT,
  PROGRESS_DECREMENT,
}, dispatch));
