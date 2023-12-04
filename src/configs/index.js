
const config = {
  //开发
  dev: {
    apiBaseUrl: 'http://localhost:3000/api',
    debug: true,
  },
  //测试
  test: {
    apiBaseUrl: 'https://test-api.example.com',
    debug: false,
  },
  //预发布
  pre: {
    apiBaseUrl: 'https://staging-api.example.com',
    debug: false,
  },
  //生产
  production: {
    apiBaseUrl: 'https://api.example.com',
    debug: false,
  },
}

export default config[process.env.NODE_ENV || 'dev']
