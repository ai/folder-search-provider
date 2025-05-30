import Gio from 'gi://Gio'
import { overview } from 'resource:///org/gnome/shell/ui/main.js'
import Shell from 'gi://Shell'
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js'
import FolderProvider from './provider.js'

export default class FolderSearchProviderExtension extends Extension {
  _settings = null
  _provider = null

  enable() {
    this._settings = this.getSettings()
    this._provider = new FolderProvider(this)
    overview.searchController.addProvider(this._provider)
  }

  disable() {
    if (this._settings) {
      this._settings = null
    }
    if (this._provider) {
      overview.searchController.removeProvider(this._provider)
      this._provider = null
    }
  }

  getRoot() {
    if (!this._settings) return false
    let root = this._settings.get_string('root')
    if (root === '') return false
    return Gio.File.new_for_path(root)
  }

  getApp() {
    if (!this._settings) return false
    let appId = this._settings.get_string('application-id')
    if (appId === '') return false
    return Shell.AppSystem.get_default().lookup_app(appId + '.desktop')
  }
}
