import shortid from 'shortid';

const TYPE_FLASHMESSAGE_ADD = 'FLASHMESSAGE_ADD';

export const FLASHMESSAGE_ADD = message => ({ type: TYPE_FLASHMESSAGE_ADD, message });

export function FLASHMESSAGE_REDUCER(state = [], action = {}) {
  switch (action.type) {
    case FLASHMESSAGE_ADD:
      return [...state, {
        id: shortid.generate,
        type: action.message.type,
        text: action.message.text,
      }];
    default: return state;
  }
}
