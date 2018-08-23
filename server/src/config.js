const convict = require('convict');

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test', 'stage'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3030,
    env: 'PORT',
    arg: 'port',
  },
  credentials: {
    algorithm: {
      doc: 'Current crypt algorithm',
      env: 'CRED_ALG',
      default: 'default',
    },
  },
  mongoUri: {
    doc: 'MongoDB connection string',
    format: '*',
    default: 'mongodb://localhost',
    env: 'MONGO_URI',
  },
});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile(`config/${env}.json`);
// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
