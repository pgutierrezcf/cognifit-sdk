import { CognifitSdkError } from './cognifit.sdk.error';

export class CognifitSdkValidator {

  types = ['ASSESSMENT', 'TRAINING', 'GAME'];

  public validate(type: string, key: string, cognifitSdkError: CognifitSdkError) {

    if(!this.isContainerValid()){
      cognifitSdkError.setError(cognifitSdkError.ERROR_CONTAINER);
      return false;
    }

    if(!this.isAccessTokenValid()){
      cognifitSdkError.setError(cognifitSdkError.ERROR_ACCESS_TOKEN);
      return false;
    }

    if(this.types.indexOf(type) === -1){
      cognifitSdkError.setError(cognifitSdkError.ERROR_TYPE);
      return false;
    }

    if(!key){
      cognifitSdkError.setError(cognifitSdkError.ERROR_KEY);
      return false;
    }

    cognifitSdkError.setError(cognifitSdkError.NOT_ERROR);
    return true;
  }

  public isContainerValid() {
    return true;
  };

  public isAccessTokenValid() {
    return true;
  };

};
