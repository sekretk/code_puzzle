git reset --hard
git pull
cd api
npm run build
cd .. && pm2 restart quiz
cd client
npm run build
cd ..
cp -r ./client/build/* /var/www/quiz.boysthings.top/html/