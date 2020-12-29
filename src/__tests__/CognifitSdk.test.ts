import { cognifitSdk } from '../index';

test('My CognifitSdk', () => {

  const container 	= 'divContainer';
  const accessToken 	= 'accessToken';

  cognifitSdk.init(container, accessToken);

  expect(cognifitSdk.container).toBe(container);
  expect(cognifitSdk.accessToken).toBe(accessToken);

  expect(cognifitSdk.start('NOT_TYPE', 'MAHJONG')).toBe(false);
  expect(cognifitSdk.start('ASSESSMENT', '')).toBe(false);
  expect(cognifitSdk.start('TRAINING', '')).toBe(false);
  expect(cognifitSdk.start('GAME', '')).toBe(false);
  expect(cognifitSdk.start('ASSESSMENT', 'MAHJONG')).toBe(true);
  expect(cognifitSdk.start('TRAINING', 'MAHJONG')).toBe(true);
  expect(cognifitSdk.start('GAME', 'MAHJONG')).toBe(true);

});
