*** Variables ***
${btnNextWelcomeNew}    //*[@id="welcomeNewbtn"]
${imageLogoWelcomeNew}    //*[@id="router-wrapper"]/div[1]/div/div[1]/div[1]/a
${btnCaregiverRegistrationWelcomeNew}    //*[@id="btnCaregiverRegistrationWelcomeNew"]

*** Keywords ***
Button Next should contain on Welcome New Page
    Wait Until Page Contains Element     ${btnNextWelcomeNew}
    Page Should Contain Button    ${btnNextWelcomeNew}

Click Button Next on Welcome New Page
    Wait Until Page Contains Element     ${btnNextWelcomeNew}
    Click Button    ${btnNextWelcomeNew}

Image Logo should contain on Welcome New Page
    Wait Until Page Contains Element     ${imageLogoWelcomeNew}
    Page Should Contain Element    ${imageLogoWelcomeNew}

Click Image Logo on Welcome New Page
    Wait Until Page Contains Element     ${imageLogoWelcomeNew}
    Click Element    ${imageLogoWelcomeNew}
