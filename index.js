const mix = require('laravel-mix');
const config = require('./config');
const SvgSprite = require('./src/SvgSprite');

let name = 'svgSprite';

Config.merge({
    [name]: config
});

mix.extend(name, new SvgSprite());
