import { GatsbyNode } from "gatsby";
import { resolve } from "path";

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
}: any) => {
  const { createPage } = actions;
  const allMdx: { errors?: any; data?: any } = await graphql(`
    query MarkdownQuery {
      allMdx(sort: { frontmatter: { priority: ASC } }) {
        nodes {
          frontmatter {
            slug
            title
            author
            linkedin
          }
          internal {
            contentFilePath
          }
          body
          tableOfContents
        }
      }
    }
  `);

  const markDownTemplate = resolve(`src/designs/static.tsx`);
  allMdx.data?.allMdx.nodes.forEach((node: any) => {
    createPage({
      path: `/docs${node.frontmatter.slug}`,
      component: markDownTemplate,
      context: {
        author: node.frontmatter.author,
        linkedin = node.frontmatter.linkedin,
        tableOfContents: node.tableOfContents,
        title: node.frontmatter.title,
        pagePath: node.frontmatter.slug,
        body: node.body,
      },
    });
  });
};
