import path from 'path';
import {
  OUTPUT_DIRECTORY_KEY,
  SOURCE_DIRECTORIES_KEY,
} from 'src/constants';
import { InAccessiblePathError } from 'src/errors';
import checkDirectoriesAccess from 'src/lib/buildConfig/checkDirectoriesAccess';

const accessibleDir = path.resolve('../');
const inaccessibleDir = path.resolve('./foo');

describe('src/lib/buildConfig/checkDirectoriesAccess', () => {
  test('should resolve config if output and sources are accessible', () => {
    const config = {
      [OUTPUT_DIRECTORY_KEY]: accessibleDir,
      [SOURCE_DIRECTORIES_KEY]: [accessibleDir],
    };

    expect.assertions(1);
    return expect(checkDirectoriesAccess(config))
      .resolves
      .toEqual({ ...config });
  });

  test('should reject if output is not accessible', () => {
    const config = {
      [OUTPUT_DIRECTORY_KEY]: inaccessibleDir,
      [SOURCE_DIRECTORIES_KEY]: [accessibleDir],
    };

    expect.assertions(1);
    return expect(checkDirectoriesAccess(config))
      .rejects
      .toEqual(new InAccessiblePathError(inaccessibleDir));
  });

  test('should reject if a source is not accessible', () => {
    const config = {
      [OUTPUT_DIRECTORY_KEY]: accessibleDir,
      [SOURCE_DIRECTORIES_KEY]: [inaccessibleDir],
    };

    expect.assertions(1);
    return expect(checkDirectoriesAccess(config))
      .rejects
      .toEqual(new InAccessiblePathError(inaccessibleDir));
  });
});
