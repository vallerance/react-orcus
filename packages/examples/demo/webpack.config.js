// require the main @nrwl/react/plugins/webpack configuration function.
const nrwlConfig = require('@nrwl/react/plugins/webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (config, _context) => {
    // first call it so that it @nrwl/react plugin adds its configs,
    nrwlConfig(config);

    // then override your config.
    return {
        ...config,
        plugins: [
            ...config.plugins,
            new CopyPlugin({
                patterns: [
                    {
                        from: '../../../node_modules/react/umd/react.development.js',
                        to: 'node_modules/react/umd/react.development.js',
                    },
                    {
                        from: '../../../node_modules/react-dom/umd/react-dom.development.js',
                        to: 'node_modules/react-dom/umd/react-dom.development.js',
                    },
                    {
                        from: '../../../node_modules/moment-duration-format/lib/moment-duration-format.js',
                        to: 'node_modules/moment-duration-format/lib/moment-duration-format.js',
                    },
                    {
                        from: '../../../node_modules/@babel/standalone/babel.js',
                        to: 'node_modules/@babel/standalone/babel.js',
                    },
                    {
                        from: '../../../node_modules/moment/dist/moment.js',
                        to: 'node_modules/moment/dist/moment.js',
                    },
                    {
                        from: '../../../dist/packages/react-orcus/dev/react-orcus.js',
                        to: 'dist/react-orcus.js',
                    },
                ],
            }),
        ],
    };
};
