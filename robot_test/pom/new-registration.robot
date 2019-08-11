*** Variables ***
${btnNextNewRegistration}    //*[@id="router-wrapper"]/div[2]/div/form/button
${linkHelpmeFindHpidNewRegistration}    //*[@id="router-wrapper"]/div[2]/div/form/div[2]/a
${txtInsertYourHelpPlanIDNewRegistration}    //*[@id="router-wrapper"]/div[2]/div/form/div[1]/input
*** Keywords ***
Link Help me find my Health Plan Identification Number should contain on New Registration Page
    Wait Until Page Contains Element     ${linkHelpmeFindHpidNewRegistration}
    Page Should Contain Element    ${linkHelpmeFindHpidNewRegistration}

Textbox Insert Your Help Plan ID should contain on New Registration Page
    Wait Until Page Contains Element     ${txtInsertYourHelpPlanIDNewRegistration}
    Page Should Contain Element    ${txtInsertYourHelpPlanIDNewRegistration}

Help me find my Health Plan Identification Number should be visible on New Registration Page
    Wait Until Page Contains     Help me find my Health Plan Identification Number

Button Next should contain on New Registration Page
    Wait Until Page Contains Element     ${btnNextNewRegistration}
    Page Should Contain Button    ${btnNextNewRegistration}

Click Button Next on New Registration Page
    Wait Until Page Contains Element     ${btnNextNewRegistration}
    Click Button    ${btnNextNewRegistration}

Click Link Help me Find Hpid on New Registration Page
    Wait Until Page Contains Element     ${linkHelpmeFindHpidNewRegistration}
    Execute JavaScript    return document.evaluate('${linkHelpmeFindHpidNewRegistration}', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()
