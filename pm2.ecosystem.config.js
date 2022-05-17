module.exports = {
    apps : [{
      name: "quiz",
      script: "node /var/repo/code_puzzle/api/build/index.js",
    }, {
        name: "quiz_build",
        script: "node /var/repo/code_puzzle/scripts/build.js",
        autorestart: false,
        watch: false,
        instances: 1,
        cron_restart: '*/10 * * * *',
        env: {
            BOT_TOCKEN: "TOKEN",
            NOTIFY_CHAT: "CHAT_ID",
        },
      }]
  }