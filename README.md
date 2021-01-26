<h1>CogniFit SDK</h1>

Connect your angular web apps with CogniFit. Launch CogniFit session for your users.

---

### Requirements

- ### Get you CogniFit Partner Credentials
Contact CogniFit to register your partner and get your credentials. 

- ### Register your users on CogniFit and get user access token
Use the [CogniFit API](https://api.cognifit.com/) or the [CogniFit PHP SDK](https://packagist.org/packages/cognifit/cognifit-sdk-php) to register users on CogniFit and to get access tokens.

### Install

  Set your project to access Private Github Package
  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

      $ npm install @daniolivares/cognifit-sdk@1.0.22

### Usage

- #### Request a CogniFit user access token 
  Use the [CogniFit API](https://api.cognifit.com/) or the [CogniFit PHP SDK](https://packagist.org/packages/cognifit/cognifit-sdk-php) to get an active access token for the user.

- ### Initialize CogniFit SDK

    ```js
    import { cognifitSdk } from '@daniolivares/cognifit-sdk';
    import { CognifitSdkConfig } from '@daniolivares/cognifit-sdk/lib/lib/cognifit.sdk.config';
  
  
    clientId: string;
    clientHash: string;
    callbackUrl: string;
    cognifitUserAccessToken: string;
    sandbok: boolean;
    
  
    cognifitSdk.init(new CognifitSdkConfig(
      clientId,
      clientHash,
      callbackUrl,
      cognifitUserAccessToken,
      sandbok
    ));
    ```

- ### Launch session

    ```js
    typeValue: string;
    keyValue: string;
  
    cognifitSdk.start(typeValue, keyValue, function(data) {
      console.log(' +++++ YOUR CALLBACK FUNCTION +++++');
      console.log(data);
    });
    ```

    - typeValue: 'ASSESSMENT', 'TRAINING', 'GAME'
    - keyValue: Get accepted values on [CogniFit API](https://api.cognifit.com)
      - Assessments: [Assessment list](https://cognifitapiv2.docs.apiary.io/#reference/0/cognitive-assessments/assessments-list)
      - Training [Training list](https://cognifitapiv2.docs.apiary.io/#reference/0/brain-training-programs/training-list)
      - Games: [Brain Game List](https://cognifitapiv2.docs.apiary.io/#reference/0/brain-games/brain-game-list)

## Response
  The data parameter in the callback function is a json object.

## Errors

  - In initialization
    

  - Launching session
    {status: "loginError", message: "Client do not exists"}


  
