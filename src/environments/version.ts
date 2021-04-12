export class PackageVersion {
  version = '2.0.2';

  getPatch(): string {
    return this.version;
  }

  getMinor(): string {
    return this.version.substr(0, this.version.indexOf('.', this.version.indexOf('.') + 1));
  }

  getMajor(): string {
    return this.version.substr(0, this.version.indexOf('.'));
  }
}
