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
    'secondary': '#13A465',
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

export function getThemesDataArr() {
  const authStore = useAuthStore()

  return [
    {
      id: 'defaultLightTheme',
      colors: [defaultLightTheme.colors.secondary, defaultLightTheme.colors.primary, defaultLightTheme.colors.container],
      title: 'Tema Claro',
      description: 'Desbloqueável com a conquista "Novato"',

      allowed: !!authStore.privateProfileData?.achievements.complete.find(item => item.id === 'beginner'),
    },
    {
      id: 'defaultDarkTheme',
      colors: [defaultDarkTheme.colors.secondary, defaultDarkTheme.colors.primary, defaultDarkTheme.colors.container],
      title: 'Tema Escuro',
      description: 'Desbloqueável com a conquista "Novato"',

      allowed: !!authStore.privateProfileData?.achievements.complete.find(item => item.id === 'beginner'),
    },
  ]
}
