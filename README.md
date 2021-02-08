# CogniFit SDK

Connect your Angular web apps with CogniFit. Launch CogniFit session for your users.

---

### Requirements

- Contact CogniFit to register your partner and get your credentials. 

- Use the [CogniFit API](https://api.cognifit.com/) or the [CogniFit PHP SDK](https://packagist.org/packages/cognifit/cognifit-sdk-php) to register users on CogniFit and to get access tokens.

---

### Installation

      $ npm install @cognifit/launcher-js-sdk@@latest

---

### Usage

- #### Request a CogniFit user access token 
  Use the [CogniFit API](https://api.cognifit.com/) or the [CogniFit PHP SDK](https://packagist.org/packages/cognifit/cognifit-sdk-php) to get an active access token for the user.

- ### Initialize CogniFit SDK

    ```js
    import { cognifitSdk } from '@cognifit/launcher-js-sdk';
    import { CognifitSdkConfig } from '@cognifit/launcher-js-sdk/lib/lib/cognifit.sdk.config';
  
  
    containerId: string               // Target container for CogniFitLoading
    clientId: string;                 // Provided by CogniFit agent
    clientHash: string;               // Provided by CogniFit agent
    callbackUrl: string;              // Must be communicated to CogniFit agent before be used
    cognifitUserAccessToken: string;  // Requested in previous section 
    sandbok: boolean;                 // Default false. Sandbox needs to be allowed by CogniFit agent
    
  
    cognifitSdk.init(new CognifitSdkConfig(
      containerId,
      clientId,
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

--- 

### Response
  The data parameter in the callback function is a json object.
  - status: 
    - completed
    - aborted
    - loginError
  - trainings: Training keys to be done
  - trainingsSessionIds: Session ids completed
  - trainingsDone: Training key completed
  - assessments: Assessment keys to be done
  - assessmentsSessionIds: Assessment keys to be done
  - assessmentsDone: Assessment keys to be done
  - message: If status is loginError

---

### Errors

- #### In initialization
    
    When calling cognifitSdk.init or cognifitSdk.start some errors could be return.
    Error can be retreive using:
    - cognifitSdk.cognifitSdkError.getError()
    - cognifitSdk.cognifitSdkError.getMessage()
      
- #### Launching session
    
    When CognFit loading fails the object received in the callback is:
  
        {status: "loginError", message: "Client do not exists"}

    The error message could be:
    - User do not exists
    - Client do not exists
    - Token is not valid
