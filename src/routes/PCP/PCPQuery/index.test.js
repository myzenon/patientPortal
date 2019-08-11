import React from 'react'
import { PCPQuery } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
  const props = {
      patient: {
          ...mockObj.patient,
      },
      cmr: {
          ...mockObj.cmr,
          medication_000080833: {
              taken: "n",
              reasonNotTaken: {},
              reviewCompleted: true
          },
          medication_000293159: {
              taken: "n",
              reasonNotTaken: {},
              reviewCompleted: true
          },
          medication_000493990: {
              taken: "n",
              reasonNotTaken: {},
              reviewCompleted: true
          }
      },
      match: {
          params: {
              medId: '665820312'
          }
      },
  }

    const wrapper = render(
        <PCPQuery  { ...props } />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('clicks Next without changing the main doctor | go to meds identified', (done) => {
    const props = {
      cmr: {
          ...mockObj.cmr,
          medication_000080833: {
              taken: "n",
              reasonNotTaken: {},
              reviewCompleted: false
          },
          medication_000293159: {
              taken: "n",
              reasonNotTaken: {},
              reviewCompleted: false
          }
        },
        patient: {
            ...mockObj.patient,
        },  callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirPatientsIdPut')
            expect(get).toEqual({
                id: mockObj.patient.id
            })
            expect(post).toEqual({
                pcp: mockObj.patient.pcp,
                confirmedPcp: true,
                primaryPharmacy: mockObj.patient.primaryPharmacy,
                confirmedPharmacy: true
            })
            return Promise.resolve()
        },
        setPatient: (patient) => {
            expect(patient).toEqual({
                ...mockObj.patient,
                pcp: mockObj.patient.pcp,
                confirmedPcp: true,
                primaryPharmacy: mockObj.patient.primaryPharmacy,
                confirmedPharmacy: true
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/prepare/Chapter2')
            done()
        }
    }
    const wrapper = mount(
        <PCPQuery  { ...props } />
    )
    setTimeout(() => {
        wrapper.find('button').first().simulate('click')
    }, 0)
})

test('clicks Next with changing the main doctor (9283202372) | go to method delivery', (done) => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000080833: {
                taken: "n",
                reasonNotTaken: {},
                reviewCompleted: false
            },
            medication_000293159: {
                taken: "n",
                reasonNotTaken: {},
                reviewCompleted: false
            }
          },
        patient: {
            ...mockObj.patient,
        },  callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirPatientsIdPut')
            expect(get).toEqual({
                id: mockObj.patient.id
            })
            expect(post).toEqual({
                confirmedPcp: true,
                confirmedPharmacy: true,
                pcp: "9283202372",
                primaryPharmacy: "1568477834"
            })
            return Promise.resolve()
        },
        setPatient: (patient) => {
            expect(patient).toEqual({
                ...mockObj.patient,
                confirmedPcp: true,
                confirmedPharmacy: true,
                pcp: "9283202372",
                primaryPharmacy: "1568477834"
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/prepare/Chapter2')
            done()
        }
    }
    const wrapper = mount(
        <PCPQuery  { ...props } />
    )
    setTimeout(() => {
        wrapper.find('.choiceWrapper').first().simulate('click')
        wrapper.find('.choiceWrapper').at(2).simulate('click')
        wrapper.find('button').first().simulate('click')
    }, 0)
})

