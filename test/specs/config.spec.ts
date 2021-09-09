import { Linter } from 'eslint';
import Config = Linter.Config;
import ConfigOverride = Linter.ConfigOverride;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config:Config = require('../..');

const expectIsObject = (value: unknown) => {
  expect(value).not.toBeNull();
  expect(typeof value).toBe('object');
  expect(Array.isArray(value)).toBe(false);
};
const expectIsArrayOfLength = (arr: unknown, length: number) => {
  expect(Array.isArray(arr)).toBe(true);
  expect(arr).toHaveLength(length);
};
const getOverrideForJSFiles = (overrides:ConfigOverride[]) => {
  return overrides.find((override:ConfigOverride) => {
    return Array.isArray(override.files)
      && override.files.length === 1
      && override.files[0] === '*.js';
  });
};

describe('valid config', () => {
  // eslint-disable-next-line jest/expect-expect
  it('is an object', () => {
    expectIsObject(config);
  });

  it('only uses vue and @typescript-eslint plugins', () => {
    expectIsArrayOfLength(config.plugins, 2);
    expect(config.plugins?.[0]).toBe('vue');
    expect(config.plugins?.[1]).toBe('@typescript-eslint');
  });

  it('only extends programic-vue3 and programic-typescript', () => {
    expectIsArrayOfLength(config.extends, 2);
    expect(config.extends?.[0]).toBe('@programic/eslint-config-vue3');
    expect(config.extends?.[1]).toBe('@programic/eslint-config-typescript');
  });

  it('uses the default ESLint parser (Espree) for .js files', () => {
    const overrideForJSFiles = getOverrideForJSFiles(config?.overrides ?? []);

    expectIsObject(overrideForJSFiles);
    expect(overrideForJSFiles?.parser).toBe('espree');
  });

  it('only extends programic-base for .js files', () => {
    const overrideForJSFiles = getOverrideForJSFiles(config?.overrides ?? []);

    expectIsObject(overrideForJSFiles);
    expectIsArrayOfLength(overrideForJSFiles?.extends, 1);
    expect(overrideForJSFiles?.extends?.[0]).toBe('@programic/eslint-config-base');
  });
});
