import React, { Component } from 'react'
import { Button } from 'reactstrap'
// import Frame from 'react-frame-component'
import style from './style.scss'

const policies = {
    nopp: require('assets/policy/nopp.html'),
    eula: require('assets/policy/eula.html'),
    terms: require('assets/policy/terms.html'),
    access: require('assets/policy/access.html')
}

export default class Policies extends Component {
    static defaultProps = {
        popup: true,
        user: 'patient',
        onDone: () => {}
    }
    state = {
        tab: 1
    }
    // switch tab method
    changeTab = (tab) => {
        this.setState({
            tab
        })
    }
    // return policy follows the tab number.
    getPolicy = (tab) => {
        switch (tab) {
            case 1 :
                return policies.nopp
            case 2 :
                return policies.eula
            case 3 :
                return policies.terms
            case 4 :
                return policies.access
        }
    }
    render() {
        return (
            <div className={this.props.popup ? style.wrapper : style.wrapperNoPopup}>
                <div className={style.policyWrapper}>
                    <div className={style.policyContent}>
                        <div className={style.tabWrapper}>
                            <div
                                className={this.state.tab === 1 ? style.tabActive : style.tab}
                                onClick={() => this.changeTab(1)}
                            >
                                <div className={style.div_hover}>Notice of Privacy Practices</div>
                            </div>
                            <div
                                className={this.state.tab === 2 ? style.tabActive : style.tab}
                                onClick={() => this.changeTab(2)}
                            >
                                <div className={style.div_hover}>End User License Agreement</div>
                            </div>
                            <div
                                className={this.state.tab === 3 ? style.tabActive : style.tab}
                                onClick={() => this.changeTab(3)}
                            >
                                <div className={style.div_hover}>Terms and Conditions</div>
                            </div>
                            {this.props.user === 'caregiver' ? (
                                <div
                                    className={this.state.tab === 4 ? style.tabActive : style.tab}
                                    onClick={() => this.changeTab(4)}
                                >
                                    Access to Another Adult's Online Medical Record
                                </div>
                            ) : null}
                            <div className={style.tabSpace} />
                        </div>
                        <div className={style.contentWrapper}>
                            <div className={style.scrollDiv}>
                                <span dangerouslySetInnerHTML={{__html: this.getPolicy(this.state.tab) }} />
                            </div>
                        </div>
                    </div>
                </div>
                { this.props.popup ? (
                    <div className={style.buttonWrapper}> 
                        <Button
                            className={style.button} className={[style.btn]}
                            onClick={() => {
                                this.props.onDone()
                            }}
                        >
                            DONE
                        </Button>
                    </div>
                ) : null }
            </div>
        )
    }
}
