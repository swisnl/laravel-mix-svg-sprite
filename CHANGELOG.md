# Changelog

All notable changes to `swisnl/laravel-mix-svg-sprite` will be documented in this file.

Updates should follow the [Keep a CHANGELOG](http://keepachangelog.com/) principles.

## [Unreleased]

### Added

* Added support for creating multiple sprites.

### Removed

* Plugin options can no longer be specified using the provided mix API i.e. `mix.svgSprite(..., ..., ..., pluginOptions);`. As of now they can only be changed using the global options i.e. `mix.config({svgSprite: {pluginOptions: {plainSprite: false}}})`.
