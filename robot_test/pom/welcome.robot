*** Variables ***
${imageLogoWelcome}            //*[@id="router-wrapper"]/div[2]/div/div[1]/div/img
${sectionWelComeWelcome}       //*[@id="router-wrapper"]/div[2]/div/div[2]/div
${sectionQuestionWelcome}      //*[@id="router-wrapper"]/div[2]/div/div[3]/div
${btnYesWelcome}               //*[@id="welcome-button-yes"]
${btnNoWelcome}                //*[@id="welcome-button-no"]
${sectionHintWelcome}          //*[@id="router-wrapper"]/div[2]/div/div[5]/div/div
${btnSignOut}                  //*[@id="signout"]

*** Keywords ***
Click Button No on Welcome Page
    Wait Until Page Contains Element     ${btnNoWelcome}
    Click Button    ${btnNoWelcome}

Click Button Yes on Welcome Page
    Wait Until Page Contains Element     ${btnYesWelcome}
    Click Button    ${btnYesWelcome}

Title Page should be display on Welcome Page
    Wait Until Page Contains Element     ${btnYesWelcome}
    Wait Until Page Contains Element     ${btnNoWelcome}
    Title Should Be    Arine.io - ENGAGE. CONNECT. SIMPLIFY.

Button Yes should contain on Welcome Page
    Wait Until Page Contains Element     ${btnYesWelcome}
    Page Should Contain Button    ${btnYesWelcome}

Button No should contain on Welcome Page
    Wait Until Page Contains Element     ${btnNoWelcome}
    Page Should Contain Button    ${btnNoWelcome}

Hint Section should be display on Welcome Page
    Wait Until Page Contains Element     ${sectionHintWelcome}
    Page Should Contain     Hint
    Page Should Contain     If you want to learn how to use Arine again, just click NO, we'll take you through everything you need to know!

Question Section should be display on Welcome Page
    Wait Until Page Contains Element     ${sectionQuestionWelcome}
    Page Should Contain     Have you used Arine before?

Welcome Section should be display on Welcome Page
    Wait Until Page Contains Element     ${sectionWelComeWelcome}
    Page Should Contain     Member Sign In

Image Logo should be display on Welcome Page
    Wait Until Page Contains Element     ${imageLogoWelcome}
    Page Should Contain Image    ${imageLogoWelcome}
