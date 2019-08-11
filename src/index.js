import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import createHistory from 'history/createBrowserHistory'
import createStore from './Store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import Loading from 'components/Loading'

if (module.hot) {
    module.hot.accept()
}

const history = createHistory()
const { persistor, store } = createStore(history)

ReactDOM.render((
    <Provider store={store}>
        <PersistGate 
            loading={<Loading />}
            persistor={persistor}
        >
            <App history={history} />
        </PersistGate>
    </Provider>
), document.getElementById('root'))
