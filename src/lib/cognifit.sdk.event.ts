export class CognifitSdkEvent {
  constructor(private payload: { [key: string]: any }) {
    // tslint:disable-next-line:no-console
    console.log('*** JSDK *** CognifitSdkEvent.constructor 1');
    // tslint:disable-next-line:no-console
    console.log(this.payload);
  }

  getValue(key: string) {
    return this.payload[key];
  }

  getValues() {
    return this.payload;
  }
}
