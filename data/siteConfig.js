module.exports = {
  siteTitle: 'O Passo a Passo',
  siteDescription: 'Dicas Como fazer artesanato',
  authorName: 'Marta',
  twitterUsername: 'passo_a_passo',
  authorAvatar: 'avatar.jpg', // file in content/images
  multilangPosts: false, // enable/disable flags in post lists
  authorDescription: `
 Criadora é a Marta, apaixonada por artesanato.
  `,
  siteUrl: 'https://www.opassoapasso.com/',
  disqusSiteUrl: 'https://www.opassoapasso.com/',
  // Prefixes all links. For cases when deployed to maxpou.fr/gatsby-starter-morning-dew/
  pathPrefix: '/gatsby-starter-morning-dew', // Note: it must *not* have a trailing slash.
  siteCover: 'cover.jpg', // file in content/images
  googleAnalyticsId: 'UA-96855-15',
  background_color: '#ffffff',
  theme_color: '#222222',
  display: 'standalone',
  icon: 'content/images/baymax.png',
  postsPerPage: 6,
  disqusShortname: 'https-www-opassoapasso-com',
  headerTitle: 'O Passo a Passo',
  headerLinksIcon: 'source_flor_400x400.jpg', //  (leave empty to disable: '')baymax.png
  headerLinks: [
    // {
    //   label: 'Blog',
    //   url: '/',
    // },
    {
      label: 'About',
      url: '/about',
    },
    // {
    //   label: 'teste',
    //   url: '/mysql-test',
    // },
    // {
    //   label: 'Installation',
    //   url: '/how-to-install',
    // },
  ],
  // Footer information (ex: Github, Netlify...)
  websiteHost: {
    name: 'GitHub',
    url: 'https://github.com',
  },
  footerLinks: [

    {
      sectionName: 'Social',
      links: [
        {
          label: 'Facebook',
          url: 'https://www.facebook.com/oPassoaPasso/',
        },
        {
          label: 'Twitter',
          url: 'https://twitter.com/passo_a_passo',
        },
      ],
    },
  ],
}
