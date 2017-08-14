import shortid from 'shortid';

const TYPE_FLASHMESSAGE_ADD = 'FLASHMESSAGE_ADD';
const TYPE_FLASHMESSAGE_DELETE = 'FLASHMESSAGE_DELETE';

export const FLASHMESSAGE_ADD = message => ({ type: TYPE_FLASHMESSAGE_ADD, message });
export const FLASHMESSAGE_DELETE = id => ({ type: TYPE_FLASHMESSAGE_DELETE, id });

export function FLASHMESSAGE_REDUCER(state = [], action = {}) {
  switch (action.type) {
    case TYPE_FLASHMESSAGE_ADD:
      return [...state, {
        id: shortid.generate,
        type: action.message.type,
        text: action.message.text,
      }];
    case TYPE_FLASHMESSAGE_DELETE:
      return state.filter(m => m.id !== action.id);
    default: return state;
  }
}
