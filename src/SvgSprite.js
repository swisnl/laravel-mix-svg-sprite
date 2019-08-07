'use strict';

const path = require('path');
const SvgSpriteLoaderPlugin = require('svg-sprite-loader/plugin');

class SvgSprite {
    constructor() {
        this.config = [];
    }

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
     */
    register(iconPath, spriteFilename, loaderOptions) {
        if (typeof spriteFilename === 'undefined') {
            spriteFilename = path.join(Config.fileLoaderDirs.images, 'sprite.svg');
        }
        if (typeof loaderOptions === 'undefined') {
            loaderOptions = Object.assign({}, Config.svgSprite.loaderOptions);
        }

        this.config.push({
            path: path.resolve(Mix.paths.rootPath, iconPath),
            loaderOptions: Object.assign({}, loaderOptions, {spriteFilename})
        });
    }

    webpackPlugins() {
        return new SvgSpriteLoaderPlugin(Config.svgSprite.pluginOptions);
    }

    webpackConfig(webpackConfig) {
        // Exclude the icons directory from all rules that match svg files
        this.config.forEach(config => {
            webpackConfig.module.rules.forEach(rule => {
                if (rule.test && rule.test.toString().includes('svg')) {
                    if (typeof rule.exclude === 'undefined') {
                        rule.exclude = [];
                    } else if (typeof rule.exclude === 'string') {
                        rule.exclude = [rule.exclude];
                    }

                    rule.exclude.push(config.path);
                }
            });
        });

        // Add our svg sprite rules
        this.config.forEach(config => {
            let loaders = [
                {
                    loader: 'svg-sprite-loader',
                    options: config.loaderOptions
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
                    config.path
                ],
                use: loaders
            });
        });
    }
}

module.exports = SvgSprite;
