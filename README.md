MTG Display Color Names
=============

Chrome extension that appends the display of colors to color names for associated Magic: The Gathering guilds/shards/wedges.

Turn it on/off globally by clicking on the extension icon, then clicking on the power button.
This requires a refresh of the currently open pages to take effect.

![Power](https://i.imgur.com/zhPIye3.png)

Download here: https://chrome.google.com/webstore/detail/mtg-display-color-names/nngpmgkjlppmoadcjbabccppcbdeeobf

Before:

![Before](https://i.imgur.com/TfD4zrF.png)

After:

![After](https://i.imgur.com/ttbn4wF.png)

Credits for icons:
- mtg.gamepedia.com for Magic symbols
- flaticon.com for power icon

Color combinations as according to:
- https://mtg.gamepedia.com/Multicolor

Development
-----------

Development is done using [npm](https://www.npmjs.com/) and [browserify](https://www.npmjs.com/package/browserify).

First, install [Node and npm](https://nodejs.org/en/). If you use [Node versin manager](https://github.com/creationix/nvm), there is an `.nvmrc` to use a specific version of Node/npm.

Next, install the dependencies for the project:

```bash
npm install
```

Make changes to any of the JavaScript files in the `src` directory, and then run the build script:

```
npm run build
``

This will build the files and copy them to the package directory, which can be packed and uploaded as a Chrome Extension.

See [Chrome's instructions for developing a Chrome extension](https://developer.chrome.com/extensions/getstarted) for details on how to load the package folder as an unpacked extension.

TODO
---
- Add options for enabling/disabling display of certain guilds (e.g. if you already know certain ones and only want to display them for certain ones) (also disable 4-color guilds by default since some have common names)
- Add options for a blacklist/whitelist on websites?
- Add option to display the guild symbol
- Option for customizing font size (to be +/- x from the amount it's currently subtracting from aka 4)
- Add option to only replace the first one on the page? That way it's more of a reminder of what color it is
- Fix + re-enable on Twitter

