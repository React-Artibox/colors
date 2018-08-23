// @flow

export class Color {
  static ThemeNotFountError = new Error('Theme Not Found')

  static addThemeMap(name, colors) {
    Color.ThemeMap.set(name, colors);
  }

  static ThemeMap = new Map()

  static defaultColors = {
    BLOCK_ICON_HOVERED: '#212121',
    EDITOR_BACKGROUND: '#fafafa',
    EDITOR_BORDER: '#e2e2e2',
    BLOCK_ICON: '#757575',
    INPUT_BACKGROUND: '#fafafa',
    INPUT_BORDER: '#ddd',
    INPUT_BACKGROUND_HOVERED: '#e2e2e2',
    INPUT_BACKGROUND_HOVERED_MASK: 'rgba(0, 0, 0, 0.3)',
  }

  static runtime = {
    actived: null,
  }

  static setTheme(themeName) {
    const theme = Color.ThemeMap.get(themeName);

    if (!theme) throw new Color.ThemeNotFountError();

    Color.runtime.actived = theme;
  }

  constructor(themeName) {
    const theme = Color.ThemeMap.get(themeName) || {};

    Color.runtime.actived = theme;

    this.Colors = new Proxy({}, {
      get: (_, prop) => {
        if (Color.runtime.actived
          && Color.runtime.actived[prop]) return Color.runtime.actived[prop];

        return Color.defaultColors[prop];
      },
    });
  }
}

const C = new Color();

export default C.Colors;
