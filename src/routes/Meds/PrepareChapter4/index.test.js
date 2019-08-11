import React from 'react'
import {PrepareChapter4} from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
  const store = {
      cmr: {...mockObj.cmr},
      page: {"data":{"chapter3Time":Date.now()}},
      savePageData: () => {
      }
  }
    const wrapper = render (
        <PrepareChapter4 {...store}/>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})
