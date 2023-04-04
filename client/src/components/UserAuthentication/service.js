import { CognitoUserPool } from 'amazon-cognito-identity-js';

export const getCurrentUser = () => {

    var poolData = {
        UserPoolId: 'us-east-1_EkjFYpdbS', // Your user pool id here
        ClientId: '6nn6ndlp7399351lsc6kuj0j9', // Your client id here
    };


    return new CognitoUserPool(poolData).getCurrentUser();

}