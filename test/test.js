'use strict';

const path = require('path');
const assert = require('assert');
const SvgSprite = require('../src/SvgSprite');
const SvgSpriteLoaderPlugin = require('svg-sprite-loader/plugin');

describe('SvgSprite', function () {
    beforeEach(function () {
        global.Mix = {
            paths: {
                rootPath: __dirname
            }
        };
        global.Config = {
            fileLoaderDirs: {
                images: 'images'
            },
            imgLoaderOptions: {
                svgo: {}
            },
            svgSprite: {
                loaderOptions: {
                    foo: 'bar'
                },
                pluginOptions: {
                    foo: 'baz'
                }
            }
        };
    });

    describe('name', function () {
        it('returns the correct names', function () {
            assert.deepStrictEqual(
                (new SvgSprite()).name(),
                ['svgSprite', 'sprite']
            );
        });
    });

    describe('dependencies', function () {
        it('returns the correct dependencies', function () {
            assert.deepStrictEqual(
                (new SvgSprite()).dependencies(),
                ['svg-sprite-loader', 'svgo-loader', 'svgo']
            );
        });
    });

    describe('register', function () {
        it('uses the correct defaults', function () {
            let instance = new SvgSprite();
            instance.register('src/icons');

            assert.deepStrictEqual(
                instance.config[0],
                {
                    path: path.resolve(__dirname, 'src/icons'),
                    loaderOptions: {
                        spriteFilename: path.join('images', 'sprite.svg'),
                        foo: 'bar'
                    },
                }
            );
        });

        it('uses the given options', function () {
            let instance = new SvgSprite();
            instance.register('src/icons', 'dist/icon-sprite.svg', {custom: true});

            assert.deepStrictEqual(
                instance.config[0],
                {
                    path: path.resolve(__dirname, 'src/icons'),
                    loaderOptions: {
                        spriteFilename: 'dist/icon-sprite.svg',
                        custom: true
                    },
                }
            );
        });

        it('can register multiple sprites', function () {
            let instance = new SvgSprite();
            instance.register('src/foo', 'dist/foo-sprite.svg', {});
            instance.register('src/bar', 'dist/bar-sprite.svg', {});

            assert.strictEqual(instance.config.length, 2);
            assert.deepStrictEqual(
                instance.config[0],
                {
                    path: path.resolve(__dirname, 'src/foo'),
                    loaderOptions: {
                        spriteFilename: 'dist/foo-sprite.svg',
                    },
                }
            );
            assert.deepStrictEqual(
                instance.config[1],
                {
                    path: path.resolve(__dirname, 'src/bar'),
                    loaderOptions: {
                        spriteFilename: 'dist/bar-sprite.svg',
                    },
                }
            );
        });
    });

    describe('webpackPlugins', function () {
        it('returns the correct plugin', function () {
            let instance = new SvgSprite();
            instance.register('src/icons');

            assert.ok(instance.webpackPlugins() instanceof SvgSpriteLoaderPlugin);
        });
    });

    describe('webpackConfig', function () {
        it('adds an exclude entry to every existing rule', function () {
            let webpackConfig = {
                module: {
                    rules: [
                        {
                            test: 'no-exclude.svg'
                        },
                        {
                            test: 'string-exclude.svg',
                            exclude: 'something'
                        },
                        {
                            test: 'array-exclude.svg',
                            exclude: [
                                'something'
                            ]
                        },
                        {
                            test: 'ignore'
                        }
                    ]
                }
            };

            let instance = new SvgSprite();
            instance.register('src/icons');
            instance.webpackConfig(webpackConfig);

            // Remove the last rule for this test
            webpackConfig.module.rules.pop();

            assert.deepStrictEqual(
                webpackConfig,
                {
                    module: {
                        rules: [
                            {
                                test: 'no-exclude.svg',
                                exclude: [
                                    path.resolve(__dirname, 'src/icons')
                                ]
                            },
                            {
                                test: 'string-exclude.svg',
                                exclude: [
                                    'something',
                                    path.resolve(__dirname, 'src/icons')
                                ]
                            },
                            {
                                test: 'array-exclude.svg',
                                exclude: [
                                    'something',
                                    path.resolve(__dirname, 'src/icons')
                                ]
                            },
                            {
                                test: 'ignore'
                            }
                        ]
                    }
                }
            );
        });

        it('adds the correct rule', function () {
            let webpackConfig = {
                module: {
                    rules: []
                }
            };

            let instance = new SvgSprite();
            instance.register('src/icons');
            instance.webpackConfig(webpackConfig);

            assert.deepStrictEqual(
                webpackConfig.module.rules.pop(),
                {
                    include: [
                        path.resolve(__dirname, 'src/icons')
                    ],
                    test: /\.(svg)(\?.*)?$/,
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                foo: 'bar',
                                spriteFilename: path.join('images', 'sprite.svg')
                            }
                        },
                        {
                            loader: 'svgo-loader',
                            options: {}
                        }
                    ]
                }
            );
        });

        it('adds multiple rules for multiple sprites', function () {
            let webpackConfig = {
                module: {
                    rules: []
                }
            };

            let instance = new SvgSprite();
            instance.register('src/icons');
            instance.register('src/other-icons', 'images/other-sprite.svg');
            instance.webpackConfig(webpackConfig);

            assert.strictEqual(webpackConfig.module.rules.length, 2);
            // N.B. assertion in reverse order
            assert.deepStrictEqual(
                webpackConfig.module.rules.pop(),
                {
                    include: [
                        path.resolve(__dirname, 'src/other-icons')
                    ],
                    test: /\.(svg)(\?.*)?$/,
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                foo: 'bar',
                                spriteFilename: 'images/other-sprite.svg'
                            }
                        },
                        {
                            loader: 'svgo-loader',
                            options: {}
                        }
                    ]
                }
            );
            assert.deepStrictEqual(
                webpackConfig.module.rules.pop(),
                {
                    include: [
                        path.resolve(__dirname, 'src/icons')
                    ],
                    test: /\.(svg)(\?.*)?$/,
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                foo: 'bar',
                                spriteFilename: path.join('images', 'sprite.svg')
                            }
                        },
                        {
                            loader: 'svgo-loader',
                            options: {}
                        }
                    ]
                }
            );
        });

        it('does not add the svgo-loader if it is disabled', function () {
            global.Config.imgLoaderOptions.svgo = false;

            let webpackConfig = {
                module: {
                    rules: []
                }
            };

            let instance = new SvgSprite();
            instance.register('src/icons');
            instance.webpackConfig(webpackConfig);

            assert.deepStrictEqual(
                webpackConfig.module.rules.pop(),
                {
                    include: [
                        path.resolve(__dirname, 'src/icons')
                    ],
                    test: /\.(svg)(\?.*)?$/,
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                foo: 'bar',
                                spriteFilename: path.join('images', 'sprite.svg')
                            }
                        }
                    ]
                }
            );
        });
    });
});
