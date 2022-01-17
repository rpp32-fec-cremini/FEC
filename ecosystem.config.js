module.exports = {
  apps: [{
    name: 'FEC',
    script: 'server/server.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-50-18-105-138.us-west-1.compute.amazonaws.com',
      key: 'fec.pem',
      ref: 'origin/main',
      repo: 'https://github.com/rpp32-fec-cremini/FEC.git',
      path: '/home/ubuntu/FECProd',
      'post-deploy': 'npm install & npm run build && pm2 startOrRestart ecosystem.config.js'
    }
  }
}