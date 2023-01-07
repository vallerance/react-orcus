import { ExecutorContext, readJsonFile, writeJsonFile } from '@nrwl/devkit';
import { fileExists } from 'nx/src/utils/fileutils';
import { join } from 'path';

import { BuildExecutorSchema } from './schema';

export default async function runExecutor(
    options: BuildExecutorSchema,
    context: ExecutorContext
) {
    const pathToDist = join(context.root, options.outputPath, 'package.json');

    if (!fileExists(pathToDist)) {
        throw new Error(`Cannot find package.json at ${pathToDist}.`);
    }

    const distPackageJson = readJsonFile(pathToDist);

    const pathToSrc = join(context.root, options.packageJson ?? 'package.json');

    if (!fileExists(pathToSrc)) {
        throw new Error(`Cannot find package.json at ${pathToSrc}.`);
    }

    const srcPackageJson = readJsonFile(pathToSrc);

    // merge the source package.json into the dist package.json
    const {
        name,
        version,
        description,
        author,
        license,
        repository,
        peerDependencies,
        main,
    } = srcPackageJson;

    const mergedPackageJson = {
        ...distPackageJson,
        name,
        version,
        description,
        author,
        license,
        repository,
        peerDependencies,
        main,
    };

    writeJsonFile(pathToDist, mergedPackageJson);

    console.log('Generated package.json');
    return {
        success: true,
    };
}
