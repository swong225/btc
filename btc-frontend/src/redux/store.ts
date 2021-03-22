import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from  './rootReducer';

export default(initialState: any) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, logger)
  )
}
