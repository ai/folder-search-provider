.PHONY: test clean build local

po/folder-search-provider.pot: prefs.js
	xgettext -o po/folder-search-provider.pot prefs.js

test: build

clean:
	rm -f *.zip

build: clean po/folder-search-provider.pot
	gnome-extensions pack ./

local: build
	gnome-extensions install -f *.zip

debug: local
	dbus-run-session -- gnome-shell --nested --wayland
