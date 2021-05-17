export class CognifitSdkResponse {
  status: string;
  typeValue: string;
  keyValue: string;
  justCalculated: boolean;

  constructor(data: any) {
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkResponse.constructor 1');
    this.status = data.status;
    this.typeValue = this._formatType(data.mode);
    this.keyValue = data.key;
    this.justCalculated = data.hasOwnProperty('calculated') ? data.calculated : false;
    // tslint:disable-next-line:no-console
    console.log(this.status);
    // tslint:disable-next-line:no-console
    console.log(this.typeValue);
    // tslint:disable-next-line:no-console
    console.log(this.keyValue);
    // tslint:disable-next-line:no-console
    console.log(this.justCalculated);
  }

  isSessionCompleted() {
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkResponse.isSessionCompleted 1');
    // tslint:disable-next-line:no-console
    console.log(this.status);
    return this.status === 'completed';
  }

  isSessionAborted() {
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkResponse.isSessionAborted 1');
    // tslint:disable-next-line:no-console
    console.log(this.status);
    return this.status === 'aborted';
  }

  isErrorLogin() {
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkResponse.isErrorLogin 1');
    // tslint:disable-next-line:no-console
    console.log(this.status);
    return this.status === 'errorLogin';
  }

  private _formatType(dataMode: string): string {
    if (dataMode) {
      return dataMode.replace('Mode', '').toUpperCase();
    }
    return '';
  }
}
