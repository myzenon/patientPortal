*** Settings ***
Resource         pom/resource.robot
Test Setup       Open Arine Web
Test Teardown    Reset User Workflow    ${robottestuser}

*** Variables ***
${robottestuser}    robottest-donniewilson@mailinator.com

*** Test Cases ***
Verify fail
    [Tags]    FixLater
    Click Element    ${btnNextConfirmInfo}
Verify Visible meds identified after confirm info and choose doctor and Verify Review Meds and Verify Review Smart Questions
    [Tags]    FixLater
    Register Workflow
    Click Element    ${btnNextConfirmInfo}
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Please select your main doctor?
    Page Should Contain    Please select your main doctor?
    Click Element    ${btnNextPcpQuery}
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Congratulations! You've Completed Step 1
    Page Should Contain    Congratulations! You've Completed Step 1
    Wait Until Page Contains Element    ${btnNextPreparePrepareChapter2}
    Click Element    ${btnNextPreparePrepareChapter2}

    ### Verify Review Meds ###
    Wait Until Page Contains Element    ${btnNextMedsIdentified}
    Click Element    ${btnNextMedsIdentified}

    #Meds LISINOPRIL 40MG
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    LISINOPRIL 40MG
    Page Should Contain    LISINOPRIL 40MG
    Click Element    ${btnYesMedsVerifyDrug}

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Please tell us how you are taking this medication.
    Page Should Contain    Please tell us how you are taking this medication.
    Input Text    ${txtquantityMedsDosingRegimen}    1
    Click Element    ${btnNextMedsDosingRegimen}

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    What did the doctor tell you this medication was for? (Check all that apply)
    Page Should Contain    What did the doctor tell you this medication was for? (Check all that apply)
    Select Checkbox    ${chkOption1MedsWhatFor}
    Select Checkbox    ${chkOption2MedsWhatFor}
    Select Checkbox    ${chkOption3MedsWhatFor}
    #Select Checkbox    ${chkOption4MedsWhatFor}
    #Select Checkbox    ${chkOption5MedsWhatFor}
    #Select Checkbox    ${chkOption6MedsWhatFor}
    Click Element    ${btnNextMedsWhatFor}

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    If you would like to ask our pharmacist anything about
    Page Should Contain    If you would like to ask our pharmacist anything about
    Click Element    ${btnNextMedsAnyOtherQuestions}

    #Meds GLIPIZIDE ER 5MG
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    GLIPIZIDE ER 5MG
    Page Should Contain    GLIPIZIDE ER 5MG
    Click Element    ${btnNoMedsVerifyDrug}

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Why did you stop taking this medication?
    Page Should Contain    Why did you stop taking this medication?
    Click Element    ${btnNextMedsWhyStopped}

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    If you would like to ask our pharmacist anything about
    Page Should Contain    If you would like to ask our pharmacist anything about
    Click Element    ${btnNextMedsAnyOtherQuestions}

    #Meds BYETTA 10MCG/0.04
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    BYETTA 10MCG/0.04
    Page Should Contain    BYETTA 10MCG/0.04
    Click Element    ${btnNoMedsVerifyDrug}

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Why did you stop taking this medication?
    Page Should Contain    Why did you stop taking this medication?
    Click Element    ${btnNextMedsWhyStopped}

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    If you would like to ask our pharmacist anything about
    Page Should Contain    If you would like to ask our pharmacist anything about
    Click Element    ${btnNextMedsAnyOtherQuestions}

    #chpater page Nice Job! You've Completed Step 2
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Nice Job! You've Completed Step 2
    Page Should Contain   Nice Job! You've Completed Step 2
    Click Element    ${btnNextPrepare3}

    #Add medications or herbal
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Are there additional medications or herbal supplements you are taking?
    Page Should Contain   Are there additional medications or herbal supplements you are taking?
    Click Element    ${btnYesMedsOtherMeds}

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Please tell us about this other medication or supplement
    Page Should Contain    Please tell us about this other medication or supplement
    Input Text    ${txtMedicineNameMedsNewMedication}    Aspirin
    Input Text    ${txtDoseMedsNewMedication}     5
    Input Text    ${txtWhatDoYouYakeItForMedsNewMedication}     Fever
    Click Element    ${btnNextMedsNewMedication}

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Please tell us how you are taking this medication.
    Page Should Contain   Please tell us how you are taking this medication.
    Click Element    ${btnNextMedsDosingRegimen}

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    If you would like to ask our pharmacist anything about
    Page Should Contain    If you would like to ask our pharmacist anything about
    Click Element    ${btnNextMedsAnyOtherQuestions}

    #Add medications or herbal
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Are there additional medications or herbal supplements you are taking?
    Page Should Contain   Are there additional medications or herbal supplements you are taking?
    Click Element    ${btnNoMedsOtherMeds}

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Almost Done! You've Completed Step 3
    Page Should Contain    Almost Done! You've Completed Step 3
    Page Should Contain    We now know all the medications you are taking, so our pharmacists can make sure
    Wait Until Page Contains Element    ${btnNextPreparePrepareChapter3}
    Click Element    ${btnNextPreparePrepareChapter3}

    ### Verify Review Smart Questions ###
    Wait Until Page Contains    Do you have any allergies?
    Page Should Contain    Do you have any allergies?
    Page Should Contain Element    ${rbtOptionYesSection1Step1SmartQuestions}
    Page Should Contain Element    ${txtSection1Step1SmartQuestions}
    Page Should Contain Element    ${rbtOptionNoSection1Step1SmartQuestions}
    Click Element    ${rbtOptionNoSection1Step1SmartQuestions}

    Wait Until Page Contains    How often do you have a drink containing alcohol?
    Page Should Contain    How often do you have a drink containing alcohol?
    Page Should Contain Element    ${rbtOption1Section2Step1SmartQuestions}
    Page Should Contain Element    ${rbtOption2Section2Step1SmartQuestions}
    Page Should Contain Element    ${rbtOption3Section2Step1SmartQuestions}
    Click Element    ${rbtOption3Section2Step1SmartQuestions}

    Wait Until Page Contains    In the past, have you ever smoked tobacco?
    Page Should Contain    In the past, have you ever smoked tobacco?
    Page Should Contain Element    ${rbtOption1Section3Step1SmartQuestions}
    Page Should Contain Element    ${rbtOption2Section3Step1SmartQuestions}
    Page Should Contain Element    ${rbtOption3Section3Step1SmartQuestions}
    Click Element    ${rbtOption3Section3Step1SmartQuestions}

    Click Element    ${btnNextSmartQuestions}
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains Element    ${btnNextSmartQuestions}
    Location Should Contain    hedis/2

    Page Should Contain    What was your most recent A1c reading?
    Page Should Contain Element    ${txtSection1Step2SmartQuestions}
    Input Text    ${txtSection1Step2SmartQuestions}    0

    Page Should Contain    Do you test your blood sugar on a regular basis?
    Page Should Contain Element    ${chkOption1Section2Step2SmartQuestions}
    Page Should Contain Element    ${chkOption2Section2Step2SmartQuestions}
    Click Element    ${chkOption2Section2Step2SmartQuestions}

    Wait Until Page Contains    Have you experienced any hypoglycemia or low blood sugars lately? Low blood sugars may cause you to feel: hungry, shaky, nervous, sweaty, dizzy or light-headed, sleepy, confused, have difficulty speaking, anxious, and weak.
    Page Should Contain Element    ${chkOption1Section3Step2SmartQuestions}
    Page Should Contain Element    ${chkOption2Section3Step2SmartQuestions}
    Click Element    ${chkOption2Section3Step2SmartQuestions}

    Click Element    ${btnNextSmartQuestions}
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains Element    ${btnNextSmartQuestions}
    Location Should Contain    hedis/3

    Page Should Contain    Have you received a retinal eye exam in the last 1 or 2 years?
    Page Should Contain Element    ${chkOption1Section1Step3SmartQuestions}
    Page Should Contain Element    ${chkOption2Section1Step3SmartQuestions}
    Click Element    ${chkOption2Section2Step2SmartQuestions}

    Wait Until Page Contains    Have you received a comprehensive foot exam in the last 1 year?
    Page Should Contain Element    ${chkOption1Section2Step3SmartQuestions}
    Page Should Contain Element    ${chkOption2Section2Step3SmartQuestions}
    Click Element    ${chkOption2Section2Step3SmartQuestions}

    Page Should Contain    Have you received a flu vaccine this year after July?
    Page Should Contain Element    ${chkOption1Section3Step3SmartQuestions}
    Page Should Contain Element    ${chkOption2Section3Step3SmartQuestions}
    Click Element    ${chkOption2Section3Step3SmartQuestions}

    Click Element    ${btnNextSmartQuestions}
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    CONGRATULATIONS
    Page Should Contain    CONGRATULATIONS
    Page Should Contain    You've Completed the Questionnaire!
    Logout Workflow

    ### Verify Landing Page ###
    Login Default Arine Web
    Wait Until Page Contains    Account Successfully Created
    #Wait Until Page Contains    of your Medications.
    #Wait Until Page Contains    You have told us about the additional prescription drugs, over the counter drugs and supplements you take.
    #Wait Until Page Contains    You have told us about your health
    #Wait Until Page Contains    We will call you to schedule an appointment with our pharmacist.
    #Wait Until Page Contains Element    //*[@id="router-wrapper"]/div[2]/p[2]/button

    #Click Account Successfully Created
    Click Element    //*[@id="router-wrapper"]/div[2]/div/div[2]/div[2]/a
    Wait Until Page Contains    Donnie Wilson
    Go Back
    Wait Until Page Contains    Finish My Review

    #Click You've told us about of your Medications.
    Click Element    //*[@id="router-wrapper"]/div[2]/div/div[3]/div[2]/a
    Wait Until Page Contains    Click Next to Edit your Medications
    Go Back
    Wait Until Page Contains    Finish My Review

    #Click You have told us about the additional prescription drugs, over the counter drugs and supplements you take.
    Click Element    //*[@id="router-wrapper"]/div[2]/div/div[4]/div[2]/a
    Wait Until Page Contains    Click Next to Edit your OTC Medications
    Go Back
    Wait Until Page Contains    Finish My Review

    #Click You have told us about your health
    Click Element    //*[@id="router-wrapper"]/div[2]/div/div[5]/div[2]/a
    Wait Until Page Contains    Almost Done! You've Completed Step 3
    Capture Page Screenshot
    Go Back
    Wait Until Page Contains    Finish My Review
    Capture Page Screenshot
