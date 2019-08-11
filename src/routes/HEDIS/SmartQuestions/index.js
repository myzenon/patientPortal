import React, { Component } from 'react'
import { Container, Button, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import InputText from 'components/InputText'
import ProgressBarPatient from 'components/ProgressBarPatient'

import Select from 'components/Select'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { callAPIGateway } from 'redux/apiGateway/action'
import { setCMR } from 'redux/cmr/action'
import { savePageData } from 'redux/page/action'
import style from './style.scss'
import mockTestObj from '../../../config/test/mockTestObj';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-121783543-1');

const painScale = [
    { key: '0', value: '0' },
    { key: '1', value: '1' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5', value: '5' },
    { key: '6', value: '6' },
    { key: '7', value: '7' },
    { key: '8', value: '8' },
    { key: '9', value: '9' },
    { key: '10', value: '10' },

]


export class SmartQuestions extends Component {
    state = {
        smartQuestionsReview: {
            items: []
        }
    }

    getInitialInfo = (props) => {
        this.cmr = props.cmr
        const page = props.match.params.page
        const pageType = props.match.params.type
        let AllSmartQuestions
        let displayName = null;
        if (pageType === 'hedis') {
            AllSmartQuestions = this.cmr.smartQuestions
        }
        else {
            const medId = pageType.split('_')[1]
            AllSmartQuestions = this.cmr.medications.find(medication => medication.id === medId).smartQuestions
            displayName = this.cmr.medications.find(medication => medication.id === medId).display;
        }

        if (page <= AllSmartQuestions.length) {
            //sets the question body for putting via api
            const questionBody = AllSmartQuestions[page - 1].items.reduce((obj, item) => {
                const name = "smartQuestion_" + item.id
                obj[name] = {}
                return obj
            }, {})
            let isOtherQuestion
            //checks if there are any other question
            if (page < AllSmartQuestions.length) {
                isOtherQuestion = true
            }
            else {
                isOtherQuestion = false
            }
            //sets the initial value of the answer of every question items
            this.setInitialAnswer(AllSmartQuestions[page - 1].items)
            this.setState({ smartQuestionsReview: AllSmartQuestions[page - 1], questionBody, isOtherQuestion, displayName })
        }
        else {
            props.push('/prepare-Chapter4')
        }
    }
    // Since the next page is a same page, so the component haven't re-mounted again.
    // But it will receive instead. Ther    efore, we neet to re-call component will mount again whenever new props will receive
    componentWillReceiveProps(props) {
        this.getInitialInfo(props)
        window.scrollTo(0,0);
    }

    componentWillMount = () => {
        //set the state of the progress ProgressBarPatient
        if(this.props.match.params.type === 'hedis'){
          this.props.savePageData({
              ShowProgressStep: 4
            })
        } else {
          this.props.savePageData({
              ShowProgressStep: 2
            })
        }
        this.getInitialInfo(this.props);
        const page = window.location.pathname + window.location.search;
        if (process.env.NODE_ENV == 'production'){
            ReactGA.pageview(page);
        }
    }

    //handle change for any input
    handleOnChange = (event) => {
        const { name, value } = event.target
        const state = {}
        state[name] = value
        this.setState(state)
    }
    //handle change for any input
    handleOnclickYN = (id, val, event) => {
        const state = {}
        state[id] = val
        this.setState(state)

    }

     //handle change for any input
     handleOnCheckboxChange = (event) => {
        const { name, value } = event.target
        const state = {}
        var newVal;
        if (event.target.checked) {
            newVal=value;
        }
        else{
            newVal=-1;
        }
        state[name] = newVal
        this.setState(state)

    }

setInitialAnswer = (items) => {
        const state = {}
        items.map((item) => {
            if (item.template === 'radioButtonsChioce') {
                state['smartQuestion_' + item.id + '_value'] = this.cmr['smartQuestion_' + item.id] ? this.cmr['smartQuestion_' + item.id].value : ''
            }

            if (item.template === 'checkboxes') {
             if (typeof(this.cmr['smartQuestion_' + item.id]) != "undefined") {
               let ans= this.cmr['smartQuestion_' + item.id].answer;
                if (typeof(ans) != "undefined") {
                  //
                  ans.map((a) => {
                    state['smartQuestion_' + item.id + '_answer_'+ a]= a;
                  })
                  // if(ans.indexOf(',') != -1){
                  //   let vals = ans.split(",");
                  //   for (var i = 0; i < vals.length; i++) {
                  //      state['smartQuestion_' + item.id + '_answer_'+vals[i]]= parseInt(vals[i]);
                  //   }
                  // } else{
                  //   state['smartQuestion_' + item.id + '_answer_'+ans]= parseInt(ans);
                  // }
                }
              }
            }
            else{
                state['smartQuestion_' + item.id + '_answer'] =  this.cmr['smartQuestion_' + item.id] ? this.cmr['smartQuestion_' + item.id].answer : ''
            }
          })
        this.setState(state)
    }

    handleSubmit = async () => {
        const questionBody = this.state.questionBody
        const pageType = this.props.match.params.type
        let nextPage
        const newKeys = {}
        //each checbox for a question can have its own entry in state object.
        // so it will be cleaned here and makes a combined single entry

        Object.keys(this.state).forEach(answerkey => {
            if (answerkey.includes("_answer_")) {
                let n = answerkey.indexOf("_answer");
                let key = answerkey.substring(0,n+7);
                let value = this.state[answerkey];

                if (  newKeys[key] === undefined )
                    {
                        newKeys[key] = [value];
                    }else {
                        newKeys[key].push(value)
                    }
                delete this.state[answerkey];
            }
        })

        Object.keys(newKeys).forEach(answerkey => {
            this.state[answerkey]=newKeys[answerkey];
        })

        //loop for any key attribute in this.state
        Object.keys(this.state).forEach(answerkey => {
            //loop for any key in questionBody
            Object.keys(questionBody).forEach(questionBodyKey => {
                //checks if the key in this.state includes the key in questionBody key
                if (answerkey.includes(questionBodyKey)) {
                    //checks if the key in this.state is answer key or value key
                    if (answerkey.includes('_answer') && this.state[questionBodyKey + '_answer'] !== '') {
                        questionBody[questionBodyKey].answer = this.state[answerkey]
                    }
                    if (answerkey.includes('_value')){// && this.state[questionBodyKey + '_answer'] === '1') {
                        //if it is an open choice question it will nhave a value
                        if (this.state[questionBodyKey + '_value']) {
                            questionBody[questionBodyKey].value = this.state[questionBodyKey + '_value']
                        }
                        else {
                            //delete the value object in questionBody if there are empty string
                            delete questionBody[questionBodyKey].value
                        }
                    }
                }
            })
        })
        if (pageType === 'hedis') {
            // if there are other question go to next question
            if (this.state.isOtherQuestion) {
                nextPage = `/smart-questions/hedis/${parseInt(this.props.match.params.page) + 1}`
            }
            else {
                //if not, go to prepare-Chapter 5 page
                nextPage = '/prepare-Chapter5'
                questionBody.smartQuestionsCompleted = true
                //the patient is finished answering all questions
                questionBody.reviewCompleted = true
            }
        }
        else {
            const medId = pageType.split('_')[1]
            // if there are other question and pageType is not 'hedis', go to next question
            if (this.state.isOtherQuestion) {
                nextPage = `/smart-questions/medication_${medId}/${parseInt(this.props.match.params.page) + 1}`
            }
            //if not, go to meds-any-other-questions page
            else {
                nextPage = `/meds-any-other-questions/${medId}`
            }
        }

        await this.props.callAPIGateway('fhirCmrIdPut', { id: this.cmr.id }, questionBody)
        Object.keys(questionBody).forEach(key => {
            this.cmr[key] = questionBody[key]
        })
        this.props.setCMR(this.cmr)
        console.log(this.state)
        this.props.push(nextPage)
    }

    getTemplate = (item) => {
        //get the question template
        switch (item.template) {
           case 'checkboxes':
                return (
                    <div key={item.id} className={style.contentWrapper}>
                         <Row className={style.inputWrapper}>
                         <Col>
                           <span className={style.questionText}>
                            {item.text}
                            </span>
                            <br/>
                            <span className={style.subQuestionText}>
                             Choose appropriate answer.
                             </span>
                         </Col>
                        </Row>

                            <Row  className={style.inputWrapper}  >
                                    {/* get all options in item object*/}
                                    {item.option.map((choice, index) => (

                                        <Col className={style.checkboxChoiceWrapper}>

                                            <label className={style.checkboxContainer}>
                                          <input
                                                name={'smartQuestion_' + item.id + '_answer_'+(index+1)}
                                                type="checkbox"
                                                value={`${Object.keys(choice)[0]}`}
                                                checked={this.state['smartQuestion_' + item.id + '_answer_'+(`${Object.keys(choice)[0]}`)] ==`${Object.keys(choice)[0]}`}
                                                onChange={this.handleOnCheckboxChange}
                                            />
                                          <span className={style.checkbox}>
                                          {choice[`${index + 1}`]}
                                          </span>
                                         </label>

                                            </Col>

                                    ))
                                    }
                             </Row>

                    </div>

                )
            case 'radioButtons':
                return (
                    <div key={item.id} className={style.contentWrapper}>
                        <Row className={style.inputWrapper}>
                         <Col>
                           <span className={style.questionText}>
                            {item.text}
                            </span>
                            <br/>
                            <span className={style.subQuestionText}>
                             Choose appropriate answer.
                             </span>
                         </Col>
                         </Row>
                                    {/* get all options in item object*/}
                                    {item.option.map((choice, index) => (
                                        <span>
                                        <Row className={style.inputWrapper} key={choice[`${index + 1}`]}>
                                            <Col >
                                            <td>
                                                  <input
                                                    className={style.radioButton}
                                                    name={'smartQuestion_' + item.id + '_answer'}
                                                    type="radio"
                                                    value={`${Object.keys(choice)[0]}`}
                                                    checked={this.state['smartQuestion_' + item.id + '_answer'] === `${Object.keys(choice)[0]}`}
                                                    onChange={this.handleOnChange}
                                                />
                                             </td>
                                             <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                             <td  className={style.optionsText}>
                                                <span className={this.state['smartQuestion_' + item.id + '_answer'] === `${Object.keys(choice)[0]}` ? style.selectedChoice : ''}>
                                                    {choice[`${Object.keys(choice)[0]}`]}
                                                </span>
                                                </td>
                                            </Col>
                                        </Row>
                                        <Row>
                                        <Col>
                                        {
                                            index !=item.option.length -1 ?
                                            <div >
                                                <div className={style. empty20}/>
                                                <div className={style.line}/>
                                                </div> : null
                                        }

                                        </Col>
                                        </Row>
                                        </span>

                                    ))
                                    }

                        </div>

                )

            case 'yesNoRadioButtons':
                return (
                    <div key={item.id} className={style.contentWrapper}>
                         <Row className={style.inputWrapper}>
                         <Col>
                           <span className={style.questionText}>
                            {item.text}
                            </span>
                            <br/>
                            <span className={style.subQuestionText}>
                             Choose appropriate answer.
                             </span>
                         </Col>
                        </Row>

                        <Row className={style.inputWrapper}>
                          <Col  sm={{ size: 3}}  className={style.yesnocheckboxWrapper}>
                          <span  onClick={(e) => this.handleOnclickYN('smartQuestion_' + item.id + '_answer','1', e)} >

                             <label className={style.checkboxContainer}>
                                    <input
                                        name={'smartQuestion_' + item.id + '_answer'}
                                        type="radio"
                                        value='1'
                                        checked={this.state['smartQuestion_' + item.id + '_answer'] === '1'}
                                        onChange={this.handleOnChange}
                                    />
                                 <span className={style.checkbox}>
                                     YES
                                </span>
                            </label>  </span>
                                </Col>


                          <Col    className={style.yesnocheckboxWrapper}>
                               <span  onClick={(e) => this.handleOnclickYN('smartQuestion_' + item.id + '_answer','2', e)} >
                             <label className={style.checkboxContainer}>
                                    <input
                                        name={'smartQuestion_' + item.id + '_answer'}
                                        type="radio"
                                        value='2'
                                        checked={this.state['smartQuestion_' + item.id + '_answer'] === '2'}
                                        onChange={this.handleOnChange}
                                    />

                                   <span className={style.checkbox}>
                                      NO
                                    </span>
                                   </label>
                                   </span>
                                </Col>


                     </Row>
                     <div className={style. empty40}/>
                     </div>
                )

            case 'radioButtonsChioce':
                return (
                    <div key={item.id} className={style.contentWrapper}>

                     <Row className={style.inputWrapper}>
                         <Col>
                           <span className={style.questionText}>
                            {item.text}
                            </span>
                            <br/>
                            <span className={style.subQuestionText}>
                             Choose appropriate answer.
                             </span>
                         </Col>
                        </Row>

                            {item.openChoice.location === 'before' ?
                            <Row className={style.inputWrapper}>
                            <Col className={style.openChoceTextboxWrapper}>

                                <InputText
                                    style={styles.inputBefore}
                                    name={'smartQuestion_' + item.id + '_value'}
                                    type="text"
                                    placeholder={item.openChoice.placeholder}
                                    value={this.state['smartQuestion_' + item.id + '_value'] || ''}
                                    onChange={this.handleOnChange}
                                />
                                 </Col>
                             </Row>
                        : null}

                           <tr className={style.inputWrapper}>

                         {item.option.map((choice, index) => (

                           <td   className={style.checkboxWrapper}>

                             <label className={style.checkboxContainer}>
                                   <input
                                           type="checkbox"
                                           name={'smartQuestion_' + item.id + '_answer'}
                                           value={`${Object.keys(choice)[0]}`}
                                           checked={this.state['smartQuestion_' + item.id + '_answer'] === `${Object.keys(choice)[0]}`}
                                           onChange={this.handleOnChange}
                                    />
                                   <span className={style.checkbox}>
                                         {choice[`${Object.keys(choice)[0]}`]}

                                        {parseInt(item.openChoice.option) === index + 1 ? ' ' + item.openChoice.text : null}

                                    </span>
                                   </label>

                              </td>


                             ))}

                                {/* checks if the choice is theopenChoice */}
                                {item.openChoice.option?
                                  <td className={style.openChoceTextboxWrapper}>
                                        <InputText
                                            name={'smartQuestion_' + item.id + '_value'}
                                            type="text"
                                            placeholder={item.openChoice.placeholder}
                                           // disabled={this.state['smartQuestion_' + item.id + '_answer'] != index + 1}
                                            value={this.state['smartQuestion_' + item.id + '_value']}
                                            onChange={this.handleOnChange}
                                        />
                                       </td>
                                   : ''}


                          </tr>
                            {item.openChoice.location === 'after' ?
                                <Row className={style.inputWrapper}>
                                <Col className={style.openChoceTextboxWrapper}>
                                    <InputText
                                        style={styles.inputAfter}
                                        type="text"
                                        name={'smartQuestion_' + item.id + '_value'}
                                        placeholder={item.openChoice.placeholder}
                                        value={this.state['smartQuestion_' + item.id + '_value']}
                                        onChange={this.handleOnChange}
                                    />
                                </Col>
                                </Row>
                             : null}
                               <div className={style. empty20}/>
                    </div>
                )

            case 'textEntryBox':
                return (

                    <div key={item.id} className={style.contentWrapper}>

                     <Row className={style.inputWrapper}>
                         <Col>
                           <span className={style.questionText}>
                            {item.text}
                            </span>
                            <br/>
                            <span className={style.subQuestionText}>
                             Choose appropriate answer.
                             </span>
                         </Col>
                        </Row>

                        <Row className={style.inputWrapper}>
                        <Col>

                        <div className={style.textEntryBoxInputWrapper}>
                            <InputText
                                value={this.state['smartQuestion_' + item.id + '_answer'] || ''}
                                name={'smartQuestion_' + item.id + '_answer'}
                                type="text"
                                onChange={this.handleOnChange}
                                placeholder={item.placeholder}
                                />

                    </div>
                    </Col>
                    </Row>
                    <div className={style. empty20}/>
                    </div>
                )
            case 'numberEntryBox':
                return (
                    <div key={item.id} className={style.contentWrapper}>

                     <Row className={style.inputWrapper}>
                         <Col>
                           <span className={style.questionText}>
                            {item.text}
                            </span>
                            <br/>
                            <span className={style.subQuestionText}>
                             Choose appropriate answer.
                             </span>
                         </Col>
                        </Row>

                        <Row className={style.inputWrapper}>
                        <Col>

                        <div className={style.numberEntryBoxInputWrapper}>
                            <InputText
                                value={this.state['smartQuestion_' + item.id + '_answer'] || ''}
                                name={'smartQuestion_' + item.id + '_answer'}
                                type="text"
                                max={item.max}
                                min={item.min}
                                onChange={this.handleOnChange}
                                placeholder={item.placeholder}/>
                        </div>
                    </Col>
                    </Row>
                    <div className={style. empty20}/>
                    </div>
                )
            case 'painScale':

                return (
                    <div key={item.id} className={style.contentWrapper}>
                        <Row className={style.inputWrapper}>
                         <Col>
                           <span className={style.questionText}>
                            {item.text}
                            </span>
                            <br/>
                            <span className={style.subQuestionText}>
                             Choose appropriate answer.
                             </span>
                         </Col>
                        </Row>
                        <Row className={style.inputWrapper}>
                         <Col  className={style.painScaleContentWrapperImg}>
                           <img src={require('../../../assets/pain-scale.png')} alt="painScale" />
                        </Col>
                        </Row>
                        <Row className={style.inputWrapper}>
                         <Col className={style.painScaleInputWrapper}>
                           <Select
                                value={this.state['smartQuestion_' + item.id + '_answer'] || ''}
                                name={'smartQuestion_' + item.id + '_answer'}
                                onChange={this.handleOnChange}
                                >
                                    {painScale.map(painScale => (
                                        <option key={painScale.key} value={painScale.value}>{painScale.value}</option>
                                    ))}
                                </Select>

                        </Col>
                        </Row>
                    </div>
                )
            default: return
        }
    }

    render() {
        return (
            <Container fluid >
                <Container className={style.content}>
                <br />

                   { this.state.displayName != null ?
                       ( <div className={style.heading1}>
                           {this.state.displayName}
                        </div>  ) : null
                    }

                    {this.state.smartQuestionsReview.items.map((item, index) =>
                        //check if it is more than 2 or not, and if it is the even number the background will be grey
                        <div key={index} className={this.state.smartQuestionsReview.items.length > 2 && index % 2 === 1 ? style.greyTemplate : ''} >
                            {/* get template questions */}
                            {this.getTemplate(item)}
                        </div>
                    )}



                        <Row className={style.buttonInputWrapper}>
                            <Col >
                            <div className={style.buttonWrapper}>
                                  <Button onClick={this.handleSubmit}
                                          className = {[style.btn, style.btnNext ]} >
                                 NEXT STEP
                                </Button>
                            </div>
                            </Col>
                        </Row>

                </Container>
            </Container>
        )
    }
}

const styles = {
    inputAfter: {
        marginTop: 10,
        color: '#000000',
        maxWidth: 500
    },
    inputBefore: {
        marginBottom: 10,
        color: '#000000',
        maxWidth: 500
    },
}
export default connect(
    ({
        cmr,
        smartQuestions,
    }) =>
        ({
            cmr,
            smartQuestions
        }),
    {
        callAPIGateway,
        setCMR,
        push,
        savePageData
    }
)(SmartQuestions)
