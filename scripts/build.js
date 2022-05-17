const { exec } = require("child_process");

exec('git reset --hard');
exec('git pull');
exec('cd api');
exec('npm i');
exec('npm run build');
exec('cd ..');
exec('pm2 restart quiz');
exec('cd client');
exec('npm i');
exec('npm run build');
exec('cd ..');
exec('cp -r ./client/build/* /var/www/quiz.boysthings.top/html/');