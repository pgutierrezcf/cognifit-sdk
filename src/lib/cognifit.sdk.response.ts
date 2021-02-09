export class CognifitSdkResponse {
  status: string;
  typeValue: string;
  keyValue: string;

  constructor(data: any) {
    this.status = data.status;
    this.typeValue = this._formatType(data.mode);
    this.keyValue = data.key;
  }

  isSessionCompleted() {
    return this.status === 'completed';
  }

  isSessionAborted() {
    return this.status === 'aborted';
  }

  isErrorLogin() {
    return this.status === 'errorLogin';
  }

  private _formatType(dataMode: string): string {
    if (dataMode) {
      return dataMode.replace('Mode', '').toUpperCase();
    }
    return '';
  }
}
