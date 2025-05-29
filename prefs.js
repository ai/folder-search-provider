import Adw from 'gi://Adw'
import Gtk from 'gi://Gtk'
import {
  gettext as _,
  ExtensionPreferences
} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js'

export default class FolderSearchProviderPreferences extends ExtensionPreferences {
  fillPreferencesWindow(window) {
    let settings = this.getSettings()
    window._settings = settings

    let page = new Adw.PreferencesPage()
    window.add(page)

    let group = new Adw.PreferencesGroup()
    page.add(group)
  }
}
