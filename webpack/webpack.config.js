import { nodeEnv } from './../src/shared/env';

const configMap = {
    'development': require('./webpack.dev.config'),
    'production': require('./webpack.prod.config')
};

module.exports = configMap[nodeEnv];