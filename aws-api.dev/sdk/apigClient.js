/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }


    // extract endpoint and path from url
    var invokeUrl = 'https://26ep2rwsci.execute-api.us-east-1.amazonaws.com/dev';
    //var invokeUrl = 'https://3xccyjsbh6.execute-api.us-east-1.amazonaws.com/dev';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);



    apigClient.fhirActiveQuestionnaireGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['code'], ['body']);

        var fhirActiveQuestionnaireGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/active-questionnaire').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['code']),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirActiveQuestionnaireGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirActiveQuestionnaireOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var fhirActiveQuestionnaireOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/active-questionnaire').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirActiveQuestionnaireOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirCmrGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['patientId'], ['body']);

        var fhirCmrGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/cmr').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['patientId']),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirCmrGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirCmrOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var fhirCmrOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/cmr').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirCmrOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirCmrIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);

        var fhirCmrIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/cmr/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirCmrIdGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirCmrIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);

        var fhirCmrIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/cmr/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirCmrIdPutRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirCmrIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var fhirCmrIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/cmr/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirCmrIdOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirMedicationReviewGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['patient_id'], ['body']);

        var fhirMedicationReviewGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/medication-review').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['patient_id']),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirMedicationReviewGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirMedicationReviewOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var fhirMedicationReviewOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/medication-review').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirMedicationReviewOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirMedicationStatementIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);

        var fhirMedicationStatementIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/medication-statement/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirMedicationStatementIdGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirMedicationStatementIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);

        var fhirMedicationStatementIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/medication-statement/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirMedicationStatementIdPutRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirMedicationStatementIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var fhirMedicationStatementIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/medication-statement/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirMedicationStatementIdOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirMedicationStatementsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['patient_id'], ['body']);

        var fhirMedicationStatementsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/medication-statements').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['patient_id']),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirMedicationStatementsGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirMedicationStatementsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var fhirMedicationStatementsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/medication-statements').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirMedicationStatementsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirMedicationStatementsIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);

        var fhirMedicationStatementsIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/medication-statements/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirMedicationStatementsIdGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirMedicationStatementsIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);

        var fhirMedicationStatementsIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/medication-statements/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirMedicationStatementsIdPutRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirMedicationStatementsIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var fhirMedicationStatementsIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/medication-statements/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirMedicationStatementsIdOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirOrganizationsIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);

        var fhirOrganizationsIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/organizations/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirOrganizationsIdGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirOrganizationsIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var fhirOrganizationsIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/organizations/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirOrganizationsIdOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirPatientQuestionnaireResponsePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var fhirPatientQuestionnaireResponsePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/patient-questionnaire-response').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirPatientQuestionnaireResponsePostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirPatientQuestionnaireResponseOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var fhirPatientQuestionnaireResponseOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/patient-questionnaire-response').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirPatientQuestionnaireResponseOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirPatientsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['insurance_id'], ['body']);

        var fhirPatientsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/patients').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['insurance_id']),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirPatientsGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirPatientsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var fhirPatientsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/patients').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirPatientsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirPatientsIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);

        var fhirPatientsIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/patients/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirPatientsIdGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirPatientsIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);

        var fhirPatientsIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/patients/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirPatientsIdPutRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fhirPatientsIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var fhirPatientsIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/fhir/patients/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fhirPatientsIdOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.sanityCheckGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var sanityCheckGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sanity-check').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(sanityCheckGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.sanityCheckOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var sanityCheckOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sanity-check').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(sanityCheckOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.smartQuestionsIdsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['ids'], ['body']);

        var smartQuestionsIdsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/smart-questions/{ids}').expand(apiGateway.core.utils.parseParametersToObject(params, ['ids'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(smartQuestionsIdsGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.smartQuestionsIdsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var smartQuestionsIdsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/smart-questions/{ids}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(smartQuestionsIdsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersForgotPasswordPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersForgotPasswordPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/users/forgot-password').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersForgotPasswordPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersForgotPasswordOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersForgotPasswordOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/forgot-password').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersForgotPasswordOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersLoginPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersLoginPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/users/login').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersLoginPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersLoginOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersLoginOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/login').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersLoginOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersLogoutPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersLogoutPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/users/logout').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersLogoutPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersLogoutOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersLogoutOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/logout').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersLogoutOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersLookupInsuranceIdPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersLookupInsuranceIdPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/users/lookup-insurance-id').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersLookupInsuranceIdPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersLookupInsuranceIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersLookupInsuranceIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/lookup-insurance-id').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersLookupInsuranceIdOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersLookupInsuranceIdPost_1 = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersLookupInsuranceIdPost_1Request = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/users/lookup_insurance_id').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersLookupInsuranceIdPost_1Request, authType, additionalParams, config.apiKey);
    };


    apigClient.usersOrganizationPolicyGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['token'], ['body']);

        var usersOrganizationPolicyGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/users/organization-policy').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['token']),
            body: body
        };


        return apiGatewayClient.makeRequest(usersOrganizationPolicyGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersOrganizationPolicyOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersOrganizationPolicyOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/organization-policy').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersOrganizationPolicyOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersOrganizationPolicyIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);

        var usersOrganizationPolicyIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/users/organization-policy/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersOrganizationPolicyIdGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersOrganizationPolicyIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersOrganizationPolicyIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/organization-policy/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersOrganizationPolicyIdOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersRegisterPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersRegisterPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/users/register').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersRegisterPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersRegisterOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersRegisterOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/register').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersRegisterOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersResetUserPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersResetUserPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/users/reset-user').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersResetUserPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersResetUserOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersResetUserOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/reset-user').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersResetUserOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersUpdatePasswordPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersUpdatePasswordPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/users/update-password').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersUpdatePasswordPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersUpdatePasswordOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersUpdatePasswordOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/update-password').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersUpdatePasswordOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersVerifyPatientPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersVerifyPatientPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/users/verify-patient').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersVerifyPatientPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersVerifyPatientOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersVerifyPatientOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/verify-patient').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersVerifyPatientOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usersVerifyPatientPost_2 = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usersVerifyPatientPost_2Request = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/users/verify_patient').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usersVerifyPatientPost_2Request, authType, additionalParams, config.apiKey);
    };


    return apigClient;
};
