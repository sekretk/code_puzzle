const { execSync } = require("child_process");
const { chdir } = require("process");
const path = require('path');

const run = (command) => {
    console.log('RUN', command);
    const result = execSync(command);
    console.log('OUTPUT', result.toString());
}
run('git reset --hard');
run('git pull');
chdir(path.join(__dirname, '..\\api'));
run('npm i');
run('npm run build');
chdir(path.join(__dirname, '..\\client'));
run('npm i');
run('npm run build');
chdir(path.join(__dirname, '..'));
run('cp -r ./client/build/* /var/www/quiz.boysthings.top/html/');