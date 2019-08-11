*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
Library           String
Library           SeleniumLibrary    30s
Library           XvfbRobot
Resource          welcome.robot
Resource          welcomeNew.robot
Resource          new-registration.robot
Resource          login.robot
Resource          help-me-final.robot
Resource          help-me-find-hpid.robot
Resource          new-registration-hpid-link-confirm.robot
Resource          login.robot
Resource          setup.robot
Resource          prepare.robot
Resource          meds-identified.robot
Resource          meds-identified-landing.robot
Resource          meds-verify-drug.robot
Resource          meds-why-stopped.robot
Resource          meds-any-other-questions.robot
Resource          meds-dosing-regimen.robot
Resource          meds-what-for.robot
Resource          smart-questions.robot
Resource          meds-other-meds.robot
Resource          hedis-check-in.robot
Resource          pcp-query.robot
Resource          confirm-info.robot
Resource          meds-new-medication.robot
Resource          method-delivery.robot
Resource          caregiver-register.robot
Resource          caregiver-patient-lookup.robot
Resource          caregiver-consent.robot
Resource          caregiver-patient-lookup-confirm.robot
Resource          prepare/Chapter2.robot
Resource          prepare/Chapter3.robot

*** Variables ***
${SERVER}         localhost:3006
${WELCOME URL}    http://${SERVER}/
${UserMenu}       //*[@id="router-wrapper"]/div/div/div[2]/span[2]

*** Keywords ***
Open Arine Web
    Start Virtual Display    1920    1080
    #Open Browser    ${WELCOME URL}    chrome
    Open Browser    ${WELCOME URL}   ${BROWSER}
    Set Window Size    1920    1080

Close Arine Web
    Close Browser

Login Default Arine Web
    #Button Yes should contain on Welcome Page
    #Click Button Yes on Welcome Page
    #Click Button Patient on Patient or Caregiver Page
    Go to    ${WELCOME URL}
    Input Text   ${txtEmailLogin}    robottest-donniewilson@mailinator.com
    Input Text    ${txtPasswordLogin}    ctorresPassword1#
    Click Element    ${btnSigninLogin}
    Sleep    0.5s
    #Wait Until Page Contains    Review my Remaining Medications    10s
    Wait Until Loading Section Not Contain On Page

Wait Until Loading Section Not Contain On Page
    Wait Until Page Does Not Contain Element    //*[contains(@class, 'Loading')]    60s

Login Workflow
    [Arguments]    ${username}    ${password}
    Go to    ${WELCOME URL}login
    Wait Until Page Contains Element    ${btnSigninLogin}
    Input Text    ${txtEmailLogin}    ${username}
    Input Text    ${txtPasswordLogin}    ${password}
    Click Element    ${btnSigninLogin}

Reset User Workflow
    [Arguments]    ${resetusername}
    Go to    ${WELCOME URL}robot-test-reset?email=${resetusername}&password=ctorresPassword1%23
    Sleep    10s
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Robot Test Reset
    #Capture Page Screenshot
    Sleep    10s
    Close Arine Web

Logout Workflow
    Click Element   ${UserMenu}
    Sleep    1s
    Wait Until Page Contains    Account
    Click Element    ${btnSignOut}
    Wait Until Page Contains    Member Sign In

Register Workflow
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
    Input Text    ${txtEmailSetup}    robottest-donniewilson@mailinator.com
    Input Text    ${txtPasswordSetup}    ctorresPassword1#
    Input Text    ${txtRePasswordSetup}    ctorresPassword1#
    Click Element    ${chkIhaveReadAndAgreeSetup}
    Click Element    ${btnCreateMyAccountSetup}
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    DW
    Page Should Contain    DW
