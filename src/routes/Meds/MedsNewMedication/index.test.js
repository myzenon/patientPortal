import React from 'react'
import { MedsNewMedication } from './index'
import ReactGA from 'react-ga';

   // This should be part of your setup
   ReactGA.initialize('UA-121783543-1', {
       'debug': true
     });;

jest.mock("react-ga")

test('renders correctly', () => {
    const props = {
        cmr: { ...mockObj.cmr,
          otherMedication_1: {
              display: "ASPIRIN 200",
              brandName: "ASPIRIN",
              genericName: "ASPIRIN",
              dosageStrength: "200",
              taken: "y",
              reasonCode: [
                  { conditionName: 'Other', description: ' ' }
              ],
              dosage:{ description: "ASPIRIN"},
              hasQuantity: true
          } },
        match: {
            params: {
                medId: "otherMedication_1"
            }
        },
    }
    console.log(props.cmr)
    const wrapper = render(
        <MedsNewMedication { ...props } />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

test.skip('NEXT button calls /fhir/cmr API to save this Other-Medication | goes to the [ENTER NEW MEDICATION DOSING] page', done => {
    const props = {
      cmr: { ...mockObj.cmr,
        otherMedication_1: {
            display: "ASPIRIN 200",
            brandName: "ASPIRIN",
            genericName: "ASPIRIN",
            dosageStrength: "200",
            taken: "y",
            hasQuantity: true
        } },
        match: {
            params: {
                medId: "otherMedication_1"
            }
        },
        callAPIGateway: (name, get, post) => {
            expect(name).toBe('fhirCmrIdPut')
            expect(get).toEqual({
                id: mockObj.cmr.id
            })
            expect(post).toEqual({
                otherMedication_1: {
                    display: "ASPIRIN 200",
                    brandName: "ASPIRIN",
                    genericName: "ASPIRIN",
                    dosageStrength: "200",
                    taken: "y",
                    hasQuantity: true
                }
            })
            return Promise.resolve()
        },
        setCMR: (cmr) => {
            expect(cmr).toEqual({
                ...mockObj.cmr,
                otherMedication_1: {
                    display: "ASPIRIN 200",
                    brandName: "ASPIRIN",
                    genericName: "ASPIRIN",
                    dosageStrength: "200",
                    taken: "y",
                    hasQuantity: true
                }
            })
            return Promise.resolve()
        },
        push: (url) => {
            expect(url).toBe('/meds-other-whatfor/otherMedication_1')
            done()
        }
    }
    const wrapper = mount(
        <MedsNewMedication { ...props } />
    )
    wrapper.find('input[name="medicine"]').simulate('change', {
        target: {
            name: 'medicine',
            value: 'aspirin'
        }
    })
    wrapper.find('input[name="dose"]').simulate('change', {
        target: {
            name: 'dose',
            value: '200'
        }
    })
    wrapper.find('input[name="description"]').simulate('change', {
        target: {
            name: 'dosage',
            value: 'take 2'
        }
    })
    wrapper.find('button[type="submit"]').simulate('submit')
})
