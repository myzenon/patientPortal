*** Settings ***
Resource         pom/resource.robot
Test Setup       Open Arine Web
Test Teardown    Reset User Workflow    ${robottestuser}

*** Variables ***
${robottestuser}    robottest-donniewilson@mailinator.com

*** Test Cases ***
Verify Navbar on login Page
    [Tags]  Dev
    Wait Until Page Contains     Member Sign In
    Wait Until Page Contains     Help
    #Click on Help Navbar
    Click Element    //*[@id="router-wrapper"]/div[1]/div/div[2]/span

    #Click on Contract Us Navbar
    Click Element    //*[@id="router-wrapper"]/div[1]/div/div[2]/span/ul/li[1]
    Wait Until Page Contains     Give us a call and we'll sort it out
    Wait Until Page Contains     (Don't worry, it's free!)
    Wait Until Page Contains     1-833-ArineRx (1-833-274-6379)
    Wait Until Page Contains     Member Sign In

Verify Navbar My Progress
    [Tags]  FixLater
    Register Workflow
    Wait Until Page Contains     My Progress
    Click Element    //*[@id="router-wrapper"]/div[1]/div/div[1]/span
    Wait Until Page Contains      You have told us about
    Wait Until Page Contains      of your medications:
    Wait Until Page Contains      There are
    Wait Until Page Contains      we need to ask you about.

Verify Navbar Profile
    [Tags]  FixLater
    Register Workflow
    Wait Until Page Contains     DW
    Click Element    //*[@id="router-wrapper"]/div[1]/div/div[2]/span[2]
    Wait Until Page Contains      Account Info ...
    Wait Until Page Contains      My Doctor
    Wait Until Page Contains      Dashboard ...
    Wait Until Page Contains      Sign Out

    #Click to verify Account Info on Navbar
    Click Element    //*[@id="router-wrapper"]/div[1]/div/div[2]/span[2]/span[2]/ul/li[1]
    Wait Until Page Contains      Donnie Wilson

    #Click to verify My Doctor on Navbar
    Click Element    //*[@id="router-wrapper"]/div[1]/div/div[2]/span[2]
    Click Element    //*[@id="router-wrapper"]/div[1]/div/div[2]/span[2]/span[2]/ul/li[2]
    Wait Until Page Contains      Please select your main doctor?

    #Click to verify Dashboard on Navbar
    Click Element    //*[@id="router-wrapper"]/div[1]/div/div[2]/span[2]
    Click Element    //*[@id="router-wrapper"]/div[1]/div/div[2]/span[2]/span[2]/ul/li[3]
    Wait Until Page Contains      Donnie, you have 4 steps remaining before your review is complete

    #Click to verify Sign Out on Navbar
    Click Element    //*[@id="router-wrapper"]/div[1]/div/div[2]/span[2]
    Click Element    //*[@id="router-wrapper"]/div[1]/div/div[2]/span[2]/span[2]/ul/li[4]
    Wait Until Page Contains      Member Sign In
