# Folder Search Provider

GNOME extension to add to GNOME system search a quick way to run any of your projects in specific IDE.

You define root folder and application and the extension add a search through root folder’s children and run selected folder in specified app.

<img src="./example.png" alt="Folder Search Provider" />


## Install

[<img src="https://raw.githubusercontent.com/andyholmes/gnome-shell-extensions-badge/master/get-it-on-ego.svg?sanitize=true" height="100">](https://extensions.gnome.org/extension/8227/folder-search-provider/)

1. Open [Folder Search Provider] on GNOME Shell Extensions site.
2. Click slider to install extension.
3. Reload page.
4. Open extension settings.
5. Set root folder and app ID (see guide below).

[Folder Search Provider]: https://extensions.gnome.org/extension/8227/folder-search-provider/

## App ID

This extension needs App ID of IDE. App ID is filename of `.desktop` files in:
- `/usr/share/applications/`
- `/var/lib/flatpak/exports/share/applications/`
- `~/.local/share/applications/`

You may use [Pins](https://flathub.org/apps/io.github.fabrialberio.pinapp) app to create app for custom script.
