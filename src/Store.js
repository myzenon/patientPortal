import { createStore, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
// import storage from 'redux-persist/es/storage'
import session from 'redux-persist/lib/storage/session'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import reducers from 'redux/reducers'

export default (history) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const store = createStore (
        persistCombineReducers(
            {
                key: 'root',
                storage: session,
                blacklist: ['apiGateway', 'loading', 'page', 'patient', 'cmr', 'router']
            },
            {
                ...reducers,
                router: routerReducer
            }
        ),
        composeEnhancers (
            applyMiddleware(
                routerMiddleware(history),
                thunk,
                promise
            )
        )
    )
    const persistor = persistStore(store)
    return { persistor, store }
}
