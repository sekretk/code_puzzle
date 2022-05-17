module.exports = {
    apps : [{
      name: "quiz",
      script: "node /var/repo/code_puzzle/api/build/index.js",
    }, {
        name: "quiz_build",
        script: "node /var/repo/code_puzzle/scripts/build.js",
        cron_restart: '0 0/10 * * *',
        env: {
            BOT_TOCKEN: "TOKEN",
            NOTIFY_CHAT: "CHAT",
        },
      }]
  }