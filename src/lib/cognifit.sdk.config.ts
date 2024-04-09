import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { PackageVersion } from '../environments/version';
import { CognifitSdkResponse } from './cognifit.sdk.response';
import { Subscriber } from 'rxjs';

export class CognifitSdkConfig {
  containerId: string;
  accessToken: string;
  clientId: string;

  // Extra Configuration
  sandbox: boolean;
  appType: string;
  theme: string;
  showResults: boolean;
  customCss: string[];
  preferredMobileOrientation: string; // portrait|landscape
  screensNotToShow: string[];
  scale: number;

  sdkHtml5Version: string;
  jsVersion = '2023-05-23_1058_bofur';
  webhooks: any[] = [];
  customTasks: any = {};
  listenEvents: false;
  additionalAttributesAndFlags = {};

  checkResourceLoadedTimes = 0;
  resourceHtml5Loader = null;

  constructor(
    containerId: string = '',
    clientId: string = '',
    accessToken: string = '',
    extraConfiguration: any | boolean = {},
  ) {
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkConfig.constructor');
    this.containerId = containerId;
    this.accessToken = accessToken;
    this.clientId = clientId;

    /** In 2.0.0, extraConfiguration was sandbox */
    if (typeof extraConfiguration === 'boolean') {
      extraConfiguration = {
        sandbox: extraConfiguration,
      };
    }

    // Extra Configuration
    this.sandbox = typeof extraConfiguration.sandbox === 'boolean' ? extraConfiguration.sandbox : false;
    this.showResults = typeof extraConfiguration.showResults === 'boolean' ? extraConfiguration.showResults : false;
    this.appType = this.filterAppType(extraConfiguration);
    this.theme = this.filterTheme(extraConfiguration);
    this.customCss = this.filterCustomCss(extraConfiguration);
    this.preferredMobileOrientation = this.filterPreferredMobileOrientation(extraConfiguration);
    this.screensNotToShow = this.filterScreensNotToShow(extraConfiguration);
    this.scale = this.filterScale(extraConfiguration);
    this.listenEvents = typeof extraConfiguration.listenEvents === 'boolean' ? extraConfiguration.listenEvents : false;
    this.additionalAttributesAndFlags = Object.assign({}, extraConfiguration.additionalAttributesAndFlags);

    // Overriding the jsVersion is NOT recommended because older versions are not guaranteed to be available or work correctly beyond 30 days.
    if (typeof extraConfiguration.jsVersion === 'string' && extraConfiguration.jsVersion) {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdkConfig.constructor 1');
      this.sdkHtml5Version = extraConfiguration.jsVersion;
    } else {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdkConfig.constructor 2');
      this.sdkHtml5Version = new PackageVersion().getMinor();
    }
  }

  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  loadMode(type: string, key: string, subscriber: Subscriber<any>) {
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkConfig.loadMode ');
    // tslint:disable-next-line:no-console
    console.log(type);
    // tslint:disable-next-line:no-console
    console.log(key);

    type = type.toLowerCase() + 'Mode';
    // @ts-ignore
    if (this.resourceHtml5Loader) {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdkConfig.loadMode 1');
      // @ts-ignore
      this.resourceHtml5Loader.loadMode(this.jsVersion, type, key, this.containerId, this.buildExtraParams());
      window.addEventListener(
        'message',
        (message) => {
          // tslint:disable-next-line:no-console
          console.log('*** JSDK *** CognifitSdkConfig.loadMode 1.5');
          // tslint:disable-next-line:no-console
          console.log(message);

          if (typeof message.origin !== 'undefined') {
            if (message.origin === 'https://prejs.cognifit.com' || message.origin === 'https://js.cognifit.com') {
              // tslint:disable-next-line:no-console
              console.log('*** JSDK *** CognifitSdkConfig.loadMode 2');
              subscriber.next(new CognifitSdkResponse(message.data));
              if (message.data.hasOwnProperty('calculated')) {
                if (message.data.calculated) {
                  // tslint:disable-next-line:no-console
                  console.log('*** JSDK *** CognifitSdkConfig.loadMode only calculate');
                  return true;
                }
              }
              if (message.data.hasOwnProperty('status')) {
                if (message.data.status === 'event') {
                  // tslint:disable-next-line:no-console
                  console.log('*** JSDK *** CognifitSdkConfig.loadMode Event');
                  return true;
                }
              }
              subscriber.complete();
              // tslint:disable-next-line:no-console
              console.log('*** JSDK *** CognifitSdkConfig.loadMode 3');
              // @ts-ignore
              document.getElementById(this.containerId).innerHTML = '';
              // tslint:disable-next-line:no-console
              console.log('*** JSDK *** CognifitSdkConfig.loadMode 4');
            } else {
              // tslint:disable-next-line:no-console
              console.log('*** JSDK *** CognifitSdkConfig.loadMode Not same origin');
            }
          } else {
            // tslint:disable-next-line:no-console
            console.log('*** JSDK *** CognifitSdkConfig.loadMode No origin');
          }
        },
        false,
      );
    }
  }

  async loadResource(resolve: (value: string) => void, reject: (reason?: string) => void) {
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkConfig.loadResource 1');
    const node = document.createElement('script');
    node.src = await this.getResourceUrl();
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
    this.checkResourceLoadedTimes = 0;
    this.checkResourceLoaded(resolve, reject);
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkConfig.loadResource 2');
  }

