# laravel-mix-svg-sprite

[![Node Version](https://img.shields.io/node/v/laravel-mix-svg-sprite.svg)](https://www.npmjs.com/package/laravel-mix-svg-sprite)
[![Latest Version on NPM](https://img.shields.io/npm/v/laravel-mix-svg-sprite.svg)](https://www.npmjs.com/package/laravel-mix-svg-sprite)
[![Code Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Software License](https://img.shields.io/github/license/swisnl/laravel-mix-svg-sprite.svg)](LICENSE)
[![Run Status](https://api.shippable.com/projects/5ad5a5902c5e9807003333da/badge?branch=master)](https://app.shippable.com/github/swisnl/laravel-mix-svg-sprite)
[![Coverage Badge](https://api.shippable.com/projects/5ad5a5902c5e9807003333da/coverageBadge?branch=master)](https://app.shippable.com/github/swisnl/laravel-mix-svg-sprite)
[![Known Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/laravel-mix-svg-sprite.svg)](https://snyk.io/test/github/swisnl/laravel-mix-svg-sprite?targetFile=package.json)
[![Made by SWIS](https://img.shields.io/badge/%F0%9F%9A%80-made%20by%20SWIS-%23D9021B.svg)](https://www.swis.nl)

SVG sprite component for Laravel Mix, wrapping [SVG sprite loader](https://github.com/kisenka/svg-sprite-loader) and [SVGO loader](https://github.com/rpominov/svgo-loader).

## Install

Install with npm:
```bash
$ npm install --save-dev laravel-mix-svg-sprite
```

## Usage

This component adds an extra API to Mix to create a SVG sprite of separate SVG files.
It can be used just like the other API's of Mix:

```javascript
// webpack.mix.js

let mix = require('laravel-mix');
require('laravel-mix-svg-sprite');

mix
    .js('src', 'output')
    .sass('src', 'output')
    .svgSprite('src/icons', 'output/sprite.svg', [loaderOptions], [pluginOptions]);
```

N.B. This component only adds a loader to the Webpack configuration, it doesn't glob your directory and include every file it finds.
You need to require the icons from within your code (JS, CSS, etc.) just like other modules to have them added to the sprite!

## Configuration

The config of this component is passed directly to svg-sprite-loader and its plugin.
Please refer to [their documentation](https://github.com/kisenka/svg-sprite-loader#configuration) for further details.
This are our defaults:

```javascript
Config.svgSprite = {
    /*
     * @see https://github.com/kisenka/svg-sprite-loader#configuration
     */
    loaderOptions: {
        extract: true
    },
    /*
     * @see https://github.com/kisenka/svg-sprite-loader#configuration
     */
    pluginOptions: {
        plainSprite: true
    }    
};
```

Configuration for SVGO is copied from ``Config.imgLoaderOptions.svgo``.
If you disable SVGO for the image-loader, it is also disabled for this component.

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Testing

``` bash
$ npm test
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) and [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md) for details.

## Security

If you discover any security related issues, please email security@swis.nl instead of using the issue tracker.

## Credits

- [Jasper Zonneveld](https://github.com/JaZo)
- [All Contributors](../../contributors)

This component is a wrapper for [SVG sprite loader](https://github.com/kisenka/svg-sprite-loader/graphs/contributors) and [SVGO loader](https://github.com/rpominov/svgo-loader/graphs/contributors), so a huge thanks to their contributors!

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

## SWIS

[SWIS](https://www.swis.nl) is a web agency from Leiden, the Netherlands. We love working with open source software.
