import Glib from 'gi://GLib'
import Gio from 'gi://Gio'

export default class FolderProvider {
  constructor(extension) {
    this.extension = extension
    this.appInfo = extension.getApp().appInfo
  }

  activateResult(folder) {
    let root = this.extension.getRoot()
    let app = this.extension.getApp()
    if (app) {
      try {
        const path = this._resolveHomePath(root + folder)
        this.app.app_info.launch([Gio.file_new_for_path(path)], null)
      } catch (e) {
        console.error(e)
      }
    }
  }

  filterResults(results, maxResults) {
    return results.slice(0, maxResults)
  }

  async getInitialResultSet(terms) {
    return this.getSubsearchResultSet(this.workspaces, terms)
  }

  async getSubsearchResultSet(previousResults, terms) {
    let root = this.extension.getRoot()
    let app = this.extension.getApp()
    if (!app || !root) return []
    return terms.reduce(
      (result, term) => result.filter(i => i.toLowerCase().includes(term)),
      this._loadFolders(root)
    )
  }

  async getResultMetas(folders) {
    let app = this.extension.getApp()
    return folders.map(folder => ({
      id: folder,
      name: folder,
      createIcon: size => app && app.create_icon_texture(size)
    }))
  }

  _loadFolders(root) {
    let result = []
    try {
      let rootFile = Gio.File.new_for_path(root)
      let enumerator = rootFile.enumerate_children(
        'standard::name,standard::type',
        Gio.FileQueryInfoFlags.NONE,
        null
      )

      let info
      while ((info = enumerator.next_file(null)) !== null) {
        if (info.get_file_type() === Gio.FileType.DIRECTORY) {
          result.push(info.get_name())
        }
      }
      enumerator.close(null)
    } catch (e) {
      console.error(e)
    } finally {
      return result
    }
  }

  _resolveHomePath(path) {
    return path.replace(/^~/, Glib.get_home_dir())
  }
}
