const config = {
  plugins: {
    // Tailwind CSS integration
    "@tailwindcss/postcss": {},
    
    // Autoprefixer for vendor prefixes
    "autoprefixer": {
      flexbox: "no-2009",
      grid: "autoplace",
      overrideBrowserslist: [
        ">1%",
        "last 4 versions",
        "Firefox ESR",
        "not ie < 9"
      ]
    },
    
    // CSS Nano for minification (production only)
    "cssnano": process.env.NODE_ENV === 'production' ? {
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeWhitespace: true,
        colormin: true,
      }]
    } : false,
    
    // PostCSS Preset Env for modern CSS features
    "postcss-preset-env": {
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'custom-properties': {
          preserve: false,
        },
        'color-mod-function': true,
        'logical-properties-and-values': true,
      },
      autoprefixer: false, // Disable built-in autoprefixer since we have it separately
    },
    
    // CSS imports handling
    "postcss-import": {
      path: ['src/styles', 'node_modules'],
      plugins: [
        require('stylelint')({
          configFile: '.stylelintrc',
        })
      ]
    },
    
    // CSS custom properties (variables) optimization
    "postcss-custom-properties": {
      preserve: false,
      importFrom: [
        'src/styles/variables.css',
        'src/styles/colors.css'
      ]
    },
    
    // Media query optimization and grouping
    "postcss-sort-media-queries": {
      sort: 'mobile-first',
      configuration: {
        breakpoints: {
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
          '2xl': 1536
        }
      }
    },
    
    // Font optimization and subsetting
    "postcss-font-magician": process.env.NODE_ENV === 'production' ? {
      variants: {
        'Roboto': {
          '300': [],
          '400': [],
          '700': []
        }
      },
      foundries: ['google']
    } : false,
    
    // CSS in JS support
    "postcss-js": process.env.NODE_ENV === 'development' ? {} : false,
    
    // PurgeCSS for removing unused styles (production only)
    "@fullhuman/postcss-purgecss": process.env.NODE_ENV === 'production' ? {
      content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './pages/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        './app/**/*.{js,jsx,ts,tsx}'
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: {
        standard: [
          /^bg-/,
          /^text-/,
          /^border-/,
          /^hover:/,
          /^focus:/,
          /^active:/,
          /^dark:/,
          /^light:/,
          /^md:/,
          /^lg:/,
          /^xl:/,
          /^2xl:/,
          /^animate-/,
          /^transition-/,
          /^transform/,
          /^scale-/,
          /^rotate-/,
          /^translate-/,
          /^opacity-/,
          /^shadow-/,
          /^ring-/,
          /^blur/,
          /^grayscale/,
          /^h-\d+/,
          /^w-\d+/,
          /^p-\d+/,
          /^m-\d+/,
          /^gap-\d+/,
          /^space-/,
          /^grid-/,
          /^flex-/,
          /^justify-/,
          /^items-/,
          /^content-/,
          /^self-/,
          /^order-/,
          /^col-/,
          /^row-/,
          /^z-\d+/,
          /^aspect-/,
          /^max-/,
          /^min-/,
          /^inset-/,
          /^top-/,
          /^right-/,
          /^bottom-/,
          /^left-/,
          /^float-/,
          /^clear-/,
          /^object-/,
          /^overflow-/,
          /^position-/,
          /^sticky/,
          /^static/,
          /^relative/,
          /^absolute/,
          /^fixed/,
          /^visible/,
          /^invisible/,
          /^display-/,
          /^hidden/,
          /^block/,
          /^inline/,
          /^flex/,
          /^inline-flex/,
          /^grid/,
          /^inline-grid/,
          /^table/,
          /^table-row/,
          /^table-cell/,
          /^list-/,
          /^font-/,
          /^leading-/,
          /^tracking-/,
          /^align-/,
          /^whitespace-/,
          /^break-/,
          /^cursor-/,
          /^select-/,
          /^pointer-events-/,
          /^resize-/,
          /^outline-/,
          /^appearance-/,
          /^fill-/,
          /^stroke-/,
          /^stroke-width-/,
          /^filter-/,
          /^backdrop-filter-/,
          /^transition-/,
          /^ease-/,
          /^duration-/,
          /^delay-/,
          /^will-change/,
          /^content-/,
          /^before:/,
          /^after:/
        ],
        deep: [/^swiper/, /^slick/, /^rc-/],
        greedy: [/^Toastify/, /^react-datepicker/, /^react-modal/]
      }
    } : false,
    
    // CSS nesting support (fallback for older browsers)
    "postcss-nesting": {
      noIsPseudoSelector: true
    },
    
    // CSS variables fallback for older browsers
    "postcss-custom-properties": {
      preserve: false
    },
    
    // Responsive typography
    "postcss-responsive-type": process.env.NODE_ENV === 'production' ? {} : false,
    
    // Aspect ratio support
    "postcss-aspect-ratio": {},
    
    // Object-fit polyfill for older browsers
    "postcss-object-fit-images": process.env.NODE_ENV === 'production' ? {} : false
  }
};

// Conditionally enable plugins based on environment
if (process.env.NODE_ENV !== 'production') {
  // Development-only plugins
  config.plugins['postcss-reporter'] = {
    clearReportedMessages: true,
    throwError: true
  };
  
  config.plugins['postcss-browser-reporter'] = {};
}

// Remove false plugins (disabled ones)
Object.keys(config.plugins).forEach(plugin => {
  if (config.plugins[plugin] === false) {
    delete config.plugins[plugin];
  }
});

export default config;
