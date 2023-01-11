const { exec } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs/promises');
const { promisify } = require('node:util');

const execAsync = promisify(exec);

const { CF_BRANCH } = process.env;

const semverArgs = process.argv.slice(2, 5);

const BRANCH = {
    MASTER: 'master',
};

const RELEASE_APPROVAL = {
    APPROVED: 'approved',
    DENIED: 'denied',
    PENDING: 'pending-approval',
};

const semverTypeIndices = {
    0: 'major',
    1: 'minor',
    2: 'patch',
};

const execOut = async (...args) => {
    const { stdout, stderr } = await execAsync(...args);
    if (stderr) {
        console.error(...args, stderr);
    }
    if (stdout) {
        console.log(...args, stdout);
    }
};

const getPackageJsonVersion = async () =>
    JSON.parse(await fs.readFile('package.json', 'utf8')).version;

const test = async () => {
    await execOut('git switch jc/temp/test-ci-git');
    await execOut('git pull');
    await execOut(
        `git merge ${CF_BRANCH} -m "Merge branch '${CF_BRANCH}' into 'jc/temp/test-ci-git'"`
    );
    const { stdout: tarOut } = await execAsync('npm pack');
    console.log('Tar: ', tarOut.toString());
    const { stdout: addOut } = await execAsync('git add *.tgz');
    console.log('Add: ', addOut.toString());
    const { stdout: commitOut } = await execAsync(
        'git commit -m "Create tarball"'
    );
    console.log('Commit: ', commitOut.toString());
    const { stdout: pushOut } = await execAsync(
        'git push -u github jc/temp/test-ci-git'
    );
    console.log('Push: ', pushOut.toString());
};

const release = async () => {
    console.log('Received env: ', { CF_BRANCH });
    console.log('Received semver args: ', semverArgs);
    // get our semver type
    let semverType =
        semverTypeIndices[semverArgs.indexOf(RELEASE_APPROVAL.APPROVED)];
    if (!semverType) {
        throw new Error('Release not approved!');
    }
    // if we're not on the master branch
    if (CF_BRANCH !== BRANCH.MASTER) {
        // then this should be a pre-release semver type
        semverType = `pre${semverType}`;
    }
    // if our release type if a prepatch
    if (semverType === 'prepatch') {
        // then we should actually use pre-release, so that we can increment an existing pre-release
        semverType = 'prerelease';
    }

    // before we update our package versions, get our current version
    const currentVersion = await getPackageJsonVersion();
    // now, version our distribution package
    const versionCommand = `npm version --git-tag-version false --preid alpha  ${semverType}`;
    await execOut(versionCommand, {
        cwd: path.join(process.cwd(), 'dist/packages/react-orcus/prod'),
    });
    // then, version our source package
    await execOut(versionCommand);
    // get the new version from our package json
    const newVersion = await getPackageJsonVersion();

    // get the commit history since our last release
    const { stdout: commitHistory } = await execAsync(
        `git --no-pager log --pretty=format:'%s' --graph v${currentVersion}..HEAD`
    );
    // commit the changes to our package.json
    await execOut('git add package.json package-lock.json');
    await execOut(`git commit -m "v${newVersion}"`);
    // create an annotated tag
    await execOut(`git tag -a v${newVersion} -m "
react-orcus v${newVersion}

${commitHistory}
"`);
    // push our changes to the remote
    await execOut('git push github');
    // push our tag to the remote
    await execOut(`git push github v${newVersion}`);

    // now, it's time to build our distribution
    await execOut('mv dist built-dist');
    await execOut('mkdir dist');
    await execOut('cp built-dist/packages/react-orcus/dev/* dist/');
    await execOut('cp built-dist/packages/react-orcus/prod/* dist/');
    await execOut('cp -r built-dist/packages/react-orcus/build .');
    await execOut('cp -r built-dist/packages/react-orcus/src .');
    await execOut('rm -r built-dist');
    await execOut('rm package.json');
    await execOut('rm package-lock.json');
    await execOut('mv dist/package.json package.json');
    await execOut('mv dist/package-lock.json package-lock.json');

    // we are finally ready to publish our release
    await execOut('npm publish');
};

// test()
release()
    .then(() => {
        console.log('Done');
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
