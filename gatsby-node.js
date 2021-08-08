const path = require(`path`)
const chunk = require(`lodash/chunk`)

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
// const { dd } = require(`dumper.js`)

exports.createPages = async gatsbyUtilities => {
  const blogs = await getBlogs(gatsbyUtilities)
  const pages = await getPages(gatsbyUtilities)

  if (!blogs.length && !pages.length) {
    return
  }

  await createBlogs({ blogs, gatsbyUtilities })
  await createBlogArchive({ blogs, gatsbyUtilities })
  await createPages({ pages, gatsbyUtilities })
}

const createBlogs = async ({ blogs, gatsbyUtilities }) =>
  Promise.all(
    blogs.map(({ previous, blog, next }) =>
      gatsbyUtilities.actions.createPage({
        path: blog.uri,
        component: path.resolve(`./src/templates/blog.js`),
        context: {
          id: blog.id,
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  )

async function createBlogArchive({ blogs, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)
  const { postsPerPage } = graphqlResult.data.wp.readingSettings
  const postsChunkedIntoArchivePages = chunk(blogs, postsPerPage)
  const totalPages = postsChunkedIntoArchivePages.length

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1

      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          // Since our homepage is our blog page
          // we want the first page to be "/" and any additional pages
          // to be numbered.
          // "/blog/2" for example
          return page === 1 ? `/blog/` : `/blog/${page}`
        }
        return null
      }

      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),
        component: path.resolve(`./src/templates/blog-archive.js`),
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,
          // We need to tell the template how many posts to display too
          postsPerPage,
          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      })
    })
  )
}

async function getBlogs({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          blog: node {
            id
            uri
          }
          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPost.edges
}

const createPages = async ({ pages, gatsbyUtilities }) =>
  Promise.all(
    pages.map(({ previous, page, next }) =>
      gatsbyUtilities.actions.createPage({
        path: page.uri,
        component: path.resolve(`./src/templates/page.js`),
        context: {
          id: page.id,
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  )

async function getPages({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPages {
      allWpPage(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          page: node {
            id
            uri
          }
          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your pages`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPage.edges
}
