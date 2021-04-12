import { CognifitSdkError } from './lib/cognifit.sdk.error';
import { CognifitSdkValidator } from './lib/cognifit.sdk.validator';
import { CognifitSdkConfig } from './lib/cognifit.sdk.config';

export class CognifitSdk {
  cognifitSdkConfig = new CognifitSdkConfig();
  cognifitSdkError = new CognifitSdkError();
  cognifitSdkValidator = new CognifitSdkValidator();
  initialized = false;

  public init(config: CognifitSdkConfig): Promise<string> {
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdk.init');
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdk.init 1');
      this.cognifitSdkConfig = config;
      this.initialized = this.cognifitSdkValidator.validateConfig(this.cognifitSdkConfig, this.cognifitSdkError);
      // tslint:disable-next-line:no-console
      console.log(this.initialized);
      if (this.initialized) {
        // tslint:disable-next-line:no-console
        console.log('*** JSDK *** CognifitSdk.init 2');
        this.cognifitSdkConfig.loadResource(resolve, reject);
      } else {
        // tslint:disable-next-line:no-console
        console.log('*** JSDK *** CognifitSdk.init cognifitSdkError');
        reject('Check cognifitSdkError');
      }
    });
  }

  public start(type: string, key: string): Promise<any> {
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdk.start');
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdk.1');
      // tslint:disable-next-line:no-console
      console.log(type);
      // tslint:disable-next-line:no-console
      console.log(key);
      if (this.cognifitSdkValidator.validateAllToStart(this, type, key)) {
        // tslint:disable-next-line:no-console
        console.log('*** JSDK *** CognifitSdk.start 1');
        this.cognifitSdkConfig.loadMode(type, key, resolve, reject);
      } else {
        // tslint:disable-next-line:no-console
        console.log('*** JSDK *** CognifitSdk.start cognifitSdkError');
        reject('Check cognifitSdkError');
      }
    });
  }
}
