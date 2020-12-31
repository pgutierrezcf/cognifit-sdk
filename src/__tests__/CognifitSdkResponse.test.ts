import { CognifitSdkResponse } from '../lib/cognifit.sdk.response';

test('Tesintg CognifitSdkError', () => {

  let url = 'https://example.com';
  let cognifitSdkResponse = new CognifitSdkResponse(url);
  expect(cognifitSdkResponse.getResponseParams()).toStrictEqual({});

  url = 'https://example.com?a=1';
  cognifitSdkResponse = new CognifitSdkResponse(url);
  expect(cognifitSdkResponse.getResponseParams()).toStrictEqual({a: 1});

  url = 'https://example.com?a[]=1&a[]=2';
  cognifitSdkResponse = new CognifitSdkResponse(url);
  const b: number[] = [1, 2];
  expect(cognifitSdkResponse.getResponseParams()).toStrictEqual({a: b});

});
