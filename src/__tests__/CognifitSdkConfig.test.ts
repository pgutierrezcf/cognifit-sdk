import { CognifitSdkConfig } from '../lib/cognifit.sdk.config';

test('Tesintg CognifitSdkConfig', () => {
  const cognifitSdkConfig = new CognifitSdkConfig();
  expect(cognifitSdkConfig.getAccessToken()).toBe('');

  const accessToken = 'EXAMPLE_ACCESS_TOKEN';
  cognifitSdkConfig.setAccessToken(accessToken);
  expect(cognifitSdkConfig.getAccessToken()).toBe(accessToken);

  const container       = 'EXAMPLE_CONTAINER';
  const clientId        = 'EXAMPLE_CLIENT_ID';
  const accessTokenTwo  = 'EXAMPLE_ACCESS_TOKEN_TWO';
  let sandbox           = true;
  const cognifitSdkConfigTwo = new CognifitSdkConfig(container, clientId, accessTokenTwo, sandbox);
  expect(cognifitSdkConfigTwo.getAccessToken()).not.toBe(accessToken);
  expect(cognifitSdkConfigTwo.getAccessToken()).toBe(accessTokenTwo);

  sandbox = false;
  const cognifitSdkConfigThree = new CognifitSdkConfig(container, clientId, accessTokenTwo, sandbox);
  expect(cognifitSdkConfigThree.getAccessToken()).not.toBe(accessToken);
  expect(cognifitSdkConfigThree.getAccessToken()).toBe(accessTokenTwo);
});
