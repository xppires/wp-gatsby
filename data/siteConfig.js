require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteTitle: 'Piada Facil',
  siteDescription: 'Ta tiudo louco',
  authorName: 'Pedro',
  twitterUsername: 'blogsamaneira',
  authorAvatar: 'avatar.jpg', // file in content/images
  multilangPosts: false, // enable/disable flags in post lists
  authorDescription: `
 Pedro é o a maneira , gosta de piadas, boa vida e como desposto navegar na web.
  `,
  siteUrl: 'http://amaneira.com.s3-website-us-east-1.amazonaws.com/',
  disqusSiteUrl: 'https://amaneira.com/+iadafacil',
  // Prefixes all links. For cases when deployed to maxpou.fr/gatsby-starter-morning-dew/
  pathPrefix: '/', // Note: it must *not* have a trailing slash.
  siteCover: 'cover.jpg', // file in content/images
  wpDBName: `${process.env.wpDBName}`,
  wpDBPrefix: `${process.env.wpDBPrefix}`,
  googleAnalyticsId: `${process.env.googleAnalyticsId}`,
  googleAdsenseID: `${process.env.googleAdsenseID}`,
  background_color: '#ffffff',
  theme_color: '#222222',
  display: 'standalone',
  icon: 'content/images/baymax.png',
  postsPerPage: 6,
  disqusShortname: 'https-www-amaneira-com',
  facebookAppId: `${process.env.FacebookAppId}`,
  headerTitle: 'Piada Facil',
  headerLinksIcon: 'logo.jpg', //  (leave empty to disable: '')baymax.png
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
          url: 'https://www.facebook.com/PiadaFacil/',
        },
        {
          label: 'Twitter',
          url: 'https://twitter.com/blogsamaneira',
        },
      ],
    },
  ],
}
