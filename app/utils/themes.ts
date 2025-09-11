export const defaultLightTheme = {
  dark: false,

  colors: {
    'primary': '#1ADB87',
    'secondary': '#000000',
    'root': '#FFFFFF',
    'container': '#f8f8f8',
    'card': '#FFFFFF',
    'line': '#eeeeee',
    'neutral': '#424A52',

    'red': '#F44336',
    'deep-purple': '#673AB7',
    'black': '#000000',
  },
}

export const defaultDarkTheme = {
  dark: true,

  colors: {
    'primary': '#1ADB87',
    'secondary': '#0F804F',
    'root': '#212121',
    'container': '#333333',
    'card': '#3D3D3D',
    'line': '#616161',
    'neutral': '#f8f8f8',

    'red': '#F44336',
    'deep-purple': '#673AB7',
    'black': '#000000',
  },
}

export const lovingTheme = {
  dark: false,

  colors: {
    'primary': '#F44336',
    'secondary': '#9B1208',
    'root': '#FEEDEC',
    'container': '#FDDAD8',
    'card': '#FCC8C5',
    'line': '#FBB5B1',
    'neutral': '#4E0804',

    'red': '#F44336',
    'deep-purple': '#673AB7',
    'black': '#000000',
  },
}

export function getThemesDataArr() {
  const authStore = useAuthStore()

  return [
    {
      id: 'defaultLightTheme',
      colors: [defaultLightTheme.colors.secondary, defaultLightTheme.colors.primary, defaultLightTheme.colors.container],
      title: 'Tema Claro',
      description: 'Desbloqueável com a conquista "Novato"',

      allowed: true,
    },
    {
      id: 'defaultDarkTheme',
      colors: [defaultDarkTheme.colors.secondary, defaultDarkTheme.colors.primary, defaultDarkTheme.colors.container],
      title: 'Tema Escuro',
      description: 'Desbloqueável com a conquista "Novato"',

      allowed: true,
    },
    {
      id: 'lovingTheme',
      colors: [lovingTheme.colors.secondary, lovingTheme.colors.primary, lovingTheme.colors.container],
      title: 'Tema Amoroso',
      description: 'Desbloqueável com a conquista "Amoroso"',

      allowed: !!authStore.privateProfileData?.achievements.complete.find(item => item.id === 'loving'),
    },
  ]
}
