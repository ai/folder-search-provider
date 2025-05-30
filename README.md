# Folder Search Provider

GNOME extension to add to GNOME system search a quick way to run any of your projects in specific IDE.

You define root folder and application and the extension add a search through root folder’s children and run selected folder in specified app.

<img src="./example.png" alt="Folder Search Provider" align="right" />

This extension will need App ID of IDE. App ID is filename of `.desktop` files in:
- `/usr/share/applications/`
- `/var/lib/flatpak/exports/share/applications/`
- `~/.local/share/applications/`

You may use [Pins](https://flathub.org/apps/io.github.fabrialberio.pinapp) app to create app for custom script.
