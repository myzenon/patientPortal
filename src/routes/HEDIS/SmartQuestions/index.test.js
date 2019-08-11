import React from 'react'
import { SmartQuestions } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
    const props = {
        cmr: { ...mockObj.cmr },
        match: {
            params: {
                page: 1,
                type: 'hedis'
            }
        },
    }

    const wrapper = render(
        <SmartQuestions { ...props } />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('clicks next specific smart question | go to meds-any-other-questions', (done) => {
    const smartQuestionId = 'smartQuestion_e2f28b65-5f5e-4f17-98uj4-26b4a708ffd9'
    const props = {
        cmr: { ...mockObj.cmr },
        match: {
            params: {
                page: 1,
                type: 'medication_000293159'
            }
        }, callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                [smartQuestionId]: {}
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                [smartQuestionId]: {}
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/meds-any-other-questions/000293159')
            done()
        }
    }

    const wrapper = mount(
        <SmartQuestions { ...props } />
    )
    wrapper.find('button').simulate('click')
})

test('clicks next smart question (radioButtonsChioce) without any input | go to smart-questions-2', (done) => {
    const smartQuestionId = 'smartQuestion_f2f28b65-5f5e-4r17-901a-26asdf8ffd2'
    const props = {
        cmr: { ...mockObj.cmr },
        match: {
            params: {
                page: 1,
                type: 'hedis'
            }
        }, callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                [smartQuestionId]: {}
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                [smartQuestionId]: {}
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/smart-questions/hedis/2')
            done()
        }
    }

    const wrapper = mount(
        <SmartQuestions { ...props } />
    )
    wrapper.find('button').simulate('click')
})

test('clicks next smart question (yesNoRadioButtons) without any input | go to smart-questions-3', (done) => {
    const smartQuestionId = 'smartQuestion_e2f28b65-5f5e-5f17-901a-26gt508ffd2'
    const props = {
        cmr: { ...mockObj.cmr },
        match: {
            params: {
                page: 2,
                type: 'hedis'
            }
        }, callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                [smartQuestionId]: {}
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                [smartQuestionId]: {}
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/smart-questions/hedis/3')
            done()
        }
    }

    const wrapper = mount(
        <SmartQuestions { ...props } />
    )
    wrapper.find('button').simulate('click')
})

test('clicks next smart question (radioButtons) without any input | go to smart-questions-4', (done) => {
    const smartQuestionId = 'smartQuestion_65d653bc-7c91-4ecf-rf54-755ed01a2076'
    const props = {
        cmr: { ...mockObj.cmr },
        match: {
            params: {
                page: 3,
                type: 'hedis'
            }
        }, callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                [smartQuestionId]: {}
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                [smartQuestionId]: {}
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/smart-questions/hedis/4')
            done()
        }
    }

    const wrapper = mount(
        <SmartQuestions { ...props } />
    )
    wrapper.find('button').simulate('click')
})

test('clicks next smart question (numberEntryBox) without any input | go to smart-questions-5', (done) => {
    const smartQuestionId = 'smartQuestion_e2f28b65-5f5e-4f17-901a-26b4a708ffd2'
    const props = {
        cmr: { ...mockObj.cmr },
        match: {
            params: {
                page: 4,
                type: 'hedis'
            }
        }, callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                [smartQuestionId]: {}
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                [smartQuestionId]: {}
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/smart-questions/hedis/5')
            done()
        }
    }

    const wrapper = mount(
        <SmartQuestions { ...props } />
    )
    wrapper.find('button').simulate('click')
})

test('clicks next smart question (painScale) without any input | mark question is completed | go to prepare Chapter 5 page', (done) => {
    const smartQuestionId = 'smartQuestion_e2f28b65-5f5e-4f17-901a-26b4a708sfd2'
    const props = {
        cmr: { ...mockObj.cmr },
        match: {
            params: {
                page: 5,
                type: 'hedis'
            }
        }, callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                reviewCompleted: true,
                [smartQuestionId]: {},
                smartQuestionsCompleted: true
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                reviewCompleted: true,
                [smartQuestionId]: {},
                smartQuestionsCompleted: true
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/prepare-Chapter5')
            done()
        }
    }

    const wrapper = mount(
        <SmartQuestions { ...props } />
    )
    wrapper.find('button').simulate('click')
})


