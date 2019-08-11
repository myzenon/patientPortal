*** Settings ***
Resource         pom/resource.robot
Test Setup       Open Arine Web
Test Teardown    Reset User Workflow    ${robottestuser}

*** Variables ***
${robottestuser}    robottest-donniewilson@mailinator.com

*** Test Cases ***
Verify Register by Start My Review with valid Health Plan Identification Number
    [Tags]    FixLater
    Go to    ${WELCOME URL}login
    Wait Until Page Contains     Member Sign In
    Click Element    ${btnNewRegistration}
    Wait Until Page Contains    We will help you understand your medicines and use them safely.
    Page Should Contain    Start My Review
    Click Element    ${btnNextWelcomeNew}
    Wait Until Page Contains    Help me find my Health Plan Identification Number
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
    Page Should Contain    Donnie Wilson
    ${box text}=       Get Value    ${txtAddresslineoneConfirmInfo}
    Should Be Equal    365 Lawrence Ave.    ${box text}
    ${box text}=       Get Value    ${txtAddresslinetwoConfirmInfo}
    Should Be Equal    ${EMPTY}    ${box text}
    ${box text}=       Get Value    ${txtCityConfirmInfo}
    Should Be Equal    Monsey   ${box text}
    ${box text}=       Get Selected List Label    ${ddlStateConfirmInfo}
    Should Be Equal    New York   ${box text}
    ${box text}=       Get Value    ${txtZipCodeConfirmInfo}
    Should Be Equal    10952   ${box text}
    ${box text}=       Get Value    ${txtPhoneNumberConfirmInfo}
    Should Be Equal    782-444-2020   ${box text}
    ${box text}=       Get Value    ${txtEmailToSendInformationToConfirmInfo}
    Should Be Equal    robottest-donniewilson@mailinator.com   ${box text}
    Sleep    5s
