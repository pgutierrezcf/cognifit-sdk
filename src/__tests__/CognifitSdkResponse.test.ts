import { CognifitSdkResponse } from '../lib/cognifit.sdk.response';
import { CognifitSdkEvent } from '../lib/cognifit.sdk.event';

test('Testing CognifitSdkResponse Game Mode completed', () => {
  const statusValue = 'completed';
  const modeValue = 'gameMode';
  const keyValue = 'LANE_SPLITTER';
  const justCalculated = false;
  const cognifitSdkResponse = new CognifitSdkResponse({
    status: statusValue,
    mode: modeValue,
    key: keyValue,
    calculated: justCalculated,
  });

  expect(cognifitSdkResponse.status).toBe(statusValue);
  expect(cognifitSdkResponse.typeValue).toBe('GAME');
  expect(cognifitSdkResponse.keyValue).toBe(keyValue);
  expect(cognifitSdkResponse.justCalculated).toBe(justCalculated);
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
  expect(cognifitSdkResponse.justCalculated).toBe(false);
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
    calculated: true,
  });

  expect(cognifitSdkResponse.status).toBe(statusValue);
  expect(cognifitSdkResponse.typeValue).toBe('ASSESSMENT');
  expect(cognifitSdkResponse.keyValue).toBe(keyValue);
  expect(cognifitSdkResponse.justCalculated).toBe(true);
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
  expect(cognifitSdkResponse.justCalculated).toBe(false);
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
  expect(cognifitSdkResponse.justCalculated).toBe(false);
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
  expect(cognifitSdkResponse.justCalculated).toBe(false);
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

test('Testing CognifitSdkResponse General Event', () => {
  const statusValue = 'event';
  const modeValue = 'assessmentMode';
  const keyValue = 'DRIVING_ASSESSMENT';
  const eventPayload: { [key: string]: any } = { key1: 1, key2: 2 };
  const cognifitSdkResponse = new CognifitSdkResponse({
    status: statusValue,
    mode: modeValue,
    key: keyValue,
    eventPayload,
  });

  expect(cognifitSdkResponse.status).toBe(statusValue);
  expect(cognifitSdkResponse.isSessionCompleted()).toBe(false);
  expect(cognifitSdkResponse.isSessionAborted()).toBe(false);
  expect(cognifitSdkResponse.isErrorLogin()).toBe(false);
  expect(cognifitSdkResponse.isEvent()).toBe(true);
  expect(cognifitSdkResponse.eventPayload).toBeInstanceOf(CognifitSdkEvent);
  expect(cognifitSdkResponse.eventPayload.getValue('key1')).toBe(1);
  expect(cognifitSdkResponse.eventPayload.getValue('key2')).toBe(2);
  expect(cognifitSdkResponse.eventPayload.getValue('key3')).toBe(undefined);
  expect(cognifitSdkResponse.eventPayload.getValues()).toStrictEqual({ key1: 1, key2: 2 });
});
