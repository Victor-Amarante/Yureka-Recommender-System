export const paths = {
  landing: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  onboarding: {
    topics: {
      path: '/onboarding/topics',
      getHref: () => '/onboarding/topics',
    },
    routine: {
      path: '/onboarding/routine',
      getHref: () => '/onboarding/routine',
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
  },
} as const;
