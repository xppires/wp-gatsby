const path = require('path')
const config = require('./data/siteConfig')

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    author: config.authorName,
    description: config.siteDescription,
    ...config,
  },
  pathPrefix: config.pathPrefix,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'posts',
        path: 'content/posts',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'pages',
        path: 'content/pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'images',
        path: 'content/images',
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: path.join(__dirname, `src`, `pages`),
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve('./src/templates/page.js'),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
              withWebp: true,
            },
          },
          { resolve: 'gatsby-remark-prismjs' },
          { resolve: 'gatsby-remark-responsive-iframe' },
          { resolve: 'gatsby-remark-copy-linked-files' },
          { resolve: 'gatsby-remark-smartypants' },
          { resolve: 'gatsby-remark-autolink-headers' },
        ],
      },
    },
    // Reminder (https://github.com/gatsbyjs/gatsby/issues/15486#issuecomment-509405867)
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-images`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: config.googleAnalyticsId,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: config.siteTitle,
        start_url: config.pathPrefix,
        background_color: config.background_color,
        theme_color: config.theme_color,
        display: config.display,
        icon: config.icon,
      },
    },
    // https://www.gatsbyjs.org/docs/themes/converting-a-starter/#transpiling-your-theme-with-webpack
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['gatsby-starter-morning-dew'],
      },
    },
    {
      resolve: `gatsby-source-mysql`,
      options: {
        connectionDetails: {
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'wp3_passoapasso'
        },
        queries: [
          {
            statement: 'SELECT meta_id, post_id as ID, meta_key, meta_value  FROM wp_postmeta ', //where meta_key=\'_wp_attachment_metadata\'',
            idFieldName: 'meta_id',
            name: 'WpMeta',
            // remoteImageFieldNames: 'meta_value'
            parentName: 'WpPosts',
            foreignKey: 'ID',
            cardinality: 'OneToMany',
          },
          {
            statement: 'SELECT * FROM wp_comments ',
            idFieldName: 'comment_ID',
            name: 'WpComments',
            parentName: 'WpPosts',
            foreignKey: 'comment_post_ID',
            cardinality: 'OneToMany',
          },
          {
            statement: 'SELECT ID, REPLACE( substr( substr(post_content, locate(\'src="\', post_content) + 5), 1,locate( \'.jpg\', substr(post_content, locate(\'src="\', post_content) + 5)) + 3 ) ,\'ç\',\'c\') as \'src\'  FROM wp_posts where  locate(\'jpg"\', post_content) > 0',
            idFieldName: 'ID',
            name: 'WpImages',
            parentName: 'WpPosts',
            foreignKey: 'ID',
            cardinality: 'OneToMany',
            remoteImageFieldNames: ['src']
          },
          {
            statement: 'SELECT *,strip_tags(post_content) as post_txt FROM wp_posts ',
            idFieldName: 'ID',
            name: 'WpPosts',
            // remoteImageFieldNames: ['src']
            // parentName: 'WpMeta',
            // foreignKey: 'ID',
            // cardinality: 'OneToMany',
          }
        ]
      }
    }
  ],
}
