# Preview Renderer

To integrate with Discord, Twitter, etc, we need to be able to generate a PNG image for a given EVE Online fit.
This repository does exactly that: feed it a fit, and it will generate a PNG image that shows that fit + statistics.

## How does it work?

This is a very simple server that starts a Puppeteer with Chromium, to fetch the fit from [EVEShip.fit](https://eveship.fit) and create a screenshot of that.
This screenshot is then returned to the user.
