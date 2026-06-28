/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    'quickstart',
    {
      type: 'category',
      label: 'Core Concepts',
      items: ['concepts/prompts', 'concepts/evaluation', 'concepts/retry-logic'],
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['guides/build-chatbot', 'guides/running-evaluations'],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: ['troubleshooting/api-errors'],
    },
    {
      type: 'category',
      label: 'Reference',
      items: ['reference/api-reference', 'reference/evaluation-checks'],
    },
  ],
};

module.exports = sidebars;
