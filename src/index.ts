import { CognifitSdkError } from './lib/cognifit.sdk.error';
import { CognifitSdkValidator } from './lib/cognifit.sdk.validator';
import { CognifitSdkConfig } from './lib/cognifit.sdk.config';

export class CognifitSdk {
  cognifitSdkConfig = new CognifitSdkConfig();
  cognifitSdkError = new CognifitSdkError();
  cognifitSdkValidator = new CognifitSdkValidator();
  initialized = false;

  public init(config: CognifitSdkConfig): Promise<string> {
    return new Promise((resolve, reject) => {
      this.cognifitSdkConfig = config;
      this.initialized = this.cognifitSdkValidator.validateConfig(this.cognifitSdkConfig, this.cognifitSdkError);
      if (this.initialized) {
        this.cognifitSdkConfig.loadResource(resolve, reject);
      } else {
        reject('Check cognifitSdkError');
      }
    });
  }

  public start(type: string, key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.cognifitSdkValidator.validateAllToStart(this, type, key)) {
        this.cognifitSdkConfig.loadMode(type, key, resolve, reject);
      } else {
        reject('Check cognifitSdkError');
      }
    });
  }
}
