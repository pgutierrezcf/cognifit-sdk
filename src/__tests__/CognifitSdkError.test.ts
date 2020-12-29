import { CognifitSdkError } from '../lib/cognifit.sdk.error';

test('Tesintg CognifitSdkError', () => {
  const cognifitSdkError = new CognifitSdkError();
  expect(cognifitSdkError.getError()).toBe(cognifitSdkError.NOT_ERROR);
  expect(cognifitSdkError.getMessage()).toBe('');

  cognifitSdkError.setError(cognifitSdkError.ERROR_ACCESS_TOKEN);
  expect(cognifitSdkError.getError()).toBe(cognifitSdkError.ERROR_ACCESS_TOKEN);
  expect(cognifitSdkError.getMessage()).toBe('Invalid access token');

  cognifitSdkError.setError(cognifitSdkError.ERROR_CONTAINER);
  expect(cognifitSdkError.getError()).toBe(cognifitSdkError.ERROR_CONTAINER);
  expect(cognifitSdkError.getMessage()).not.toBe('');

  cognifitSdkError.setError(cognifitSdkError.ERROR_KEY);
  expect(cognifitSdkError.getError()).toBe(cognifitSdkError.ERROR_KEY);
  expect(cognifitSdkError.getMessage()).not.toBe('');

  cognifitSdkError.setError(cognifitSdkError.ERROR_TYPE);
  expect(cognifitSdkError.getError()).toBe(cognifitSdkError.ERROR_TYPE);
  expect(cognifitSdkError.getMessage()).not.toBe('');
});
