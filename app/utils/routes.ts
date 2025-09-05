export function getRoutes() {
  return [
    {
      icon: 'mdi-chart-donut',
      title: 'Home',
      path: '/home',
      name: 'home',
    },
    {
      icon: 'mdi-cash-multiple',
      title: 'Registros',
      path: '/expenses',
      name: 'expenses',
    },
    {
      icon: 'mdi-trophy-variant',
      title: 'Conquistas',
      path: '/achievements',
      name: 'achievements',
    },
    {
      icon: 'mdi-account-circle',
      title: 'Conta',
      path: '/profile',
      name: 'profile',
    },
  ]
}
