import { CognifitSdkError } from './cognifit.sdk.error';
import { CognifitSdkConfig } from './cognifit.sdk.config';
import { CognifitSdk } from '../index';

export class CognifitSdkValidator {
  types = ['ASSESSMENT', 'TRAINING', 'GAME', 'GAMEPICKER'];

  public validateAllToStart(cognifitSdk: CognifitSdk, type: string, key: string) {
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkValidator.validateAllToStart 1');
    if (!this.isInitialized(cognifitSdk.initialized, cognifitSdk.cognifitSdkError)) {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdkValidator.validateAllToStart 2');
      return false;
    }
    if (!this.validateConfig(cognifitSdk.cognifitSdkConfig, cognifitSdk.cognifitSdkError)) {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdkValidator.validateAllToStart 3');
      return false;
    }
    if (!this.validate(type, key, cognifitSdk.cognifitSdkError)) {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdkValidator.validateAllToStart 4');
      return false;
    }
    if (!this.validateLoadedResource(cognifitSdk.cognifitSdkConfig, cognifitSdk.cognifitSdkError)) {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdkValidator.validateAllToStart 5');
      return false;
    }
    return true;
  }

  public validateConfig(config: CognifitSdkConfig, cognifitSdkError: CognifitSdkError) {
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkValidator.validateConfig 1');
    if (config.clientId === '') {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdkValidator.validateConfig 2');
      cognifitSdkError.setError(cognifitSdkError.ERROR_CLIENT_ID);
      return false;
    }
    if (config.accessToken === '') {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdkValidator.validateConfig 3');
      cognifitSdkError.setError(cognifitSdkError.ERROR_ACCESS_TOKEN);
      return false;
    }
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkValidator.validateConfig 4');
    cognifitSdkError.setError(cognifitSdkError.NOT_ERROR);
    return true;
  }

  /** Private functions */

  private validate(type: string, key: string, cognifitSdkError: CognifitSdkError) {
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkValidator.validate 1');
    if (!this.isContainerValid()) {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdkValidator.validate 2');
      cognifitSdkError.setError(cognifitSdkError.ERROR_CONTAINER);
      return false;
    }

    if (!this.isAccessTokenValid()) {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdkValidator.validate 3');
      cognifitSdkError.setError(cognifitSdkError.ERROR_ACCESS_TOKEN);
      return false;
    }

    if (this.types.indexOf(type) === -1) {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdkValidator.validate 4');
      cognifitSdkError.setError(cognifitSdkError.ERROR_TYPE);
      return false;
    }

    if (!key) {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdkValidator.validate 4');
      cognifitSdkError.setError(cognifitSdkError.ERROR_KEY);
      return false;
    }

    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkValidator.validate 5');
    cognifitSdkError.setError(cognifitSdkError.NOT_ERROR);
    return true;
  }

  private isInitialized(initialized: boolean, cognifitSdkError: CognifitSdkError) {
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkValidator.isInitialized 1');
    if (!initialized) {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdkValidator.isInitialized 2');
      cognifitSdkError.setError(cognifitSdkError.ERROR_INITIALIZED);
      return false;
    }
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkValidator.isInitialized 3');
    cognifitSdkError.setError(cognifitSdkError.NOT_ERROR);
    return true;
  }

  private validateLoadedResource(config: CognifitSdkConfig, cognifitSdkError: CognifitSdkError) {
    if (!config.resourceHtml5Loader) {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdkValidator.validateLoadedResource 1');
      cognifitSdkError.setError(cognifitSdkError.ERROR_RESOURCE_NOT_LOADED);
      return false;
    }
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkValidator.validateLoadedResource 2');
    return true;
  }

  private isContainerValid() {
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkValidator.isContainerValid 1');
    // TODO search container
    return true;
  }

  private isAccessTokenValid() {
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkValidator.isAccessTokenValid 1');
    // TODO validate before sending
    return true;
  }
}
