import { CognifitSdkError } from './cognifit.sdk.error';
import { CognifitSdkConfig } from './cognifit.sdk.config';

export class CognifitSdkValidator {
  types = ['ASSESSMENT', 'TRAINING', 'GAME'];

  public isInitialized(initialized: boolean, cognifitSdkError: CognifitSdkError){
    if(!initialized){
      cognifitSdkError.setError(cognifitSdkError.ERROR_INITIALIZED);
      return false;
    }
    cognifitSdkError.setError(cognifitSdkError.NOT_ERROR);
    return true;
  }

  public validateConfig(config: CognifitSdkConfig, cognifitSdkError: CognifitSdkError){
    if(config.clientId === ''){
      cognifitSdkError.setError(cognifitSdkError.ERROR_CLIENT_ID);
      return false;
    }
    if(config.clientHash === ''){
      cognifitSdkError.setError(cognifitSdkError.ERROR_CLIENT_HASH);
      return false;
    }
    if(config.accessToken === ''){
      cognifitSdkError.setError(cognifitSdkError.ERROR_ACCESS_TOKEN);
      return false;
    }
    cognifitSdkError.setError(cognifitSdkError.NOT_ERROR);
    return true;
  }

  public validate(type: string, key: string, cognifitSdkError: CognifitSdkError) {
    if (!this.isContainerValid()) {
      cognifitSdkError.setError(cognifitSdkError.ERROR_CONTAINER);
      return false;
    }

    if (!this.isAccessTokenValid()) {
      cognifitSdkError.setError(cognifitSdkError.ERROR_ACCESS_TOKEN);
      return false;
    }

    if (this.types.indexOf(type) === -1) {
      cognifitSdkError.setError(cognifitSdkError.ERROR_TYPE);
      return false;
    }

    if (!key) {
      cognifitSdkError.setError(cognifitSdkError.ERROR_KEY);
      return false;
    }

    cognifitSdkError.setError(cognifitSdkError.NOT_ERROR);
    return true;
  }

  public isContainerValid() {
    return true;
  }

  public isAccessTokenValid() {
    return true;
  }
}
