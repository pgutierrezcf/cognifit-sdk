import { CognifitSdkResponse } from '../lib/cognifit.sdk.response';

test('Testing CognifitSdkResponse Game Mode completed', () => {
  const statusValue = 'completed';
  const modeValue = 'gameMode';
  const keyValue = 'LANE_SPLITTER';
  const cognifitSdkResponse = new CognifitSdkResponse({
    status: statusValue,
    mode: modeValue,
    key: keyValue,
  });

  expect(cognifitSdkResponse.status).toBe(statusValue);
  expect(cognifitSdkResponse.typeValue).toBe('GAME');
  expect(cognifitSdkResponse.keyValue).toBe(keyValue);
  expect(cognifitSdkResponse.isSessionCompleted()).toBe(true);
  expect(cognifitSdkResponse.isSessionAborted()).toBe(false);
  expect(cognifitSdkResponse.isErrorLogin()).toBe(false);
});

test('Testing CognifitSdkResponse Training Mode completed', () => {
  const statusValue = 'completed';
  const modeValue = 'trainingMode';
  const keyValue = 'NORMAL_TRAINING';

  const cognifitSdkResponse = new CognifitSdkResponse({
    status: statusValue,
    mode: modeValue,
    key: keyValue,
  });

  expect(cognifitSdkResponse.status).toBe(statusValue);
  expect(cognifitSdkResponse.typeValue).toBe('TRAINING');
  expect(cognifitSdkResponse.keyValue).toBe(keyValue);
  expect(cognifitSdkResponse.isSessionCompleted()).toBe(true);
  expect(cognifitSdkResponse.isSessionAborted()).toBe(false);
  expect(cognifitSdkResponse.isErrorLogin()).toBe(false);
});

test('Testing CognifitSdkResponse Assessment Mode completed', () => {
  const statusValue = 'completed';
  const modeValue = 'assessmentMode';
  const keyValue = 'DRIVING_ASSESSMENT';
  const cognifitSdkResponse = new CognifitSdkResponse({
    status: statusValue,
    mode: modeValue,
    key: keyValue,
  });

  expect(cognifitSdkResponse.status).toBe(statusValue);
  expect(cognifitSdkResponse.typeValue).toBe('ASSESSMENT');
  expect(cognifitSdkResponse.keyValue).toBe(keyValue);
  expect(cognifitSdkResponse.isSessionCompleted()).toBe(true);
  expect(cognifitSdkResponse.isSessionAborted()).toBe(false);
  expect(cognifitSdkResponse.isErrorLogin()).toBe(false);
});

test('Testing CognifitSdkResponse Game Mode aborted', () => {
  const statusValue = 'aborted';
  const modeValue = 'gameMode';
  const keyValue = 'LANE_SPLITTER';
  const cognifitSdkResponse = new CognifitSdkResponse({
    status: statusValue,
    mode: modeValue,
    key: keyValue,
  });

  expect(cognifitSdkResponse.status).toBe(statusValue);
  expect(cognifitSdkResponse.typeValue).toBe('GAME');
  expect(cognifitSdkResponse.keyValue).toBe(keyValue);
  expect(cognifitSdkResponse.isSessionCompleted()).toBe(false);
  expect(cognifitSdkResponse.isSessionAborted()).toBe(true);
  expect(cognifitSdkResponse.isErrorLogin()).toBe(false);
});

test('Testing CognifitSdkResponse Training Mode aborted', () => {
  const statusValue = 'aborted';
  const modeValue = 'trainingMode';
  const keyValue = 'NORMAL_TRAINING';

  const cognifitSdkResponse = new CognifitSdkResponse({
    status: statusValue,
    mode: modeValue,
    key: keyValue,
  });

  expect(cognifitSdkResponse.status).toBe(statusValue);
  expect(cognifitSdkResponse.typeValue).toBe('TRAINING');
  expect(cognifitSdkResponse.keyValue).toBe(keyValue);
  expect(cognifitSdkResponse.isSessionCompleted()).toBe(false);
  expect(cognifitSdkResponse.isSessionAborted()).toBe(true);
  expect(cognifitSdkResponse.isErrorLogin()).toBe(false);
});

test('Testing CognifitSdkResponse Assessment Mode aborted', () => {
  const statusValue = 'aborted';
  const modeValue = 'assessmentMode';
  const keyValue = 'DRIVING_ASSESSMENT';
  const cognifitSdkResponse = new CognifitSdkResponse({
    status: statusValue,
    mode: modeValue,
    key: keyValue,
  });

  expect(cognifitSdkResponse.status).toBe(statusValue);
  expect(cognifitSdkResponse.typeValue).toBe('ASSESSMENT');
  expect(cognifitSdkResponse.keyValue).toBe(keyValue);
  expect(cognifitSdkResponse.isSessionCompleted()).toBe(false);
  expect(cognifitSdkResponse.isSessionAborted()).toBe(true);
  expect(cognifitSdkResponse.isErrorLogin()).toBe(false);
});

test('Testing CognifitSdkResponse Login Error', () => {
  const statusValue = 'errorLogin';
  const cognifitSdkResponse = new CognifitSdkResponse({
    status: statusValue,
  });

  expect(cognifitSdkResponse.status).toBe(statusValue);
  expect(cognifitSdkResponse.isSessionCompleted()).toBe(false);
  expect(cognifitSdkResponse.isSessionAborted()).toBe(false);
  expect(cognifitSdkResponse.isErrorLogin()).toBe(true);
});
