module.exports = {
  apps: [
    {
      name: 'oasis-bi-pro',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      combine_logs: true
    }
  ]
}
