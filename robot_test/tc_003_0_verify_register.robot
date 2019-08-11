*** Settings ***
Resource         pom/resource.robot
Test Setup       Open Arine Web
Test Teardown    Close Arine Web

*** Test Cases ***
Verify Register by Start My Review and Help me find my Health Plan Identification Number
    #[Tags]    FixLater
    [Tags]    Dev
    Go to    ${WELCOME URL}login
    Wait Until Page Contains     Member Sign In
    Click Element    ${btnNewRegistration}
    Wait Until Page Contains     We will help you understand your medicines and use them safely.
    Page Should Contain    We will help you understand your medicines and use them safely.
    Page Should Contain    Start My Review
    Click Element    ${btnNextWelcomeNew}
    Wait Until Page Contains    Help me find my Health Plan Identification Number
    Click Link Help me Find Hpid on New Registration Page
    Wait Until Page Contains     FOUND IT!
    Page Should Contain    DIDN'T FIND IT
    Click Element    ${linkDidNotFindItHelpMeFindHPID}
    Wait Until Page Contains     Give us a call and we'll sort it out
    Page Should Contain    (Don't worry, it's free!)
    Page Should Contain    1-833-274-6379
    Click Element    ${linkDoneMeFindHPID}
    Wait Until Page Contains     FOUND IT!
    Page Should Contain    DIDN'T FIND IT
    Click Element    ${linkFoundItHelpMeFindHPID}
    Wait Until Page Contains    To get started, please enter your
    Page Should Contain    To get started, please enter your

Verify Register by Start My Review with invalid Health Plan Identification Number
    [Tags]  Dev
    Go to    ${WELCOME URL}login
    Wait Until Page Contains    Member Sign In
    Click Element    ${btnNewRegistration}
    Wait Until Page Contains    We will help you understand your medicines and use them safely.
    Page Should Contain    Start My Review
    Click Element    ${btnNextWelcomeNew}
    Wait Until Page Contains    To get started, please enter your
    Input Text    ${txtInsertYourHelpPlanIDNewRegistration}    XD9432Q3237909
    Click Element    ${btnNextNewRegistration}
    Wait Until Page Contains    Uh oh! It looks like you might have entered the wrong number, or we can't find you in our system.

Verify Register with existing Health Plan Identification Number
    [Tags]  Dev
    Go to    ${WELCOME URL}login
    Wait Until Page Contains    Member Sign In
    Click Element    ${btnNewRegistration}
    Wait Until Page Contains    We will help you understand your medicines and use them safely.
    Page Should Contain    Start My Review
    Click Element    ${btnNextWelcomeNew}
    Wait Until Page Contains    To get started, please enter your
    Input Text    ${txtInsertYourHelpPlanIDNewRegistration}    KU92027238922
    Click Element    ${btnNextNewRegistration}
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Uh oh! It looks like this insurance id is already associated with an account.
    Page Should Contain    Uh oh! It looks like this insurance id is already associated with an account.

Verify Register with valid Health Plan Identification Number and existing user email
    [Tags]    FixLater
    #[Tags]    Dev
    Go to    ${WELCOME URL}login
    Wait Until Page Contains    Member Sign In
    Click Element    ${btnNewRegistration}
    Wait Until Page Contains    We will help you understand your medicines and use them safely.
    Page Should Contain    Start My Review
    Click Element    ${btnNextWelcomeNew}
    Wait Until Page Contains    To get started, please enter your
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
    Input Text    ${txtEmailSetup}    robottest-ctorres@mailinator.com
    Input Text    ${txtPasswordSetup}    ctorresPassword1#
    Input Text    ${txtRePasswordSetup}    ctorresPassword1#
    Click Element    ${chkIhaveReadAndAgreeSetup}
    Click Element    ${btnCreateMyAccountSetup}
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    This email address is already registered.
    Page Should Contain    This email address is already registered.

Verify Caregiver Registration with existing user email
    [Tags]    FixLater
    #[Tags]    Dev
    Go to    ${WELCOME URL}login
    Wait Until Page Contains    Member Sign In
    Click Element    ${btnNewRegistration}
    Wait Until Page Contains    We will help you understand your medicines and use them safely.
    Page Should Contain    We will help you understand your medicines and use them safely.
    Page Should Contain    Caregiver Registration
    Click Element    ${btnCaregiverRegistrationWelcomeNew}
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Let's get you set up with a caregiver account .
    Page Should Contain    Let's get you set up with a caregiver account .

    Click Element    ${linkPoliciesCaregiverRegister}
    Wait Until Page Contains    Notice of Privacy Practices
    Page Should Contain    End User License Agreement
    Page Should Contain    Terms and Conditions
    Page Should Contain    Access to Another Adult's Online Medical Record

    Click Element    ${tabPolicies1CaregiverRegister}
    Click Element    ${tabPolicies2CaregiverRegister}
    Click Element    ${tabPolicies3CaregiverRegister}
    Click Element    ${tabPolicies4CaregiverRegister}
    Click Element    ${btnCloseTabPoliciesCaregiverRegister}

    Input Text    ${txtFirstNameCaregiverRegister}    Donnie
    Input Text    ${txtLastNameCaregiverRegister}     Wilson
    Input Text    ${txtEmailCaregiverRegister}     robottest-ctorres@mailinator.com
    Input Text    ${txtPasswordCaregiverRegister}     ctorresPassword1#
    Input Text    ${txtRePasswordCaregiverRegister}     ctorresPassword1#
    Click Element    ${chkCertifyCaregiverRegister}
    Click Element    ${btnCreateCaregiverAccountCaregiverRegister}
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    This email address is already registered.
    Page Should Contain    This email address is already registered.

