const { exec } = require('node:child_process');
const { promisify } = require('node:util');

const execAsync = promisify(exec);

const { CF_BRANCH } = process.env;

const execOut = async (...args) => {
    const { stdout, stderr } = await execAsync(...args);
    if (stderr) {
        console.error(...args, stderr);
    }
    if (stdout) {
        console.log(...args, stdout);
    }
};

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
    await execAsync('npm --no-git-tag-version version patch');
    await execAsync('git push --follow-tags');
};

test()
    //release()
    .then(() => {
        console.log('Done');
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
