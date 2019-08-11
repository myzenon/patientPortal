import React, { Component } from 'react'
import Loading from 'components/Loading'
import { ConnectedRouter } from 'react-router-redux'
import Router from './Router'

import { connect } from 'react-redux'
import { authInited } from 'redux/auth/action'
import { push } from 'react-router-redux'
import { resetAuth } from 'redux/auth/action'

// import idle component from react-idle
// reference: https://reacttraining.com/react-idle/
import Idle from 'react-idle'

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css'
import 'themes/global.scss'

export class App extends Component {
    componentWillMount() {
        // when the app start then init the auth system.
        this.props.authInited()
    }
    signOut = async () => {
        // reset auth and move to login page
        await this.props.resetAuth()
        this.props.push('/login')
    }
    render() {
        // if api is not initied or no auth in the system.
        if (!this.props.page.apiInited && JSON.stringify(this.props.auth) !== '{}') {
            return (<Loading />)
        }
        return (
            // Using react idle
            <Idle
                // if mouse / keyboard not active within 15 mins
                timeout={900000}
                // on change will call
                onChange={({idle}) => {
                    // when idle and auth is avaliable in the system
                    if (idle && JSON.stringify(this.props.auth) !== '{}') {
                        // then call signout method
                        this.signOut()
                    }
                }}
                render={() => (
                    // render router
                    <ConnectedRouter history={this.props.history}>
                        <Router Loading={this.props.loading ? (<Loading />) : null} />
                    </ConnectedRouter>
                )}
            />
        )
    }
}

export default connect (
    ({
        loading,
        auth,
        page
    }) => ({
        loading,
        auth,
        page
    }),
    {
        authInited,
        push,
        resetAuth
    }
)(App)