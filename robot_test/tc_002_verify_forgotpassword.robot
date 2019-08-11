*** Settings ***
Resource         pom/resource.robot
Test Setup       Open Arine Web
Test Teardown    Close Arine Web

*** Test Cases ***
Verify Forgot Password empty email
    [Tags]  Dev
    Go to    ${WELCOME URL}login
    Click Element    ${linkForgotPasswordLogin}
    Click Element    ${btnForpasswordSendEmailLogin}
    Wait Until Page Contains    Please enter a valid email address.

Verify Forgot Password invalid format email
    [Tags]  Dev
    Go to    ${WELCOME URL}login
    Click Element    ${linkForgotPasswordLogin}
    Input Text    ${txtForpasswordEmailLogin}    test
    Click Element    ${btnForpasswordSendEmailLogin}
    Wait Until Page Contains    Please enter a valid email address.

Verify Forgot Password Email Sent
    [Tags]  Dev
    Go to    ${WELCOME URL}login
    Click Element    ${linkForgotPasswordLogin}
    Input Text    ${txtForpasswordEmailLogin}    test@test.com
    Click Element    ${btnForpasswordSendEmailLogin}
    Wait Until Page Contains    Password reset email has been sent!    10s