test('clicks next smart question (radioButtonsChioce) with any input | go to smart-questions-2', (done) => {
    const smartQuestionId = 'smartQuestion_f2f28b65-5f5e-4r17-901a-26asdf8ffd2'
    const props = {
        cmr: { ...mockObj.cmr },
        match: {
            params: {
                page: 1,
                type: 'hedis'
            }
        }, callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                [smartQuestionId]: { answer: "1", value: "Dog" }
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                [smartQuestionId]: { answer: "1", value: "Dog" }
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/smart-questions/hedis/2')
            done()
        }
    }

    const wrapper = mount(
        <SmartQuestions { ...props } />
    )
    wrapper.find('input[type="radio"]').first().simulate('change', {
        target: {
            name: 'smartQuestion_f2f28b65-5f5e-4r17-901a-26asdf8ffd2_answer',
            value: '1'
        }
    })
    wrapper.find('input[type="text"]').simulate('change', {
        target: {
            name: 'smartQuestion_f2f28b65-5f5e-4r17-901a-26asdf8ffd2_value',
            value: 'Dog'
        }
    })
    wrapper.find('button').simulate('click')
})

test('clicks next smart question (yesNoRadioButtons) without any input | go to smart-questions-3', (done) => {
    const smartQuestionId = 'smartQuestion_e2f28b65-5f5e-5f17-901a-26gt508ffd2'
    const props = {
        cmr: { ...mockObj.cmr },
        match: {
            params: {
                page: 2,
                type: 'hedis'
            }
        }, callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                [smartQuestionId]: { answer: "1" }
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                [smartQuestionId]: { answer: "1" }
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/smart-questions/hedis/3')
            done()
        }
    }

    const wrapper = mount(
        <SmartQuestions { ...props } />
    )
    wrapper.find('input[type="radio"]').first().simulate('change', {
        target: {
            name: 'smartQuestion_e2f28b65-5f5e-5f17-901a-26gt508ffd2_answer',
            value: '1'
        }
    })
    wrapper.find('button').simulate('click')
})

test('clicks next smart question (radioButtons) without any input | go to smart-questions-4', (done) => {
    const smartQuestionId = 'smartQuestion_65d653bc-7c91-4ecf-rf54-755ed01a2076'
    const props = {
        cmr: { ...mockObj.cmr },
        match: {
            params: {
                page: 3,
                type: 'hedis'
            }
        }, callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                [smartQuestionId]: { answer: "1" }
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                [smartQuestionId]: { answer: "1" }
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/smart-questions/hedis/4')
            done()
        }
    }

    const wrapper = mount(
        <SmartQuestions { ...props } />
    )
    wrapper.find('input[type="radio"]').first().simulate('change', {
        target: {
            name: 'smartQuestion_65d653bc-7c91-4ecf-rf54-755ed01a2076_answer',
            value: '1'
        }
    })
    wrapper.find('button').simulate('click')
})

test('clicks next smart question (numberEntryBox) without any input | go to smart-questions-5', (done) => {
    const smartQuestionId = 'smartQuestion_e2f28b65-5f5e-4f17-901a-26b4a708ffd2'
    const props = {
        cmr: { ...mockObj.cmr },
        match: {
            params: {
                page: 4,
                type: 'hedis'
            }
        }, callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                [smartQuestionId]: { answer: "5" }
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                [smartQuestionId]: { answer: "5" }
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/smart-questions/hedis/5')
            done()
        }
    }

    const wrapper = mount(
        <SmartQuestions { ...props } />
    )
    wrapper.find('input[type="text"]').simulate('change', {
        target: {
            name: 'smartQuestion_e2f28b65-5f5e-4f17-901a-26b4a708ffd2_answer',
            value: '5'
        }
    })
    wrapper.find('button').simulate('click')
})

test.skip('clicks next smart question (painScale) without any input | mark question is completed | go to prepare Chapter 5 page', (done) => {
    const smartQuestionId = 'smartQuestion_e2f28b65-5f5e-4f17-901a-26b4a708sfd2'
    const props = {
        cmr: { ...mockObj.cmr },
        match: {
            params: {
                page: 5,
                type: 'hedis'
            }
        }, callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                reviewCompleted: true,
                [smartQuestionId]: { answer: "10" },
                smartQuestionsCompleted: true
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                reviewCompleted: true,
                [smartQuestionId]: { answer: "10" },
                smartQuestionsCompleted: true
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/prepare-Chapter5')
            done()
        }
    }

    const wrapper = mount(
        <SmartQuestions { ...props } />
    )
    wrapper.find('input[type="number"]').simulate('change', {
        target: {
            name: 'smartQuestion_e2f28b65-5f5e-4f17-901a-26b4a708sfd2_answer',
            value: '10'
        }
    })
    wrapper.find('button').simulate('click')
})
