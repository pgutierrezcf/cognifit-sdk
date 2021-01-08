export class CognifitSdkConfig {
  accessToken: string;
  clientHash: string;
  clientId: string;
  callbackUrl: string;
  sandbox: boolean;

  constructor(clientId: string = '', clientHash: string = '', callbackUrl: string = '', accessToken: string = '', sandbox: boolean = false) {
    this.accessToken  = accessToken;
    this.clientHash   = clientHash;
    this.clientId     = clientId;
    this.callbackUrl  = callbackUrl;
    this.sandbox      = sandbox;
  }

  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  getIframeUrl(type: string, keyValue: string): string {
    let url = 'https://';
    url += this.sandbox ? 'preprod.cognifit.com' : 'www.cognifit.com';
    url += '/partner/' + this.clientHash;
    url += '?client_id=' + this.clientId;
    url += '&user_token=' + this.accessToken;
    url += '&cognifit-access-type=iframe';
    if (this.callbackUrl) {
      url += '&callback_url=' + this.accessToken;
    }
    url += this.buildSetting(type, keyValue);
    return url;
  }

  private buildSetting(type: string, keyValue: string): string {
    if (type === 'GAME') {
      return '&setting[tasks][]=' + keyValue;
    } else {
      return '&setting=' + encodeURI(JSON.stringify([{ type: type.toLowerCase(), key: keyValue }]));
    }
  }
}
