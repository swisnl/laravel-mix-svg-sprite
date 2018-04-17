const path = require('path');
const SvgSpriteLoaderPlugin = require('svg-sprite-loader/plugin');

class SvgSprite {
    name() {
        return ['svgSprite', 'sprite'];
    }

    dependencies() {
        return ['svg-sprite-loader', 'svgo-loader', 'svgo'];
    }

    /**
     * @param {String} iconPath
     * @param {String} [spriteFilename]
     * @param {Object} [loaderOptions]
     * @param {Object} [pluginOptions]
     */
    register(iconPath, spriteFilename, loaderOptions, pluginOptions) {
        if (typeof spriteFilename === 'undefined') {
            spriteFilename = path.join(Config.fileLoaderDirs.images, 'sprite.svg');
        }
        if (typeof loaderOptions === 'undefined') {
            loaderOptions = Object.assign({}, Config.svgSprite.loaderOptions);
        }
        if (typeof pluginOptions === 'undefined') {
            pluginOptions = Object.assign({}, Config.svgSprite.pluginOptions);
        }

        this.config = {
            path: path.resolve(Mix.paths.rootPath, iconPath),
            loaderOptions: Object.assign({}, loaderOptions, {spriteFilename}),
            pluginOptions
        };
    }

    webpackPlugins() {
        return new SvgSpriteLoaderPlugin(this.config.pluginOptions);
    }

    webpackConfig(webpackConfig) {
        // Exclude the icons directory from all rules that match svg files
        webpackConfig.module.rules.forEach(rule => {
            if (rule.test && rule.test.toString().includes('svg')) {
                if (typeof rule.exclude === 'undefined') {
                    rule.exclude = [];
                } else if (typeof rule.exclude === 'string') {
                    rule.exclude = [rule.exclude];
                }

                rule.exclude.push(this.config.path);
            }
        });

        // Add our svg sprite rule
        let loaders = [
            {
                loader: 'svg-sprite-loader',
                options: this.config.loaderOptions
            }
        ];
        if (Config.imgLoaderOptions.svgo !== false) {
            loaders.push({
                loader: 'svgo-loader',
                options: Config.imgLoaderOptions.svgo
            });
        }
        webpackConfig.module.rules.push({
            test: /\.(svg)(\?.*)?$/,
            include: [
                this.config.path
            ],
            use: loaders
        });
    }
}

module.exports = SvgSprite;