  private checkResourceLoaded(resolve: (value: string) => void, reject: (reason?: string) => void) {
    setTimeout(() => {
      // tslint:disable-next-line:no-console
      console.log('*** JSDK *** CognifitSdkConfig.checkResourceLoaded 1');
      this.checkResourceLoadedTimes++;
      if (this.checkResourceLoadedTimes < 500) {
        // tslint:disable-next-line:no-console
        console.log('*** JSDK *** CognifitSdkConfig.checkResourceLoaded 2');
        // @ts-ignore
        if (typeof window.HTML5JS !== 'undefined') {
          // tslint:disable-next-line:no-console
          console.log('*** JSDK *** CognifitSdkConfig.checkResourceLoaded 3');
          // @ts-ignore
          this.resourceHtml5Loader = window.HTML5JS;
          resolve('CogniFit SDK loaded');
        } else {
          // tslint:disable-next-line:no-console
          console.log('*** JSDK *** CognifitSdkConfig.checkResourceLoaded 4');
          this.checkResourceLoaded(resolve, reject);
        }
      } else {
        // tslint:disable-next-line:no-console
        console.log('*** JSDK *** CognifitSdkConfig.checkResourceLoaded 5');
        reject('Resource not loaded');
      }
    }, 100);
  }

  private async setJsVersion(defaultJsVersion: string) {
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkConfig.setJsVersion 1');
    this.jsVersion = defaultJsVersion;
    const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
    let url = this.sandbox ? 'https://preapi.cognifit.com' : 'https://api.cognifit.com';
    url += '/description/versions/sdkjs?v=' + this.sdkHtml5Version;
    url += '&c=' + this.clientId;
    const remoteJsVersion = await httpClient.get<any>(url).toPromise();
    if (remoteJsVersion.version) {
      this.jsVersion = remoteJsVersion.version;
    }
    if (remoteJsVersion.webhooks) {
      this.webhooks = remoteJsVersion.webhooks;
    }
    if (remoteJsVersion.customTasks) {
      this.customTasks = remoteJsVersion.customTasks;
    }
    if (remoteJsVersion.customCss) {
      this.customCss = remoteJsVersion.customCss;
    }
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkConfig.setJsVersion 2');
  }

  private async getResourceUrl() {
    await this.setJsVersion(this.jsVersion);
    return this.sandbox
      ? 'https://prejs.cognifit.com/' + this.jsVersion + '/html5Loader.js'
      : 'https://js.cognifit.com/' + this.jsVersion + '/html5Loader.js';
  }

  private filterAppType(extraConfiguration: any): string {
    const values = ['web', 'app'];
    if (typeof extraConfiguration.appType === 'string' && extraConfiguration.sandbox) {
      if (values.indexOf(extraConfiguration.appType) > -1) {
        return extraConfiguration.appType;
      }
    }
    return values[0];
  }

  private filterTheme(extraConfiguration: any): string {
    const values = ['light', 'dark'];
    if (typeof extraConfiguration.theme === 'string' && extraConfiguration.theme) {
      if (values.indexOf(extraConfiguration.theme) > -1) {
        return extraConfiguration.theme;
      }
    }
    return values[0];
  }

  private filterCustomCss(extraConfiguration: any): string[] {
    if (typeof extraConfiguration.customCss === 'string' && extraConfiguration.customCss) {
      return [extraConfiguration.customCss];
    } else if (typeof extraConfiguration.customCss === 'object' && extraConfiguration.customCss) {
      let isStringArray = true;
      extraConfiguration.customCss.forEach((value: any) => {
        if (typeof value !== 'string') {
          isStringArray = false;
        }
      });
      if (isStringArray) {
        return extraConfiguration.customCss;
      }
    }
    return [];
  }

  private filterPreferredMobileOrientation(extraConfiguration: any): string {
    if (
      typeof extraConfiguration.preferredMobileOrientation === 'string' &&
      extraConfiguration.preferredMobileOrientation
    ) {
      return extraConfiguration.preferredMobileOrientation;
    }
    return 'none';
  }

  private filterScreensNotToShow(extraConfiguration: any): string[] {
    if (typeof extraConfiguration.screensNotToShow === 'object') {
      if (typeof extraConfiguration.screensNotToShow.length === 'number') {
        if (extraConfiguration.screensNotToShow.length > 0) {
          const screensNotToShow = [];
          let i;
          for (i = 0; i < extraConfiguration.screensNotToShow.length; i++) {
            if (typeof extraConfiguration.screensNotToShow[i] === 'string') {
              screensNotToShow.push(extraConfiguration.screensNotToShow[i]);
            }
          }
          return screensNotToShow;
        }
      }
    }
    return [];
  }

  private filterScale(extraConfiguration: any): number {
    if (typeof extraConfiguration.scale === 'number' && extraConfiguration.scale) {
      if (extraConfiguration.scale >= 100 && extraConfiguration.scale <= 1000) {
        return Math.round(extraConfiguration.scale);
      }
    }
    return 800;
  }

  private buildExtraParams(): {} {
    const params: any = {
      clientId: this.clientId,
      accessToken: this.accessToken,
      environment: this.sandbox ? 'preprod' : 'production',
      appType: this.appType,
      theme: this.theme,
      customCss: this.customCss,
      screensNotToShow: this.screensNotToShow,
      orientation: this.preferredMobileOrientation,
      showResults: this.showResults,
      scale: this.scale,
      customTasks: this.customTasks,
      listenEvents: this.listenEvents,
      additionalAttributesAndFlags: this.additionalAttributesAndFlags,
    };

    if (this.webhooks.length) {
      params.webhooks = this.webhooks;
    }

    return params;
  }
}
