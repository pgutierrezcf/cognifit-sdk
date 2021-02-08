import { CognifitSdk } from '../index';
import { CognifitSdkConfig } from '../lib/cognifit.sdk.config';

const cognifitSdk = new CognifitSdk();

test('Test must fail', () => {
  expect.assertions(1);
  return cognifitSdk.start('NOT_TYPE', 'MAHJONG').catch(e => expect(e).toMatch('Check cognifitSdkError'));
});

/*
test('My CognifitSdk', () => {
expect(cognifitSdk.cognifitSdkError.getError()).toBe(cognifitSdk.cognifitSdkError.ERROR_INITIALIZED);
expect(cognifitSdk.init(new CognifitSdkConfig())).toBe(false);
expect(cognifitSdk.init(new CognifitSdkConfig('CLIENT_ID', 'CLIENT_HASH', 'ACCESS_TOKEN', true))).toBe(true);
expect(cognifitSdk.start('NOT_TYPE', 'MAHJONG')).toBe(false);
expect(cognifitSdk.start('ASSESSMENT', '')).toBe(false);
expect(cognifitSdk.start('TRAINING', '')).toBe(false);
expect(cognifitSdk.start('GAME', '')).toBe(false);
expect(cognifitSdk.start('ASSESSMENT', 'MAHJONG')).toBe(true);
expect(cognifitSdk.start('TRAINING', 'MAHJONG')).toBe(true);
expect(cognifitSdk.start('GAME', 'MAHJONG')).toBe(true);
});
*/
