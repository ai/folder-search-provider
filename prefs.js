import Adw from 'gi://Adw'
import Gio from 'gi://Gio'
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

    let group = new Adw.PreferencesGroup({})
    page.add(group)

    let folderRow = new Adw.ActionRow({
      title: _('Search folders in')
    })

    let folderButton = new Gtk.Button({
      label: _('Choose'),
      valign: Gtk.Align.CENTER
    })

    let folderBox = new Gtk.Box({
      orientation: Gtk.Orientation.HORIZONTAL,
      spacing: 12,
      valign: Gtk.Align.CENTER
    })
    folderBox.append(
      new Gtk.Label({
        label: settings.get_string('root') || _('No folder selected'),
        css_classes: ['dim-label'],
        ellipsize: 3,
        valign: Gtk.Align.CENTER
      })
    )
    folderBox.append(folderButton)
    folderRow.add_suffix(folderBox)
    group.add(folderRow)

    folderButton.connect('clicked', () => {
      folderButton.set_sensitive(false)

      let dialog = new Gtk.FileChooserDialog({
        title: _('Select Search Folder'),
        transient_for: window,
        action: Gtk.FileChooserAction.SELECT_FOLDER,
        modal: true
      })

      dialog.add_button(_('Cancel'), Gtk.ResponseType.CANCEL)
      dialog.add_button(_('Select'), Gtk.ResponseType.ACCEPT)

      let currentFolder = settings.get_string('root')
      if (currentFolder) {
        try {
          dialog.set_current_folder(Gtk.Gio.File.new_for_path(currentFolder))
        } catch (e) {}
      }

      dialog.connect('response', (dialog, response) => {
        if (response === Gtk.ResponseType.ACCEPT) {
          let folder = dialog.get_file()
          let path = folder.get_path()
          settings.set_string('root', path)
          folderLabel.set_text(path)
        }

        folderButton.set_sensitive(true)
        dialog.close()
      })

      dialog.present()
    })

    settings.connect('changed::root', () => {
      let path = settings.get_string('root')
      folderLabel.set_text(path || _('No folder selected'))
    })

    let appRow = new Adw.EntryRow({
      title: _('App ID to run with selected folder'),
      text: settings.get_string('application-id')
    })
    appRow.set_show_apply_button(true)
    group.add(appRow)

    let appError = new Gtk.Label({
      css_classes: ['error'],
      wrap: true,
      visible: false,
      margin_start: 12,
      margin_end: 12,
      margin_top: 6,
      xalign: 0
    })
    group.add(appError)

    function validateAppId(appId) {
      if (appId.trim() === '') {
        appError.set_visible(false)
        return true
      }

      if (!Gio.DesktopAppInfo.new(appId + '.desktop')) {
        appError.set_text(_('Application not found. Check app ID guide below.'))
        appError.set_visible(true)
        return false
      } else {
        appError.set_visible(false)
        return true
      }
    }

    function update() {
      let appId = appRow.get_text()
      if (validateAppId(appId)) {
        settings.set_string('application-id', appId)
      }
    }
    appRow.connect('apply', update)
    appRow.connect('entry-activated', update)
    validateAppId(settings.get_string('application-id'))

    page.add(
      new Adw.PreferencesGroup({
        description: _(
          'App ID is filename of .desktop files in:\n/usr/share/applications/\n/var/lib/flatpak/exports/share/applications/\n~/.local/share/applications/\n\nUse the Pins app to check the app ID or create app for custom script.'
        )
      })
    )
  }
}
