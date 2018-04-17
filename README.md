# laravel-mix-svg-sprite

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

## License

`laravel-mix-svg-sprite` is licensed under the MIT License - see the [LICENSE file](LICENSE) for details.

## Credits

This component is a wrapper for [SVG sprite loader](https://github.com/kisenka/svg-sprite-loader/graphs/contributors) and [SVGO loader](https://github.com/rpominov/svgo-loader/graphs/contributors), so a huge thanks to their contributors!
