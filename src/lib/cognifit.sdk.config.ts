import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { PackageVersion } from '../environments/version';

export class CognifitSdkConfig {
  containerId: string;
  accessToken: string;
  clientId: string;
  sandbox: boolean;
  jsVersion = '2021-01-29_1627_thorin';

  checkResourceLoadedTimes = 0;
  resourceHtml5Loader = null;

  constructor(containerId: string = '', clientId: string = '', accessToken: string = '', sandbox: boolean = false) {
    this.containerId = containerId;
    this.accessToken = accessToken;
    this.clientId = clientId;
    this.sandbox = sandbox;

    const packageVersion = new PackageVersion();
    console.log(packageVersion.version);

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
      this.resourceHtml5Loader.loadMode(this.jsVersion, type, key, this.containerId, {
        clientId: this.clientId,
        accessToken: this.accessToken,
      });
      window.addEventListener(
        'message',
        (message) => {
          resolve(message.data);
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
    url += '/description/versions/sdkjs?v=2.0';
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
}
