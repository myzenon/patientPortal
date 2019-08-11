*** Settings ***
Resource         pom/resource.robot
Test Setup       Open Arine Web
Test Teardown    Close Arine Web

*** Test Cases ***
Verify user is not able to login with empty email and password
    [Tags]  Dev
    Login Workflow    ${EMPTY}    ${EMPTY}
    Page Should Contain    Email is empty.
    Page Should Contain    Password is empty.

Verify user is not able to login with empty email
    [Tags]  Dev
    Login Workflow    ${EMPTY}    ctorresPassword1#
    Page Should Contain    Email is empty.
    Page Should not Contain    Password is empty.

Verify user is not able to login with empty password
    [Tags]  Dev
    Login Workflow    robottest-ctorres@mailinator.com    ${EMPTY}
    Page Should not Contain    Email is empty.
    Page Should Contain    Password is empty.

Verify user is not able to login with invalid email and password
    [Tags]  Dev
    Login Workflow    robottest-test@mailinator.com    123456
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains     Error: Wrong email or password.
    Page Should Contain    Error: Wrong email or password.

Verify user is not able to login with invalid email
    [Tags]  Dev
    Login Workflow    ctorres1@mailinator.com    ctorresPassword1#
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains     Error: Wrong email or password.
    Page Should Contain    Error: Wrong email or password.

Verify user is not able to login with invalid password
    [Tags]  Dev
    Login Workflow    robottest-ctorres@mailinator.com    test
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains     Error: Wrong email or password.
    Page Should Contain    Error: Wrong email or password.

Verify show password
    [Tags]  Dev
    Go to    ${WELCOME URL}login
    Wait Until Page Contains Element    ${btnSigninLogin}
    Input Text     ${txtPasswordLogin}    test
    Page Should Not Contain    test
    Click Element    ${btnShowPasswordLogin}
    ${password}=     Execute JavaScript    return document.querySelector('#router-wrapper > div.container-fluid > div > div > form > div:nth-child(2) > input').value
    Should Be Equal    test    ${password}

Verify user is able to login with valid email and password
    [Tags]    Dev
    Login Workflow    robottest-ctorres@mailinator.com    ctorresPassword1#
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains     CT
    Page Should Contain    CT
