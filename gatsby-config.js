module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-offline`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typegen`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url:
          process.env.WPGRAPHQL_URL ||
          `https://linyows.lolipop.jp/wp.shiokaze.net/graphql`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `行政書士 しおかぜ事務所`,
        short_name: 'しおかぜ事務所',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: `standalone`,
        icon: `content/assets/shiokaze-icon.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*.html': [
            'cache-control: public, max-age=0, must-revalidate'
          ],
          '/page-data/app-data.json': [
            'cache-control: public, max-age=0, must-revalidate'
          ],
          '/page-data/*': [
            'cache-control: public, max-age=0, must-revalidate'
          ],
          '/static/*': [
            'cache-control: public, max-age=31536000, immutable'
          ],
          '/icons/*': [
            'cache-control: public, max-age=31536000, immutable'
          ],
          '/media/*': [
            'cache-control: public, max-age=31536000, immutable'
          ],
          '/sw.js': [
            'cache-control: public, max-age=0, must-revalidate'
          ],
          '/**/*.js': [
            'cache-control: public, max-age=31536000, immutable'
          ],
          '/**/*.css': [
            'cache-control: public, max-age=31536000, immutable'
          ],
        }
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#CEC0D9`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-10693153-3`,
      },
    },
  ],
}
