import { Linter } from 'eslint';
import Config = Linter.Config;
import ConfigOverride = Linter.ConfigOverride;

/* eslint-disable-next-line max-len */
/* eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
const config: Config = require('../..');

const expectIsObject = (value: unknown): void => {
  expect(value).not.toBeNull();
  expect(typeof value).toBe('object');
  expect(Array.isArray(value)).toBe(false);
};
const expectIsArrayOfLength = (givenArray: unknown, length: number): void => {
  expect(Array.isArray(givenArray)).toBe(true);
  expect(givenArray).toHaveLength(length);
};
const getVanillaOverride = (
  overrides: ConfigOverride[],
): Linter.ConfigOverride<Linter.RulesRecord> | undefined => {
  return overrides.find((override: ConfigOverride) => {
    return Array.isArray(override.files)
      && override.files.length === 1
      && override.files[0] === '*.js';
  });
};
const getTypeScriptOverride = (
  overrides: ConfigOverride[],
): Linter.ConfigOverride<Linter.RulesRecord> | undefined => {
  return overrides.find((override: ConfigOverride) => {
    return Array.isArray(override.files)
      && override.files.includes('*.ts');
  });
};

describe('the sharable config', () => {
  // eslint-disable-next-line jest/expect-expect
  it('is an object', () => {
    expectIsObject(config);
  });

  it('only uses vue and @typescript-eslint plugins', () => {
    expectIsArrayOfLength(config.plugins, 2);
    expect(config.plugins?.[0]).toBe('vue');
    expect(config.plugins?.[1]).toBe('@typescript-eslint');
  });

  it('uses the default ESLint parser (Espree) for .js files', () => {
    const vanillaOverride = getVanillaOverride(config?.overrides ?? []);
    expect(vanillaOverride?.parser).toBe('espree');
  });

  it('only extends programic-base for .js files', () => {
    const vanillaOverride = getVanillaOverride(config?.overrides ?? []);
    expect(vanillaOverride?.extends?.[0]).toBe('@programic/eslint-config-base');
  });

  it('should have an override for ts, tsx and vue files', () => {
    const typescriptOverride = getTypeScriptOverride(config?.overrides ?? []);
    expect(typescriptOverride?.files).toStrictEqual(['*.ts', '*.tsx', '*.vue']);
  });

  it(
    'should use the same parser and parserOptions for the TypeScript override as for the default',
    () => {
      const typescriptOverride = getTypeScriptOverride(config?.overrides ?? []);
      expect(typescriptOverride?.parser).toStrictEqual(config.parser);
      expect(typescriptOverride?.parserOptions).toStrictEqual(config.parserOptions);
    },
  );

  it('should extend the right configs for the TypeScript override', () => {
    const typescriptOverride = getTypeScriptOverride(config?.overrides ?? []);
    expect(typescriptOverride?.extends).toStrictEqual([
      '@programic/eslint-config-vue3',
      'plugin:@typescript-eslint/recommended',
    ]);
  });
});
