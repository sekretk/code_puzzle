git reset --hard && git pull && cd api && npm run build && cd .. && pm2 restart quiz && cp -r ./client/build/* /var/www/quiz.boysthings.top/html/
