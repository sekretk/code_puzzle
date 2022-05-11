git reset --hard && git pull && cd api && npm run build && cd .. && pm2 restart code_puzzle_api && cp -r ./client/build/* /var/www/quiz.boysthings.top/html/
