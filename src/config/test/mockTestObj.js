export default {
    auth: {
        accessToken: 'accessToken',
        AccessKeyId: 'AccessKeyId',
        SecretAccessKey: 'SecretAccessKey',
        sessionToken: 'sessionToken',
        patientId: 'patientId'
    },
    patient: {
        "insurance_id": "XD32732623732",
        "mtmOrg": "f91b19d2-55e5-472d-8e9e-af2b3f72921d",
        "birthDate": "1949-05-21",
        "identifier": [
            {
                "assigner": {
                    "reference": "Organization/047a5f73-f399-4bd8-8257-9f88bf6a9ee9",
                    "display": "Test1 Insurance Company"
                },
                "type": {
                    "coding": [
                        {
                            "code": "SN",
                            "system": "http://hl7.org/fhir/v2/0203",
                            "display": "Subscriber Number"
                        }
                    ]
                },
                "value": "XD32732623732",
                "use": "official"
            }
        ],
        "managingOrganization": {
            "reference": "Organization/f91b19d2-55e5-472d-8e9e-af2b3f72921d"
        },
        "insuranceOrg": "047a5f73-f399-4bd8-8257-9f88bf6a9ee9",
        "address": [
            {
                "country": "USA",
                "state": "NC",
                "city": "Gastonia",
                "line": [
                    "47 Inverness Road"
                ],
                "postalCode": "28052"
            }
        ],
        "name": [
            {
                "family": "Summers",
                "given": [
                    "Rita"
                ],
                "use": "official"
            }
        ],
        "pcp": "1245319599",
        "primaryPharmacy": "1881967180",
        "practitioners":
            {
                "1245319599": {
                    "name": [{ "use": "official", "prefix": ["Dr."], "given": ["Adam"], "family": "Saunter" }],
                    "address": [{ "line": ["44 Shirley Ave"], "city": "Gastonia", "postalCode": "28052", "state": "NC", "country": "USA" }],
                    "telecom": [{ "use": "work", "system": "phone", "value": "732-222-1333" }],
                    "npi": "1245319599"
                },
                "9283202372": {
                    "name": [{ "use": "official", "prefix": ["Dr."], "given": ["Sandra"], "family": "Mahoney" }],
                    "address": [{ "line": ["14 Bowman St."], "city": "Monsey", "postalCode": "10952", "state": "NY", "country": "USA" }],
                    "telecom": [{ "use": "work", "system": "phone", "value": "732-222-1333" }],
                    "npi": "9283202372"
                },
            },
            "pharmacies": {
                "1881967180": {
                  "npi": "1881967180",
                  "name": "Walgreens Pharmacy",
                  "phone": "415-668-5202",
                  "address": "3601 California St, 3601 California Street, San Francisco, CA 94118-1701"
                },
                "1568477834": {
                  "npi": "1568477834",
                  "name": "Walgreens Pharmacy",
                  "phone": "415-750-1322",
                  "address": "3838 California St, San Francisco, CA 94118-1522"
                }
            },
        "managingOrganization": {
            "reference": "Organization/f91b19d2-55e5-472d-8e9e-af2b3f72921d"
        },
        "gender": "female",
        "accountEmail": "ctorres@mwailinator.com",
        "active": true,
        "updated": "2017-11-22T11:40:44",
        "resourceType": "Patient",
        "telecom": [
            {
                "value": "732-222-1333",
                "use": "mobile",
                "system": "phone"
            }
        ],
        "noppStatus": "true",
        "id": "7c7330c0-a321-4cba-8153-c15e9e87fbdf",
        "communication": [
            {
                "language": {
                    "coding": [
                        {
                            "code": "en",
                            "system": "urn:ietf:bcp:47",
                            "display": "English"
                        }
                    ]
                },
                "preferred": true
            }
        ],
        "confirmedInfo": true,
        "deliveryMethods": [],
    },
    cmr: {
        "patientId": "b70f3cbe-ddd3-4ce3-96b2-914a609abd53",
        "updated": "2017-12-01T06:33:11",
        "resourceType": "cmr",
        "smartQuestions": [
            {
                "items": [
                    {
                        "template": "radioButtonsChioce",
                        "groupName": "HedisStaticQuestions",
                        "openChoice": "1",
                        "id": "f2f28b65-5f5e-4r17-901a-26asdf8ffd2",
                        "text": "Do you have any allergies?",
                        "type": "openChoice",
                        "openChoice": {
                            "option": "1",
                            "text": "(if yes, enter allergens.)",
                            "placeholder": ""
                        },
                        "option": [
                            { "1": "Yes" },
                            { "2": "No" }
                        ],
                    },
                ],
                "page": 1
            },
            {
                "items": [
                    {
                        "template": "yesNoRadioButtons",
                        "groupName": "DM General",
                        "id": "e2f28b65-5f5e-5f17-901a-26gt508ffd2",
                        "text": "What was your most recent A1c reading?",
                        "type": "boolean",
                        "order": 1
                    },
                ],
                "page": 2
            },
            {
                "items": [
                    {
                        "template": "radioButtons",
                        "groupName": "HedisStaticQuestions",
                        "id": "65d653bc-7c91-4ecf-rf54-755ed01a2076",
                        "text": "How often do you have a drink containing alcohol?",
                        "type": "choice",
                        "order": 2,
                        "option": [
                            {
                                "1": "Daily"
                            },
                            {
                                "2": "Less than daily"
                            },
                            {
                                "3": "Not at all"
                            }
                        ]
                    },

                ],
                "page": 3
            },
            {
                "items": [
                    {
                        "template": "numberEntryBox",
                        "groupName": "DM General",
                        "min": "0.0",
                        "max": "15.0",
                        "id": "e2f28b65-5f5e-4f17-901a-26b4a708ffd2",
                        "text": "What was your most recent A1c reading?",
                        "type": "decimal",
                        "order": 5
                    }
                ],
                "page": 4
            },
            {
                "items": [
                    {
                        "id": "e2f28b65-5f5e-4f17-901a-26b4a708sfd2",
                        "text": "What was your last blood pressure reading?",
                        "template": "painScale",
                        "type": "number",
                        "min": 0,
                        "max": 10
                    }
                ],
                "page": 5
            },
        ],
        "medications": [
            {
                "ndc11": "00008-0833-21",
                "image": {
                    "small": {
                        "title": "VENLAFAXINE HCL 75MG",
                        "url": "https://rximage.nlm.nih.gov/image/images/gallery/original/00008-0833-21_RXNAVIMAGE10_3015981C.jpg",
                        "source": "rximage"
                    }
                },
                "brandName": "EFFEXOR XR",
                "indications": [
                    {
                        "drugbankDrugId": "DB00285",
                        "conditionName": "Major Depressive Disorder",
                        "drugbankConditionId": "DBCOND0025426"
                    },
                    {
                        "drugbankDrugId": "DB00285",
                        "conditionName": "Generalized Anxiety Disorder",
                        "drugbankConditionId": "DBCOND0027966"
                    },
                    {
                        "drugbankDrugId": "DB00285",
                        "conditionName": "Vasomotor Symptoms",
                        "drugbankConditionId": "DBCOND0035305"
                    },
                    {
                        "drugbankDrugId": "DB00285",
                        "conditionName": "Social Anxiety Disorder",
                        "drugbankConditionId": "DBCOND0030589"
                    },
                    {
                        "drugbankDrugId": "DB00285",
                        "conditionName": "Neuropathic Pain",
                        "drugbankConditionId": "DBCOND0031639"
                    },
                    {
                        "conditionName": "I don't know"
                    },
                    {
                        "conditionName": "Other"
                    }
                ],
                "genericName": "VENLAFAXINE HCL",
                "smartQuestions": [],
                "prescriber": {
                                "npi": "7383627234",
                                "name": "Peter Wong"
                              },
                "takingMethodText": "take",
                "hasQuantity": "true",
                "doseFormText": "capsule(s)",
                "display": "EFFEXOR XR 75MG",
                "isOTC": false,
                "id": "000080833",
                "source": "claims",
                "isBrand": true
            },
            {
                "ndc11": "00029-3159-20",
                "image": {
                    "small": {
                        "title": "ROSIGLITAZONE MALEATE 4MG",
                        "url": "https://rximage.nlm.nih.gov/image/images/gallery/original/00029-3159-13_RXNAVIMAGE10_E418F247.jpg",
                        "source": "rximage"
                    }
                },
                "brandName": "AVANDIA",
                "indications": [
                    {
                        "conditionName": "I don't know"
                    },
                    {
                        "conditionName": "Other"
                    }
                ],
                "genericName": "ROSIGLITAZONE MALEATE",
                "smartQuestions": [
                    {
                        "items": [
                            {
                                "template": "numberEntryBox",
                                "groupName": "PIOGLITAZONE",
                                "min": "0.0",
                                "max": "15.0",
                                "id": "e2f28b65-5f5e-4f17-98uj4-26b4a708ffd9",
                                "text": "How many days a week do you feel Anxiety?",
                                "type": "decimal",
                                "order": 1
                            }
                        ],
                        "page": 1
                    }
                ],
                "display": "AVANDIA 4MG",
                "isOTC": false,
                "id": "000293159",
                "source": "claims",
                "isBrand": true
            },
            {
                "ndc11": "00049-3990-60",
                "image": {
                    "small": {
                        "title": "ZIPRASIDONE HCL 80MG",
                        "url": "https://rximage.nlm.nih.gov/image/images/gallery/original/00049-3990-60_RXNAVIMAGE10_253B12F8.jpg",
                        "source": "rximage"
                    }
                },
                "brandName": "GEODON",
                "indications": [
                    {
                        "drugbankDrugId": "DB00246",
                        "conditionName": "Bipolar 1 Disorder",
                        "drugbankConditionId": "DBCOND0020745"
                    },
                    {
                        "drugbankDrugId": "DB00246",
                        "conditionName": "Acute Agitation",
                        "drugbankConditionId": "DBCOND0078942"
                    },
                    {
                        "drugbankDrugId": "DB00246",
                        "conditionName": "Schizophrenia",
                        "drugbankConditionId": "DBCOND0018504"
                    },
                    {
                        "drugbankDrugId": "DB00246",
                        "conditionName": "Treatment Resistant Major Depressive Disorder",
                        "drugbankConditionId": "DBCOND0044715"
                    },
                    {
                        "drugbankDrugId": "DB00246",
                        "conditionName": "Psychosis",
                        "drugbankConditionId": "DBCOND0020753"
                    },
                    {
                        "conditionName": "I don't know"
                    },
                    {
                        "conditionName": "Other"
                    }
                ],
                "genericName": "ZIPRASIDONE HCL",
                "smartQuestions": [],
                "display": "GEODON 80MG",
                "isOTC": false,
                "id": "000493990",
                "source": "claims",
                "isBrand": true
            },
            {
                "ndc11": "00074-7126-13",
                "image": {
                    "small": {
                        "title": "DIVALPROEX SODIUM 500MG",
                        "url": "https://rximage.nlm.nih.gov/image/images/gallery/original/00074-7126-13_RXNAVIMAGE10_C003606B.jpg",
                        "source": "rximage"
                    }
                },
                "brandName": "DEPAKOTE ER",
                "indications": [
                    {
                        "drugbankDrugId": "DB00313",
                        "conditionName": "Schizophrenia",
                        "drugbankConditionId": "DBCOND0018504"
                    },
                    {
                        "drugbankDrugId": "DB00313",
                        "conditionName": "Manic Episode",
                        "drugbankConditionId": "DBCOND0033453"
                    },
                    {
                        "drugbankDrugId": "DB00313",
                        "conditionName": "Migraine Headache",
                        "drugbankConditionId": "DBCOND0030217"
                    },
                    {
                        "drugbankDrugId": "DB00313",
                        "conditionName": "Seizure",
                        "drugbankConditionId": "DBCOND0017560"
                    },
                    {
                        "drugbankDrugId": "DB00313",
                        "conditionName": "Epilepsy",
                        "drugbankConditionId": "DBCOND0017557"
                    },
                    {
                        "conditionName": "I don't know"
                    },
                    {
                        "conditionName": "Other"
                    }
                ],
                "genericName": "DIVALPROEX SODIUM",
                "smartQuestions": [],
                "display": "DEPAKOTE ER 500MG",
                "isOTC": false,
                "id": "000747126",
                "source": "claims",
                "isBrand": true
            },
            {
                "ndc11": "66582-0312-31",
                "image": {
                    "small": {
                        "title": "EZETIMIBE/SIMVASTATIN 10MG-20MG",
                        "url": "https://rximage.nlm.nih.gov/image/images/gallery/original/66582-0312-31_RXNAVIMAGE10_B21DD90E.jpg",
                        "source": "rximage"
                    }
                },
                "brandName": "VYTORIN",
                "indications": [
                    {
                        "drugbankDrugId": "DB00973",
                        "conditionName": "Mixed Hyperlipidemia",
                        "drugbankConditionId": "DBCOND0031827"
                    },
                    {
                        "drugbankDrugId": "DB00973",
                        "conditionName": "Homozygous Familial Hypercholesterolemia",
                        "drugbankConditionId": "DBCOND0040863"
                    },
                    {
                        "drugbankDrugId": "DB00973",
                        "conditionName": "Homozygous Sitosterolemia",
                        "drugbankConditionId": "DBCOND0040848"
                    },
                    {
                        "drugbankDrugId": "DB00641",
                        "conditionName": "Hypercholesterolemia",
                        "drugbankConditionId": "DBCOND0004043"
                    },
                    {
                        "drugbankDrugId": "DB00641",
                        "conditionName": "History of stroke or other cerebrovacular disease cardiovascular event",
                        "drugbankConditionId": "DBCOND0022051"
                    },
                    {
                        "conditionName": "I don't know"
                    },
                    {
                        "conditionName": "Other"
                    }
                ],
                "genericName": "EZETIMIBE/SIMVASTATIN",
                "smartQuestions": [],
                "display": "VYTORIN 10MG-20MG",
                "isOTC": false,
                "id": "665820312",
                "source": "claims",
                "isBrand": true
            }
        ],
        "patientReviewStatus": "NotStarted",
        "pharmacistReviewStatus": "NotStarted",
        "pharmacistId": "456456456",
        "id": "d94786ff-3771-4c8e-bb74-6bc12cc4ca7e"
    },
    "user": {
        "patientId": "b70f3cbe-ddd3-4ce3-96b2-914a609abd53",
        "updated": "2018-02-13T06:01:17",
        "resourceType": "User",
        "lastName": "Torres",
        "middleNames": [],
        "noppHistory": [],
        "noppStatus": "true",
        "id": "a80d317c-1aa1-4aed-b70a-0709919ffefc",
        "email": "robotttest-ctorres@mailinator.com",
        "firstName": "Carl"
    },
    "patients": [
        {
            "patientId": "b70f3cbe-ddd3-4ce3-96b2-914a609abd53",
            "updated": "2018-02-13T06:01:17",
            "resourceType": "UserPatient",
            "patientMiddleNames": [],
            "userId": "a80d317c-1aa1-4aed-b70a-0709919ffefc",
            "insuranceId": "KU92027238922",
            "patientFirstName": "Carl",
            "self": "true",
            "patientLastName": "Torres"
        }
    ]
}
