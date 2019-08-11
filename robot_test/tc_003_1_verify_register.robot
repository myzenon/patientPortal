*** Settings ***
Resource         pom/resource.robot
Test Setup       Open Arine Web
Test Teardown    Reset User Workflow    ${robottestuser}

*** Variables ***
${robottestuser}    robottest-donniewilson@mailinator.com

*** Test Cases ***
Verify Register by Start My Review with valid Health Plan Identification Number
    [Tags]  FixLater
    ${robottestuser} =    Set Variable    robottest-donniewilson@mailinator.com
    Go to    ${WELCOME URL}login
    Click Element    ${btnNewRegistration}
    Page Should Contain    We will help you understand your medicines and use them safely.
    Page Should Contain    Start My Review
    Click Element    ${btnNextWelcomeNew}
    Input Text    ${txtInsertYourHelpPlanIDNewRegistration}    XD24323237908
    Click Element    ${btnNextNewRegistration}
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Now we just need to make sure it's really you.
    Page Should Contain    Now we just need to make sure it's really you.
    Select From List By Value    ${ddlMonthNewRegistrationhpidlinkconfirm}    12
    Select From List By Value    ${ddlDayNewRegistrationhpidlinkconfirm}    3
    Select From List By Value    ${ddlYearNewRegistrationhpidlinkconfirm}    1939
    Click Element    ${btnNextNewRegistrationhpidlinkconfirm}
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Let's get you set up with an account.
    Page Should Contain    Let's get you set up with an account.
    Input Text    ${txtEmailSetup}    ${robottestuser}
    Input Text    ${txtPasswordSetup}    ctorresPassword1#
    Input Text    ${txtRePasswordSetup}    ctorresPassword1#
    Click Element    ${chkIhaveReadAndAgreeSetup}
    Click Element    ${btnCreateMyAccountSetup}
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    DW
    Page Should Contain    DW
    Logout Workflow

Verify Register by Caregiver Registration with valid Health Plan Identification Number
    [Tags]    FixLater
    #[Tags]    Dev
    ${email} =	Generate Random String	10	[LOWER]
    ${robottestuser} =    Set Variable    robottest-${email}@mailinator.com

    Go to    ${WELCOME URL}login
    Click Element    ${btnNewRegistration}
    Wait Until Page Contains    We will help you understand your medicines and use them safely.
    Page Should Contain    Caregiver Registration
    Click Element    ${btnCaregiverRegistrationWelcomeNew}

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Let's get you set up with a caregiver account .
    Page Should Contain    Let's get you set up with a caregiver account .

    Input Text    ${txtFirstNameCaregiverRegister}    Donnie
    Input Text    ${txtLastNameCaregiverRegister}     Wilson
    Input Text    ${txtEmailCaregiverRegister}     ${robottestuser}
    Input Text    ${txtPasswordCaregiverRegister}     ctorresPassword1#
    Input Text    ${txtRePasswordCaregiverRegister}     ctorresPassword1#
    Click Element    ${chkCertifyCaregiverRegister}
    Click Element    ${btnCreateCaregiverAccountCaregiverRegister}

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Help me find my patient's Health Plan Identification Number
    Page Should Contain    Help me find my patient's Health Plan Identification Number
    Input Text    ${txtHealthPlanIdentificationNumberCaregiverPatientLookup}    XD24323237908
    Press Key    ${txtHealthPlanIdentificationNumberCaregiverPatientLookup}    \\13

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Awesome! It looks like you are trying to help Donnie Wilson today.
    Page Should Contain    Awesome! It looks like you are trying to help Donnie Wilson today.

    Click Element    ${btnNoCaregiverPatientLookupConfirm}
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Help me find my patient's Health Plan Identification Number
    Page Should Contain    Help me find my patient's Health Plan Identification Number
    Input Text    ${txtHealthPlanIdentificationNumberCaregiverPatientLookup}    XD24323237908
    Press Key    ${txtHealthPlanIdentificationNumberCaregiverPatientLookup}    \\13

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Awesome! It looks like you are trying to help Donnie Wilson today.
    Page Should Contain    Awesome! It looks like you are trying to help Donnie Wilson today.

    Click Element    ${btnYesCaregiverPatientLookupConfirm}
    Wait Until Page Contains    Authorize Arine to provide access to my health information to
    Page Should Contain    Authorize Arine to provide access to my health information to

    Select From List By Value    ${ddlMonthCaregiverConsent}    12
    Select From List By Value    ${ddlDayCaregiverConsent}    3
    Select From List By Value    ${ddlYearCaregiverConsent}    1939

    Click Element    ${btnGrantAccessCaregiverConsent}
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Donnie Wilson
    Page Should Contain    Donnie Wilson
    Logout Workflow
