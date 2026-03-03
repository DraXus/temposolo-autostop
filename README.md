# Temposolo Auto-Stop Chrome Extension

Automatically stops the [Temposolo](https://temposolo.es) timer when your computer locks or shuts down.

> **Disclaimer:** This extension is an independent project and is not affiliated with, endorsed by, or associated with [Temposolo](https://temposolo.es) in any way.

## Features

- 🔒 Detects when your computer locks and stops the timer
- 🔌 Stops the timer when your computer shuts down or restarts
- 🎯 Works seamlessly with https://temposolo.es/timer
- 🔍 Lightweight with no external dependencies

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top right)
4. Click "Load unpacked"
5. Select the `temposolo-autostop` directory
6. The extension is now installed!

## How It Works

The extension consists of three main components:

1. **Background Service Worker** (`background.js`)
   - Monitors your computer's idle state using Chrome's Idle API
   - Detects when the computer locks (idle state = "locked")
   - Listens for browser suspension events (shutdown/restart)
   - Sends messages to the content script to stop the timer

2. **Content Script** (`content.js`)
   - Runs on https://temposolo.es/timer pages
   - Listens for stop messages from the background worker
   - Checks the timer state in localStorage
   - Clicks the "Detener" button to stop the timer
   - Falls back to directly updating localStorage if button not found

3. **Manifest** (`manifest.json`)
   - Defines extension permissions and configuration
   - Uses Manifest V3 (latest Chrome extension standard)

## Permissions

The extension requires the following permissions:

- `idle` - To detect when your computer locks
- `tabs` - To find open Temposolo timer tabs and send a message to stop the timer

It also runs a content script on:

- `https://temposolo.es/timer*` - To click the stop button on the timer page

## Privacy

This extension does not collect or transmit user data. See `PRIVACY.md`.

## Debugging

To see the extension logs:

1. Go to `chrome://extensions/`
2. Find "Temposolo Auto-Stop"
3. Click "Details"
4. Click "service worker" to view background logs
5. On the timer page, open DevTools (F12) to view content script logs

## Known Limitations

- Requires the Temposolo timer tab to be open in Chrome
- Only works when Chrome is running

## Future Improvements

- Add user-configurable idle detection interval
- Add notifications when timer is stopped
- Add popup UI with extension status