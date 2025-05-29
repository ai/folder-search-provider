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
}
