import { CognifitSdkError } from './lib/cognifit.sdk.error';
import { CognifitSdkValidator } from './lib/cognifit.sdk.validator';

class CognifitSdk {
  
  container: string;
  accessToken: string;
  cognifitSdkError: CognifitSdkError;
  cognifitSdkValidator: CognifitSdkValidator;
  
  constructor(){
    this.container = '';
    this.accessToken = '';
    this.cognifitSdkError = new CognifitSdkError();
    this.cognifitSdkValidator = new CognifitSdkValidator();
  }
  
  public init(container: string, accessToken: string) {
    this.container = container;
    this.accessToken = accessToken;
  };
  
  public start(type: string, key: string) {
    if(!this.cognifitSdkValidator.validate(type, key, this.cognifitSdkError)){
      return false;
    }

    // this.container = '<div class="two">' + type + ' @ ' + key + '</div>';
    const url = 'https://www.cognifit.com/';
    const iframeStyle = 'position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; overflow: hidden;';
    document.body.innerHTML += '<iframe id="cognifitAccess" style="' + iframeStyle + '" title="CogniFit Access" width="100%" height="100%" src="' + url + '"></iframe>';
	  return true;
  };
  
};

export const cognifitSdk = new CognifitSdk();
