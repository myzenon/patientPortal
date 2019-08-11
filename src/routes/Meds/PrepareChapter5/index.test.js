import React from 'react'
import {PrepareChapter5} from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
  const store = {
      cmr: {...mockObj.cmr},
      patient: {...mockObj.patient},
      user: {...mockObj.patient},
      page: {"data":{"chapter4Time":"12/12/1999"}},
      savePageData: () => {
      }
  }
    const wrapper = render (
        <PrepareChapter5 {...store}/>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})
