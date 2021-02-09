import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { PackageVersion } from '../environments/version';
import { CognifitSdkResponse } from './cognifit.sdk.response';

export class CognifitSdkConfig {
  containerId: string;
  accessToken: string;
  clientId: string;

  // Extra Configuration
  sandbox: boolean;
  appType: string;
  theme: string;
  showResults: boolean;

  sdkHtml5Version: string;
  jsVersion = '2021-01-29_1627_thorin';

  checkResourceLoadedTimes = 0;
  resourceHtml5Loader = null;

  constructor(containerId: string = '', clientId: string = '', accessToken: string = '', extraConfiguration :any|boolean = {}) {
    this.containerId = containerId;
    this.accessToken = accessToken;
    this.clientId    = clientId;

    /** In 2.0.0, extraConfiguration was sandbox */
    if(typeof extraConfiguration === 'boolean'){
      extraConfiguration = {
        sandbox: extraConfiguration
      };
    }

    // Extra Configuration
    this.sandbox      = (typeof extraConfiguration.sandbox === 'boolean') ? extraConfiguration.sandbox : false;
    this.showResults  = (typeof extraConfiguration.showResults === 'boolean') ? extraConfiguration.showResults : false;
    this.appType      = this.filterAppType(extraConfiguration);
    this.theme        = this.filterTheme(extraConfiguration);

    if (typeof extraConfiguration.jsVersion === 'string' && extraConfiguration.jsVersion) {
      this.sdkHtml5Version = extraConfiguration.jsVersion;
    } else {
      this.sdkHtml5Version = new PackageVersion().getMinor();
    }
  }

  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  loadMode(type: string, key: string, resolve: (value: any) => void, reject: (reason?: any) => void) {
    type = type.toLowerCase() + 'Mode';
    // @ts-ignore
    if (this.resourceHtml5Loader) {
      // @ts-ignore
      this.resourceHtml5Loader.loadMode(this.jsVersion, type, key, this.containerId, this.buildExtraParams());
      window.addEventListener(
        'message',
        (message) => {
          resolve(new CognifitSdkResponse(message.data));
          // @ts-ignore
          document.getElementById(this.containerId).innerHTML = '';
        },
        false,
      );
    }
  }

  async loadResource(resolve: (value: string) => void, reject: (reason?: string) => void) {
    const node = document.createElement('script');
    node.src = await this.getResourceUrl();
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
    this.checkResourceLoadedTimes = 0;
    this.checkResourceLoaded(resolve, reject);
  }

  private checkResourceLoaded(resolve: (value: string) => void, reject: (reason?: string) => void) {
    setTimeout(() => {
      this.checkResourceLoadedTimes++;
      if (this.checkResourceLoadedTimes < 500) {
        // @ts-ignore
        if (typeof window.HTML5JS !== 'undefined') {
          // @ts-ignore
          this.resourceHtml5Loader = window.HTML5JS;
          resolve('CogniFit SDK loaded');
        } else {
          this.checkResourceLoaded(resolve, reject);
        }
      } else {
        reject('Resource not loaded');
      }
    }, 100);
  }

  private async setJsVersion(defaultJsVersion: string) {
    this.jsVersion = defaultJsVersion;
    const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
    let url = this.sandbox ? 'https://preapi.cognifit.com' : 'https://api.cognifit.com';
    url += '/description/versions/sdkjs?v=' + this.sdkHtml5Version;
    const remoteJsVersion = await httpClient.get<any>(url).toPromise();
    if (remoteJsVersion.version) {
      this.jsVersion = remoteJsVersion.version;
    }
  }

  private async getResourceUrl() {
    await this.setJsVersion(this.jsVersion);
    return this.sandbox
      ? 'https://prejs.cognifit.com/' + this.jsVersion + '/html5Loader.js'
      : 'https://js.cognifit.com/' + this.jsVersion + '/html5Loader.js';
  }

  private filterAppType(extraConfiguration: any): string{
    const values = ['web', 'app'];
    if (typeof extraConfiguration.appType === 'string' && extraConfiguration.sandbox) {
      if (values.indexOf(extraConfiguration.appType) > -1) {
        return extraConfiguration.appType;
      }
    }
    return values[0];
  }

  private filterTheme(extraConfiguration: any): string{
    const values = ['light', 'dark'];
    if (typeof extraConfiguration.theme === 'string' && extraConfiguration.theme) {
      if (values.indexOf(extraConfiguration.theme) > -1) {
        return extraConfiguration.theme;
      }
    }
    return values[0];
  }

  private buildExtraParams(): {} {
    return {
        clientId: this.clientId,
        accessToken: this.accessToken,
        environment: this.sandbox ? 'preprod' : 'production',
        appType: this.appType,
        theme: this.theme,
        showResults: this.showResults
    }
  }

}
