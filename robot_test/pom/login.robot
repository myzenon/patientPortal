*** Variables ***
${btnSigninLogin}    //*[@id="btnlogin"]
${txtEmailLogin}    //*[@id="router-wrapper"]/div[2]/div/div[1]/form/span/input
${txtPasswordLogin}    //*[@id="router-wrapper"]/div[2]/div/div[1]/form/div[1]/input
${linkForgotPasswordLogin}    //*[@id="router-wrapper"]/div[2]/div/div[1]/div[1]/span
${btnNewRegistration}    //*[@id="router-wrapper"]/div[2]/div/p[2]/span/a
${txtForpasswordEmailLogin}    //*[@id="router-wrapper"]/div[2]/div[1]/form/div/div[2]/div/input
${btnForpasswordSendEmailLogin}    //*[@id="router-wrapper"]/div[2]/div[1]/form/div/div[3]/button
${btnShowPasswordLogin}    //*[@id="btnShowPassword"]

*** Keywords ***
Button Sign-in should contain on Login Page
    Wait Until Page Contains Element     ${btnSigninLogin}
    Page Should Contain Button    ${btnSigninLogin}

Click Button Sign-in on Login Page
    Wait Until Page Contains Element     ${btnSigninLogin}
    Click Button    ${btnSigninLogin}
