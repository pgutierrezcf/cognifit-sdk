# CogniFit SDK

Connect your Angular web apps with CogniFit. Launch CogniFit session for your users.

---

### Requirements

- Contact CogniFit to register your partner and get your credentials. 

- Use the [CogniFit API](https://api.cognifit.com/) or the [CogniFit PHP SDK](https://packagist.org/packages/cognifit/cognifit-sdk-php) to register users on CogniFit and to get access tokens.

---

### Installation

      $ npm install @cognifit/launcher-js-sdk

---

### Usage

- #### Request a CogniFit user access token 
  Use the [CogniFit API](https://api.cognifit.com/) or the [CogniFit PHP SDK](https://packagist.org/packages/cognifit/cognifit-sdk-php) to get an active access token for the user.

- ### Initialize CogniFit SDK

    ```js
    import { CognifitSdk } from '@cognifit/launcher-js-sdk';
    import { CognifitSdkConfig } from '@cognifit/launcher-js-sdk/lib/lib/cognifit.sdk.config';
  
  
    containerId: string               // Target container for CogniFitLoading.
    clientId: string;                 // Provided by CogniFit agent.
    cognifitUserAccessToken: string;  // Requested in previous section. 
    sandbok: boolean;                 // Default false. Sandbox needs to be allowed by CogniFit agent.
   
    const cognifitSdkConfig = new CognifitSdkConfig(
      containerId,
      clientId,
      cognifitUserAccessToken,
      {
        sandbox: false,
        appType: 'web',           // 'web' or 'app'.
        theme: 'light',           // 'light' or 'dark'.
        showResults: false,
        customCss: '',            // Url to custom css file.
        screensNotToShow: [],     // List of screens not to show after the session.
        preferredMobileOrientation: '', // '' (empty), 'landscape' or 'portrait'. This applies only on mobile browsers or embedded webviews
        scale: 100,               // Default 800. Maximum value used to display values.
        listenEvents: true        // Default false. If true, events will be triggered during session life.
      }   
    );
  
    cognifitSdk.init(cognifitSdkConfig).then(response => {
    
    }).catch(error => {
    
    });
    ```

- ### Launch session

    ```js
    typeValue: string;
    keyValue: string;
  
    cognifitSdk.start(
      typeValue, 
      keyValue
    ).subscribe({
        next: (cognifitSdkResponse) => {
          if (cognifitSdkResponse.isSessionCompleted()) {
            cognifitSdkResponse.typeValue;
            cognifitSdkResponse.keyValue;
          }
          if (cognifitSdkResponse.isSessionAborted()) {
          
          }
          if (cognifitSdkResponse.isErrorLogin()) {

          }
          if (cognifitSdkResponse.isEvent()) {
            const eventPayloadValues = cognifitSdkResponse.eventPayload.getValues();
          }
        },
        complete: () => {
			
		},
        error: (reason) => {
			
		}
    });
    ```

    - typeValue: 'ASSESSMENT', 'TRAINING', 'GAME'
    - keyValue: Get accepted values on [CogniFit API](https://api.cognifit.com)
      - Assessments: [Assessment list](https://cognifitapiv2.docs.apiary.io/#reference/0/cognitive-assessments/assessments-list)
      - Training [Training list](https://cognifitapiv2.docs.apiary.io/#reference/0/brain-training-programs/training-list)
      - Games: [Brain Game List](https://cognifitapiv2.docs.apiary.io/#reference/0/brain-games/brain-game-list)

--- 

### Errors

- #### In initialization
    
    When calling cognifitSdk.init or cognifitSdk.start some errors could be return.
    Error can be retreive using:
    - cognifitSdk.cognifitSdkError.getError()
    - cognifitSdk.cognifitSdkError.getMessage()
      
- #### Launching session

    
