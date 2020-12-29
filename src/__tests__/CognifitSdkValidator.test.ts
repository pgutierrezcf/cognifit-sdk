import { CognifitSdkValidator } from '../lib/cognifit.sdk.validator';
import { CognifitSdkError } from '../lib/cognifit.sdk.error';
import { CognifitSdkConfig } from '../lib/cognifit.sdk.config';

test('Tesintg CognifitSdkValidator', () => {
  const cognifitSdkValidator = new CognifitSdkValidator();
  const cognifitSdkError = new CognifitSdkError();

  expect(cognifitSdkValidator.validate('NOT_TYPE', 'MAHJONG', cognifitSdkError)).toBe(false);
  expect(cognifitSdkError.getError()).toBe(cognifitSdkError.ERROR_TYPE);
  expect(cognifitSdkError.getMessage()).toBe('Incorrect session type');

  expect(cognifitSdkValidator.validate('ASSESSMENT', '', cognifitSdkError)).toBe(false);
  expect(cognifitSdkError.getError()).toBe(cognifitSdkError.ERROR_KEY);
  expect(cognifitSdkError.getMessage()).toBe('Incorrect session key');

  expect(cognifitSdkValidator.validate('TRAINING', '', cognifitSdkError)).toBe(false);
  expect(cognifitSdkError.getError()).toBe(cognifitSdkError.ERROR_KEY);
  expect(cognifitSdkError.getMessage()).toBe('Incorrect session key');

  expect(cognifitSdkValidator.validate('GAME', '', cognifitSdkError)).toBe(false);
  expect(cognifitSdkError.getError()).toBe(cognifitSdkError.ERROR_KEY);
  expect(cognifitSdkError.getMessage()).toBe('Incorrect session key');

  expect(cognifitSdkValidator.validate('ASSESSMENT', 'MAHJONG', cognifitSdkError)).toBe(true);
  expect(cognifitSdkError.getError()).toBe(cognifitSdkError.NOT_ERROR);
  expect(cognifitSdkError.getMessage()).toBe('');

  expect(cognifitSdkValidator.validate('TRAINING', 'MAHJONG', cognifitSdkError)).toBe(true);
  expect(cognifitSdkError.getError()).toBe(cognifitSdkError.NOT_ERROR);
  expect(cognifitSdkError.getMessage()).toBe('');

  expect(cognifitSdkValidator.validate('GAME', 'MAHJONG', cognifitSdkError)).toBe(true);
  expect(cognifitSdkError.getError()).toBe(cognifitSdkError.NOT_ERROR);
  expect(cognifitSdkError.getMessage()).toBe('');

  expect(cognifitSdkValidator.validateConfig(new CognifitSdkConfig(), cognifitSdkError)).toBe(false);
  expect(cognifitSdkError.getError()).toBe(cognifitSdkError.ERROR_CLIENT_ID);
  expect(cognifitSdkValidator.validateConfig(new CognifitSdkConfig('CLIENT_ID'), cognifitSdkError)).toBe(false);
  expect(cognifitSdkError.getError()).toBe(cognifitSdkError.ERROR_CLIENT_HASH);
  expect(cognifitSdkValidator.validateConfig(new CognifitSdkConfig('CLIENT_ID', 'CLIENT_HASH'), cognifitSdkError)).toBe(
    false,
  );
  expect(cognifitSdkError.getError()).toBe(cognifitSdkError.ERROR_ACCESS_TOKEN);
  expect(
    cognifitSdkValidator.validateConfig(
      new CognifitSdkConfig('CLIENT_ID', 'CLIENT_HASH', 'ACCESS_TOKEN'),
      cognifitSdkError,
    ),
  ).toBe(true);
  expect(cognifitSdkError.getError()).toBe(cognifitSdkError.NOT_ERROR);

  expect(cognifitSdkValidator.isContainerValid()).toBe(true);
  expect(cognifitSdkValidator.isAccessTokenValid()).toBe(true);
});
