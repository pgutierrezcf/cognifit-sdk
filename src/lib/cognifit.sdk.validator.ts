import { CognifitSdkError } from './cognifit.sdk.error';
import { CognifitSdkConfig } from './cognifit.sdk.config';
import { CognifitSdk } from '../index';

export class CognifitSdkValidator {
  types = ['ASSESSMENT', 'TRAINING', 'GAME'];

  public validateAllToStart(cognifitSdk: CognifitSdk, type: string, key: string) {
    if (!this.isInitialized(cognifitSdk.initialized, cognifitSdk.cognifitSdkError)) {
      return false;
    }
    if (!this.validateConfig(cognifitSdk.cognifitSdkConfig, cognifitSdk.cognifitSdkError)) {
      return false;
    }
    if (!this.validate(type, key, cognifitSdk.cognifitSdkError)) {
      return false;
    }
    if (!this.validateLoadedResource(cognifitSdk.cognifitSdkConfig, cognifitSdk.cognifitSdkError)) {
      return false;
    }
    return true;
  }

  public validateConfig(config: CognifitSdkConfig, cognifitSdkError: CognifitSdkError) {
    if (config.clientId === '') {
      cognifitSdkError.setError(cognifitSdkError.ERROR_CLIENT_ID);
      return false;
    }
    if (config.accessToken === '') {
      cognifitSdkError.setError(cognifitSdkError.ERROR_ACCESS_TOKEN);
      return false;
    }
    cognifitSdkError.setError(cognifitSdkError.NOT_ERROR);
    return true;
  }

  /** Private functions */

  private validate(type: string, key: string, cognifitSdkError: CognifitSdkError) {
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

  private isInitialized(initialized: boolean, cognifitSdkError: CognifitSdkError) {
    if (!initialized) {
      cognifitSdkError.setError(cognifitSdkError.ERROR_INITIALIZED);
      return false;
    }
    cognifitSdkError.setError(cognifitSdkError.NOT_ERROR);
    return true;
  }

  private validateLoadedResource(config: CognifitSdkConfig, cognifitSdkError: CognifitSdkError) {
    if (!config.resourceHtml5Loader) {
      cognifitSdkError.setError(cognifitSdkError.ERROR_RESOURCE_NOT_LOADED);
      return false;
    }
    return true;
  }

  private isContainerValid() {
    // TODO search container
    return true;
  }

  private isAccessTokenValid() {
    // TODO validate before sending
    return true;
  }
}
