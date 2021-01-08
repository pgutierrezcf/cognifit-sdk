import { cognifitSdk } from '../index';
import { CognifitSdkConfig } from '../lib/cognifit.sdk.config';

test('My CognifitSdk', () => {
  const container = 'divContainer';
  const accessToken = 'accessToken';

  expect(cognifitSdk.start('GAME', 'MAHJONG')).toBe(false);
  expect(cognifitSdk.cognifitSdkError.getError()).toBe(cognifitSdk.cognifitSdkError.ERROR_INITIALIZED);

  expect(cognifitSdk.init(new CognifitSdkConfig())).toBe(false);
  expect(cognifitSdk.init(new CognifitSdkConfig('CLIENT_ID', 'CLIENT_HASH', '', 'ACCESS_TOKEN'))).toBe(true);

  expect(cognifitSdk.start('NOT_TYPE', 'MAHJONG')).toBe(false);
  expect(cognifitSdk.start('ASSESSMENT', '')).toBe(false);
  expect(cognifitSdk.start('TRAINING', '')).toBe(false);
  expect(cognifitSdk.start('GAME', '')).toBe(false);
  expect(cognifitSdk.start('ASSESSMENT', 'MAHJONG')).toBe(true);
  expect(cognifitSdk.start('TRAINING', 'MAHJONG')).toBe(true);
  expect(cognifitSdk.start('GAME', 'MAHJONG')).toBe(true);
});
