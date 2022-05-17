const { execSync } = require("child_process");
const { chdir } = require("process");
const path = require('path');
require('dotenv').config();
const https = require('https')
const querystring = require("querystring");

const sendNotification = (message) => {

    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: encodeURI()`/${process.env.BOT_TOCKEN}/sendMessage?chat_id=${process.env.NOTIFY_CHAT}&text=${message}`,
        method: 'GET'
      }
      
      const req = https.request(options, res => {
          console.log(`statusCode: ${res.statusCode}`)
        
          res.on('data', d => {
            process.stdout.write(d)
          })
        })
        
        req.on('error', error => {
          console.error(error)
        })
        
        req.end()
}


const run = (command) => {
    console.log('RUN', command);
    const result = execSync(command);
    console.log('OUTPUT', result.toString());
}

run('git reset --hard');

if (execSync('git pull').toString().includes('Already up to date')) {
    return;
}

chdir(path.join(__dirname, '../api'));
run('npm i');
run('npm run build');
chdir(path.join(__dirname, '../client'));
run('npm i');
run('npm run build');
chdir(path.join(__dirname, '..'));
run('cp -r ./client/build/* /var/www/quiz.boysthings.top/html/');
sendNotification('Updated')