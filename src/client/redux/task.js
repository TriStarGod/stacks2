import axios from 'axios';
// Consistent names
const TYPE_TASK_ADD = 'TASK_ADD';
const TYPE_TASK_UPDATE = 'TASK_UPDATE';
// Actions
// export const TASK_ADD = task => ({ type: TYPE_TASK_ADD, task });
// export function TASK_ADD(task) {
//   return (dispatch) => {
//     console.log(task);
//     return axios.post('/api/task', task);
//   };
// }
export const TASK_ADD = task => dispatch => axios.post('/api/task/add', task);
export const TASK_UPDATE = task => ({ type: TYPE_TASK_UPDATE, task });
// Reducer
export function TASK_REDUCER(state = [], action = {}) {
  switch (action.type) {
    default: return state;
  }
}
