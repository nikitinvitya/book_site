export const enum AppRoutes {
  HOME = '/',
  FAVORITES = '/favorites',
}

export const NAV_ITEMS: {path: AppRoutes, text: string}[] = [
  {
    path: AppRoutes.HOME,
    text: 'Home',
  },
  {
    path: AppRoutes.FAVORITES,
    text: 'Favorites',
  }
]