const { execSync } = require("child_process");

const run = (command) => {
    console.log('RUN', command);
    const result = execSync(command);
    console.log('OUTPUT', result.toString());
}
run('git reset --hard');
run('git pull');
run('cd api');
run('npm i');
run('npm run build');
run('npm run build');
run('cd ..');
run('cp -r ./client/build/* /var/www/quiz.boysthings.top/html/');