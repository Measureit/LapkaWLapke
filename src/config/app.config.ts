// ===== KONFIGURACJA APLIKACJI =====
// Centralna konfiguracja dla całej aplikacji Łapka w Łapkę

export const APP_CONFIG = {
  // Base URL dla aplikacji - zmień tutaj żeby zaktualizować wszędzie
  BASE_URL: '/LapkaWLapke',
  
  // Inne konfiguracje aplikacji
  APP_NAME: 'Łapka w Łapkę',
  VERSION: '1.0.0',
  
  // Konfiguracja bloga
  BLOG: {
    POSTS_PER_PAGE: 6,
    HOME_PAGE_POSTS: 3,
    DEFAULT_IMAGE: 'https://via.placeholder.com/400x250/bb8fce/ffffff?text=Artykuł'
  },
  
  // Ścieżki API
  API: {
    BLOG_FILES: '/api/blog-files',
    BLOG_CONTENT: '/content/blog'
  }
} as const;

// Eksportuj też samo BASE_URL dla wygody
export const BASE_URL = APP_CONFIG.BASE_URL;
