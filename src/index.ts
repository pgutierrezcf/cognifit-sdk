import { CognifitSdkError } from './lib/cognifit.sdk.error';
import { CognifitSdkValidator } from './lib/cognifit.sdk.validator';
import { CognifitSdkConfig } from './lib/cognifit.sdk.config';
import { CognifitSdkResponse } from './lib/cognifit.sdk.response';

class CognifitSdk {
  cognifitSdkConfig: CognifitSdkConfig;
  cognifitSdkError: CognifitSdkError;
  cognifitSdkValidator: CognifitSdkValidator;
  initialized: boolean;
  callback: ((data: any) => void) | null;

  constructor() {
    this.cognifitSdkConfig = new CognifitSdkConfig();
    this.cognifitSdkError = new CognifitSdkError();
    this.cognifitSdkValidator = new CognifitSdkValidator();
    this.initialized = false;
    this.callback = null;
  }

  public init(config: CognifitSdkConfig) {
    this.cognifitSdkConfig = config;
    if (!this.cognifitSdkValidator.validateConfig(this.cognifitSdkConfig, this.cognifitSdkError)) {
      this.initialized = false;
    } else {
      const windowIndex = 'fncIdentifierCognifitSdkRef';
      // @ts-ignore
      window[windowIndex] = {
        component: this,
      };
      this.initialized = true;
    }
    return this.initialized;
  }

  public start(type: string, key: string, callback?: ((data: any) => void) | null) {
    if (!this.cognifitSdkValidator.isInitialized(this.initialized, this.cognifitSdkError)) {
      return false;
    }
    if (!this.cognifitSdkValidator.validateConfig(this.cognifitSdkConfig, this.cognifitSdkError)) {
      return false;
    }
    if (!this.cognifitSdkValidator.validate(type, key, this.cognifitSdkError)) {
      return false;
    }
    this.callback = (callback) ? callback : null;
    this.printIframe(type, key);
    return true;
  }

  public iframeUrlChanged(): void {
    const cognifitAccessIframe = document.getElementById('cognifitSdkIframe');
    // tslint:disable-next-line:no-console
    console.log(cognifitAccessIframe);
    try {
      // @ts-ignore
      const cognifitAccessIframeHref = cognifitAccessIframe.contentWindow.location.href;
      const cognifitAccessResonpeParams = new CognifitSdkResponse(cognifitAccessIframeHref).getResponseParams();
      // tslint:disable-next-line:no-console
      cognifitAccessIframe?.remove();
      if (this.callback) {
        this.callback(cognifitAccessResonpeParams);
        this.callback = null;
      }
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log('ARRRRRRG');
    }
  }

  private printIframe(type: string, key: string): void {
    document.body.insertAdjacentHTML(
      'beforeend',
      '<iframe id="cognifitSdkIframe" style="' +
        this.getIframeStyle() +
        '" title="CogniFit Access" width="100%" height="100%" src="' +
        this.cognifitSdkConfig.getIframeUrl(type, key) +
        '" onload="window.fncIdentifierCognifitSdkRef.component.iframeUrlChanged();"></iframe>',
    );
  }

  private getIframeStyle(): string {
    return 'position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; overflow: hidden;';
  }

}

export const cognifitSdk = new CognifitSdk();
