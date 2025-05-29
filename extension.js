import Shell from 'gi://Shell'
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js'

export default class FolderSearchProviderExtension extends Extension {
  _settings = null

  disable() {
    if (this._settings) {
      this._settings = null
    }
  }

  enable() {
    this._settings = this.getSettings()
  }

  getRoot() {
    return this._settings ? this._settings.get_string('root') : false
  }

  getApp() {
    if (!this._settings) return false
    let appId = this._settings.get_string('application-id')
    if (appId === '') return false
    return Shell.AppSystem.get_default().lookup_app(appId)
  }
}
