export const paths = {
  landing: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    register: {
      path: '/auth/register',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
    home: {
      path: 'home',
      getHref: () => '/app/home',
    },
    watch: {
      path: 'watch/:id',
      getHref: (id: string) => `/app/watch/${id}`,
    },
    topics: {
      path: 'topics',
      getHref: () => `/app/topics`,
    },
  },
} as const;
