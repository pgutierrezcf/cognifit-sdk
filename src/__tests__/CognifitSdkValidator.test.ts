import { CognifitSdkValidator } from '../lib/cognifit.sdk.validator';
import { CognifitSdkError } from '../lib/cognifit.sdk.error';

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

});
