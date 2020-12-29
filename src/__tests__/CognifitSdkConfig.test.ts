import { CognifitSdkConfig } from '../lib/cognifit.sdk.config';

test('Tesintg CognifitSdkConfig', () => {
  const cognifitSdkConfig = new CognifitSdkConfig();
  expect(cognifitSdkConfig.getAccessToken()).toBe('');

  const accessToken = 'EXAMPLE_ACCESS_TOKEN';
  cognifitSdkConfig.setAccessToken(accessToken);
  expect(cognifitSdkConfig.getAccessToken()).toBe(accessToken);

  const clientId = 'EXAMPLE_CLIENT_ID';
  const clientHash = 'EXAMPLE_CLIENT_HASH';
  const accessTokenTwo = 'EXAMPLE_ACCESS_TOKEN_TWO';
  let sandbox = true;
  const cognifitSdkConfigTwo = new CognifitSdkConfig(clientId, clientHash, accessTokenTwo, sandbox);
  expect(cognifitSdkConfigTwo.getAccessToken()).not.toBe(accessToken);
  expect(cognifitSdkConfigTwo.getAccessToken()).toBe(accessTokenTwo);
  expect(cognifitSdkConfigTwo.getIframeUrl('', '')).toContain('https://preprod.cognifit.com/partner/');

  sandbox = false;
  const cognifitSdkConfigThree = new CognifitSdkConfig(clientId, clientHash, accessTokenTwo, sandbox);
  expect(cognifitSdkConfigThree.getIframeUrl('', '')).toContain('https://www.cognifit.com/partner/');
});
