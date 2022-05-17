const { execSync } = require("child_process");
const { chdir } = require("process");

const run = (command) => {
    console.log('RUN', command);
    const result = execSync(command);
    console.log('OUTPUT', result.toString());
}
run('git reset --hard');
run('git pull');
chdir('api');
run('npm i');
run('npm run build');
chdir('cd ../client');
run('npm i');
run('npm run build');
run('cp -r ./client/build/* /var/www/quiz.boysthings.top/html/');