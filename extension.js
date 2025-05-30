import Gio from 'gi://Gio'
import { overview } from 'resource:///org/gnome/shell/ui/main.js'
import Shell from 'gi://Shell'
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js'
import FolderProvider from './provider.js'

export default class FolderSearchProviderExtension extends Extension {
  #settings = null
  #provider = null
  #watching = null

  enable() {
    this.#settings = this.getSettings()

    this.#provider = new FolderProvider(this)
    this.#provider.appInfo = this.getApp().appInfo
    overview.searchController.addProvider(this.#provider)

    this.#watching = this.#settings.connect('changed::application-id', () => {
      this.#provider.appInfo = this.getApp().appInfo
    })
  }

  disable() {
    if (this.#settings) {
      this.#settings.disconnect(this.#watching)
      this.#settings = null
    }
    if (this.#provider) {
      overview.searchController.removeProvider(this.#provider)
      this.#provider = null
    }
  }

  getRoot() {
    if (!this.#settings) return false
    let root = this.#settings.get_string('root')
    if (root === '') return false
    return Gio.File.new_for_path(root)
  }

  getApp() {
    if (!this.#settings) return false
    let appId = this.#settings.get_string('application-id')
    if (appId === '') return false
    return Shell.AppSystem.get_default().lookup_app(appId + '.desktop')
  }
}
