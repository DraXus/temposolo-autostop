# Changelog

All notable changes to this project will be documented in this file.

## [1.1.1] - 2026-03-03

### Added
- Privacy policy (PRIVACY.md)

### Changed
- Removed unused permissions (`storage`, `scripting`) and removed redundant `host_permissions` entry

## [1.1.0] - 2026-03-03

### Added
- Extension icons (16x16, 48x48, 128x128)

## [1.0.0] - 2026-02-24

### Added
- Initial release
- Auto-stop timer when computer locks (idle state detection via Chrome Idle API)
- Auto-stop timer on browser suspension (shutdown/restart)
- Content script targeting `https://temposolo.es/timer`
- Clicks "Detener" button to stop the timer; falls back to localStorage update
- Background service worker using Manifest V3
