// require the main @nrwl/react/plugins/webpack configuration function.
const nrwlConfig = require('@nrwl/react/plugins/webpack');

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
        plugins: [...config.plugins],
    };
};
