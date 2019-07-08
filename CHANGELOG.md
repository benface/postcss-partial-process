# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project mostly adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2019-04-04

### Added
- `removeComments` can now be set to `'auto'`, meaning comments are removed unless they are important (e.g. `/*! postcss-partial-process start */`)
- More tests

### Changed
- Default values have changed for the following options:
    - `startComment` is now `postcss-partial-process start`
    - `endComment` is now `postcss-partial-process end`
    - `removeComments` is now `'auto'`
- Updated dependencies

### Fixed
- Important comments are now detected properly

## [1.0.0] - 2018-05-03

Initial release

[Unreleased]: https://github.com/benface/postcss-partial-process/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/benface/postcss-partial-process/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/benface/postcss-partial-process/releases/tag/v1.0.0
