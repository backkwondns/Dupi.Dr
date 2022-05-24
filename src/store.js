import { createStore, applyMiddleware } from 'redux'
import rootReducers from './redux/reducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = [thunk]

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middleware)))

// const store = createStore(
//   rootReducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// )

export default store