Verify Caregiver Registration with not existing user email
    [Tags]    FixLater
    #[Tags]    Dev
    Go to    ${WELCOME URL}login
    Wait Until Page Contains    Member Sign In
    Click Element    ${btnNewRegistration}
    Wait Until Page Contains    We will help you understand your medicines and use them safely.
    Page Should Contain    Caregiver Registration
    Click Element    ${btnCaregiverRegistrationWelcomeNew}

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Let's get you set up with a caregiver account .
    Page Should Contain    Let's get you set up with a caregiver account .

    Click Element    ${linkPoliciesCaregiverRegister}
    Wait Until Page Contains    Notice of Privacy Practices
    Page Should Contain    End User License Agreement
    Page Should Contain    Terms and Conditions
    Page Should Contain    Access to Another Adult's Online Medical Record

    Click Element    ${tabPolicies1CaregiverRegister}
    Click Element    ${tabPolicies2CaregiverRegister}
    Click Element    ${tabPolicies3CaregiverRegister}
    Click Element    ${tabPolicies4CaregiverRegister}
    Click Element    ${btnCloseTabPoliciesCaregiverRegister}

    Input Text    ${txtFirstNameCaregiverRegister}    Donnie
    Input Text    ${txtLastNameCaregiverRegister}     Wilson

     ${email} =	Generate Random String	10	[LOWER]
    Input Text    ${txtEmailCaregiverRegister}     robottest-${email}@mailinator.com
    Input Text    ${txtPasswordCaregiverRegister}     ctorresPassword1#
    Input Text    ${txtRePasswordCaregiverRegister}     ctorresPassword1#
    Click Element    ${chkCertifyCaregiverRegister}
    Click Element    ${btnCreateCaregiverAccountCaregiverRegister}
    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Help me find my patient's Health Plan Identification Number
    Page Should Contain    Help me find my patient's Health Plan Identification Number

Verify Register by Caregiver Registration with Help me find my patient's Health Plan Identification Number
    [Tags]    FixLater
    #[Tags]    Dev
    Go to    ${WELCOME URL}login
    Wait Until Page Contains    Member Sign In
    Click Element    ${btnNewRegistration}
    Wait Until Page Contains    We will help you understand your medicines and use them safely.
    Page Should Contain    Caregiver Registration
    Click Element    ${btnCaregiverRegistrationWelcomeNew}

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Let's get you set up with a caregiver account .
    Page Should Contain    Let's get you set up with a caregiver account .

    ${email} =	Generate Random String	10	[LOWER]

    Input Text    ${txtFirstNameCaregiverRegister}    Donnie
    Input Text    ${txtLastNameCaregiverRegister}     Wilson
    Input Text    ${txtEmailCaregiverRegister}     robottest-${email}@mailinator.com
    Input Text    ${txtPasswordCaregiverRegister}     ctorresPassword1#
    Input Text    ${txtRePasswordCaregiverRegister}     ctorresPassword1#
    Click Element    ${chkCertifyCaregiverRegister}
    Click Element    ${btnCreateCaregiverAccountCaregiverRegister}

    Wait Until Loading Section Not Contain On Page
    Wait Until Page Contains    Help me find my patient's Health Plan Identification Number
    Page Should Contain    Help me find my patient's Health Plan Identification Number

    Click Element    ${linkCaregiverPatientLookup}
    Wait Until Page Contains    FOUND IT!
    Page Should Contain    DIDN'T FIND IT
    Click Element    ${linkDidNotFindItHelpMeFindHPID}
    Wait Until Page Contains    Give us a call and we'll sort it out
    Page Should Contain    (Don't worry, it's free!)
    Page Should Contain    1-833-274-6379
    Click Element    ${linkDoneMeFindHPID}
    Wait Until Page Contains    FOUND IT!
    Page Should Contain    DIDN'T FIND IT
    Click Element    ${linkFoundItHelpMeFindHPID}
    Wait Until Page Contains    Help me find my patient's Health Plan Identification Number
