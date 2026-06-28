// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AI Support Copilot',
  tagline: 'Production-style AI support assistant with evaluation, retry logic, and developer documentation',
  favicon: 'img/favicon.ico',

  url: 'https://someshchawan.github.io',
  baseUrl: '/ai-support-copilot-docs/',

  organizationName: 'Someshchawan',
  projectName: 'ai-support-copilot-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/Someshchawan/ai-support-copilot-docs/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'AI Support Copilot',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/Someshchawan/ai-support-copilot',
            label: 'Source Code',
            position: 'right',
          },
          {
            href: 'https://github.com/Someshchawan/ai-support-copilot-docs',
            label: 'Docs Repo',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              { label: 'Quickstart', to: '/docs/quickstart' },
              { label: 'Prompt Design', to: '/docs/concepts/prompts' },
              { label: 'Evaluation System', to: '/docs/concepts/evaluation' },
            ],
          },
          {
            title: 'Build',
            items: [
              { label: 'Build a Chatbot', to: '/docs/guides/build-chatbot' },
              { label: 'Troubleshooting', to: '/docs/troubleshooting/api-errors' },
            ],
          },
          {
            title: 'Links',
            items: [
              { label: 'GitHub (Source)', href: 'https://github.com/Someshchawan/ai-support-copilot' },
              { label: 'GitHub (Docs)', href: 'https://github.com/Someshchawan/ai-support-copilot-docs' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/somesh-chawan-b29144148' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Somesh Chawan. Built with Docusaurus.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
        additionalLanguages: ['python', 'bash', 'json'],
      },
    }),
};

module.exports = config;