test('clicks Next without changing the main doctor | go to meds identified', (done) => {
    const props = {
      cmr: {
          ...mockObj.cmr,
          medication_000080833: {
              taken: "n",
              reasonNotTaken: {},
              reviewCompleted: false
          },
          medication_000293159: {
              taken: "n",
              reasonNotTaken: {},
              reviewCompleted: false
          }
        },
        patient: {
            ...mockObj.patient,
        },  callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirPatientsIdPut')
            expect(get).toEqual({
                id: mockObj.patient.id
            })
            expect(post).toEqual({
                pcp: mockObj.patient.pcp,
                confirmedPcp: true,
                primaryPharmacy: mockObj.patient.primaryPharmacy,
                confirmedPharmacy: true
            })
            return Promise.resolve()
        },
        setPatient: (patient) => {
            expect(patient).toEqual({
                ...mockObj.patient,
                pcp: mockObj.patient.pcp,
                confirmedPcp: true,
                primaryPharmacy: mockObj.patient.primaryPharmacy,
                confirmedPharmacy: true
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/prepare/Chapter2')
            done()
        }
    }
    const wrapper = mount(
        <PCPQuery  { ...props } />
    )
    setTimeout(() => {
        wrapper.find('button').first().simulate('click')
    }, 0)
})

test('clicks Next with selecting other choice | go to method delivery', (done) => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000080833: {
                taken: "n",
                reasonNotTaken: {},
                reviewCompleted: false
            },
            medication_000293159: {
                taken: "n",
                reasonNotTaken: {},
                reviewCompleted: false
            }
          },
        patient: {
            ...mockObj.patient,
        },  callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirPatientsIdPut')
            expect(get).toEqual({
                id: mockObj.patient.id
            })
            expect(post).toEqual({
                pcp: "otherPractitioner",
                otherPractitioner: "",
                confirmedPcp: true,
                primaryPharmacy: "otherPharmacy",
                otherPharmacy: "",
                confirmedPharmacy: true
            })
            return Promise.resolve()
        },
        setPatient: (patient) => {
            expect(patient).toEqual({
                ...mockObj.patient,
                pcp: "otherPractitioner",
                otherPractitioner: "",
                confirmedPcp: true,
                primaryPharmacy: "otherPharmacy",
                otherPharmacy: "",
                confirmedPharmacy: true
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/prepare/Chapter2')
            done()
        }
    }
    const wrapper = mount(
        <PCPQuery  { ...props } />
    )
    setTimeout(() => {
        wrapper.find('.choiceWrapper').at(1).simulate('click')
        wrapper.find('.choiceWrapper').at(3).simulate('click')
        wrapper.find('button').first().simulate('click')
    }, 0)
})

test('clicks Next with selecting other choice and fill in other text field | go to method delivery', (done) => {
    const props = {
        cmr: {
            ...mockObj.cmr,
            medication_000080833: {
                taken: "n",
                reasonNotTaken: {},
                reviewCompleted: false
            },
            medication_000293159: {
                taken: "n",
                reasonNotTaken: {},
                reviewCompleted: false
            }
          },
        patient: {
            ...mockObj.patient,
        },  callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirPatientsIdPut')
            expect(get).toEqual({
                id: mockObj.patient.id
            })
            expect(post).toEqual({
                pcp: "otherPractitioner",
                otherPractitioner: "Dr. Adam Saunter",
                confirmedPcp: true,
                primaryPharmacy: "otherPharmacy",
                otherPharmacy: "44 Shirley Ave Gastonia, NC, USA 28052",
                confirmedPharmacy: true
            })
            return Promise.resolve()
        },
        setPatient: (patient) => {
            expect(patient).toEqual({
                ...mockObj.patient,
                pcp: "otherPractitioner",
                otherPractitioner: "Dr. Adam Saunter",
                confirmedPcp: true,
                primaryPharmacy: "otherPharmacy",
                otherPharmacy: "44 Shirley Ave Gastonia, NC, USA 28052",
                confirmedPharmacy: true
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/prepare/Chapter2')
            done()
        }
    }
    const wrapper = mount(
        <PCPQuery  { ...props } />
    )
    setTimeout(() => {
        wrapper.find('.choiceWrapper').at(1).simulate('click')
        wrapper.find('input[name="otherPractitioner"]').simulate('change', {
            target: {
                name: 'otherPractitioner',
                value: 'Dr. Adam Saunter'
            }
        })
        wrapper.find('.choiceWrapper').at(3).simulate('click')
        wrapper.find('input[name="otherPharmacy"]').simulate('change', {
            target: {
                name: 'otherPharmacy',
                value: '44 Shirley Ave Gastonia, NC, USA 28052'
            }
        })
        wrapper.find('button').first().simulate('click')
    }, 0)
})
