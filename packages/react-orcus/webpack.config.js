// require the main @nrwl/react/plugins/webpack configuration function.
const nrwlConfig = require('@nrwl/react/plugins/webpack');
const path = require('node:path');
const Visualizer = require('webpack-visualizer-plugin2');

module.exports = (config, _context) => {
    // first call it so that it @nrwl/react plugin adds its configs,
    nrwlConfig(config);

    // then override your config.
    return {
        ...config,
        externals: {
            ...config.externals,
            // Don't bundle react or react-dom
            react: {
                commonjs: 'react',
                commonjs2: 'react',
                amd: 'react',
                root: 'React',
            },
            'react-dom': {
                commonjs: 'react-dom',
                commonjs2: 'react-dom',
                amd: 'react-dom',
                root: 'ReactDOM',
            },
        },
        output: {
            ...config.output,
            library: 'Orcus',
            libraryTarget: 'umd',
        },
        plugins: [
            ...config.plugins,
            ...(process.env.ENABLE_STATS
                ? [
                      new Visualizer({
                          filename: 'statistics.html',
                      }),
                  ]
                : []),
        ],
        // resolve: {
        //     ...config.resolve,
        //     alias: {
        //         ...config.resolve.alias,
        //         'redux-orm': path.resolve(
        //             __dirname,
        //             '../../node_modules/redux-orm/src'
        //         ),
        //     },
        // },
    };
};
