const { exec } = require('node:child_process');
const { promisify } = require('node:util');

const execAsync = promisify(exec);

const release = async () => {
    const { stdout: switchOut } = await execAsync('git switch master');
    console.log('Switch master: ', switchOut.toString());
    const { stdout: pullOut } = await execAsync('git pull');
    console.log('Pull master: ', pullOut.toString());
    const { stdout: switchCOut } = await execAsync(
        'git switch -c jc/temp/test-ci-git'
    );
    console.log('Create temp branch: ', switchCOut.toString());
    const { stdout: tarOut } = await execAsync('npm pack');
    console.log('Tar: ', tarOut.toString());
    const { stdout: addOut } = await execAsync('git add *.tgz');
    console.log('Add: ', addOut.toString());
    const { stdout: commitOut } = await execAsync(
        'git commit -m "Create tarball"'
    );
    console.log('Commit: ', commitOut.toString());
    const { stdout: pushOut } = await execAsync(
        'git push -u origin jc/temp/test-ci-git'
    );
    console.log('Push: ', pushOut.toString());
    //await execAsync('npm --no-git-tag-version version patch');
    //await execAsync('git push --follow-tags');
};

release()
    .then(() => {
        console.log('Done');
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
