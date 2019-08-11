import React from 'react'
import {PrepareChapter3} from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
  const store = {
      cmr: {...mockObj.cmr},
      page: {"data":{"chapter2Time":Date.now()}},
      savePageData: () => {
      }
  }
  const wrapper = render (
      <PrepareChapter3 {...store} />
  )
    expect(toJson(wrapper)).toMatchSnapshot()
})
