const concat = require('concat-files')
concat (
    [
        './aws-api/header.js',
        // './aws-api/sdk/lib/axios/dist/axios.standalone.js',
        './aws-api/sdk/lib/CryptoJS/rollups/hmac-sha256.js',
        './aws-api/space.js',
        './aws-api/sdk/lib/CryptoJS/rollups/sha256.js',
        './aws-api/space.js',
        './aws-api/sdk/lib/CryptoJS/components/hmac.js',
        './aws-api/space.js',
        './aws-api/sdk/lib/CryptoJS/components/enc-base64.js',
        './aws-api/space.js',
        './aws-api/sdk/lib/url-template/url-template.js',
        './aws-api/sdk/lib/apiGatewayCore/sigV4Client.js',
        './aws-api/sdk/lib/apiGatewayCore/apiGatewayClient.js',
        './aws-api/sdk/lib/apiGatewayCore/simpleHttpClient.js',
        './aws-api/sdk/lib/apiGatewayCore/utils.js',
        './aws-api/sdk/apigClient.js',
        './aws-api/footer.js'
    ],
    './src/libs/aws-api-gateway.js',
    (error, abc) => {
        if (error) throw error 
        console.log('Merge Done.')
    }
)

