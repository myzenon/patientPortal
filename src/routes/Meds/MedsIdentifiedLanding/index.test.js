import React from 'react'
import { MedsIdentifiedLanding } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test.skip('renders correctly | Total reviewed number of meds to review is length(cmr[item_id].reviewCompleted)', () => {
  const props = {
    cmr: { ...mockObj.cmr }
  }
  const wrapper = mount(
    <MedsIdentifiedLanding { ...props } />
  )
  //initial value is 0
  expect(parseInt(wrapper.find('.numberTold strong').text())).toBe(0)
  expect(toJson(wrapper)).toMatchSnapshot()
})

test.skip('If patient clicks the review my medications button, they should be taken to the last screen they were on in their last session. this can be any of the [MED 1] screens.', done => {
  const props = {
    cmr: { ...mockObj.cmr },
    callAPIGateway: () => Promise.resolve(),
    setCMR: () => Promise.resolve(),
    push: (url) => {
      expect(url).toBe('/meds-verify-drug/000080833')
      done()
    }
  }
  const wrapper = mount(
    <MedsIdentifiedLanding {...props} />
  )
  setTimeout(() => {
    wrapper.find('button').simulate('click')
  }, 0)
})

test.skip('If patient clicks the review my medications button, they should be taken to the last screen they were on in their last session. this can be any of the [MED 1] screens.', done => {
  const props = {
    cmr: {
      ...mockObj.cmr,
      medication_000080833: {
        taken: "y"
      }
    },
    callAPIGateway: () => Promise.resolve(),
    setCMR: () => Promise.resolve(),
    push: (url) => {
      expect(url).toBe('/meds-dosing-regimen/000080833')
      done()
    }
  }
  const wrapper = mount(
    <MedsIdentifiedLanding { ...props } />
  )
  setTimeout(() => {
    wrapper.find('button').simulate('click')
  }, 0)
})

test.skip('If patient clicks the review my medications button, they should be taken to the last screen they were on in their last session. this can be any of the [MED 1] screens.', done => {
  const props = {
    cmr: {
      ...mockObj.cmr,
      medication_000080833: {
        taken: "y",
        dosage: {}
      }
    },
    callAPIGateway: () => Promise.resolve(),
    setCMR: () => Promise.resolve(),
    push: (url) => {
      expect(url).toBe('/meds-what-for/000080833')
      done()
    }
  }
  const wrapper = mount(
    <MedsIdentifiedLanding { ...props } />
  )
  setTimeout(() => {
    wrapper.find('button').simulate('click')
  }, 0)
})

test.skip('If patient clicks the review my medications button, they should be taken to the last screen they were on in their last session. this can be any of the [MED 1] screens.', done => {
  const props = {
    cmr: {
      ...mockObj.cmr,
      medication_000080833: {
        taken: "y",
        dosage: {},
        reasonCode:[]
      }
    },
    callAPIGateway: () => Promise.resolve(),
    setCMR: () => Promise.resolve(),
    push: (url) => {
      expect(url).toBe('/meds-any-other-questions/000080833')
      done()
    }
  }
  const wrapper = mount(
    <MedsIdentifiedLanding { ...props } />
  )
  setTimeout(() => {
    wrapper.find('button').simulate('click')
  }, 0)
})

test.skip('If patient clicks the review my medications button, they should be taken to the last screen they were on in their last session. this can be any of the [MED 1] screens.', done => {
  const props = {
    cmr: {
      ...mockObj.cmr,
      medication_000080833: {
        taken: "n",
      }
    },
    callAPIGateway: () => Promise.resolve(),
    setCMR: () => Promise.resolve(),
    push: (url) => {
      expect(url).toBe('/meds-why-stopped/000080833')
      done()
    }
  }
  const wrapper = mount(
    <MedsIdentifiedLanding { ...props } />
  )
  setTimeout(() => {
    wrapper.find('button').simulate('click')
  }, 0)
})

test.skip('If patient clicks the review my medications button, they should be taken to the last screen they were on in their last session. this can be any of the [MED 1] screens.', done => {
  const props = {
    cmr: {
      ...mockObj.cmr,
      medication_000080833: {
        taken: "n",
        reasonNotTaken:[]
      }
    },
    callAPIGateway: () => Promise.resolve(),
    setCMR: () => Promise.resolve(),
    push: (url) => {
      expect(url).toBe('/meds-any-other-questions/000080833')
      done()
    }
  }
  const wrapper = mount(
    <MedsIdentifiedLanding { ...props } />
  )
  setTimeout(() => {
    wrapper.find('button').simulate('click')
  }, 0)
})
