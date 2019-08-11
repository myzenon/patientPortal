*** Variables ***
${sectionPhoneHelpMeFinal}    //*[@id="router-wrapper"]/div[2]/div/p[4]

*** Keywords ***
Phone Section should be display on Help Me Final Page
    Wait Until Page Contains Element     ${sectionPhoneHelpMeFinal}
    Page Should Contain     1-800-555-0155