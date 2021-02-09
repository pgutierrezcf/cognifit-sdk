import { PackageVersion } from '../environments/version';

test('Testing PackageVersion', () => {
  const packageVersion = new PackageVersion();
  const packageJson = require('../../package.json');

  expect(packageVersion.version).toBe(packageJson.version);
  expect(packageVersion.getPatch()).toBe(packageJson.version);
  expect(packageVersion.getMinor()).toBe(
    packageJson.version.substr(0, packageJson.version.indexOf('.', packageJson.version.indexOf('.') + 1)),
  );
  expect(packageVersion.getMajor()).toBe(packageJson.version.substr(0, packageJson.version.indexOf('.')));
});
