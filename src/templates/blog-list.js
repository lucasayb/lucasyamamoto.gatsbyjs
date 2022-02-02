import React from 'react';
import { graphql } from 'gatsby'

import Layout from "../components/layout";
import Seo from "../components/seo";
import PostItem from '../components/PostItem';
import Pagination from '../components/Pagination';

const BlogList = ({ data, ...props }) => {
  const postList = data.allMarkdownRemark.edges;

  const { currentPage, numPages } = props.pageContext;

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = (currentPage - 1) === 1 ? '/' : `/page/${currentPage - 1}`
  const nextPage = `/page/${currentPage + 1}`

  return (
    <Layout>
      <Seo title="Home" />
      {postList.map(({
        node: {
          frontmatter: {
            category,
            title,
            description,
            date,
            color,
            categoryLink
          },
          fields: {
            slug
          }
        }
      }) => (
        <PostItem
          date={date}
          title={title}
          category={category}
          categoryLink={categoryLink}
          color={color}
          slug={slug}
          description={description}
        />
      ))}
      <Pagination 
        isFirst={isFirst} 
        isLast={isLast} 
        currentPage={currentPage} 
        numPages={numPages} 
        prevPage={prevPage} 
        nextPage={nextPage} 
      />
    </Layout>
  )
}

export const query = graphql`
  query PostList($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      sort: {order: DESC, fields: frontmatter___date},
      limit: $limit,
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            category
            title
            description
            date(formatString: "DD [de] MMMM [de] YYYY", locale: "pt-BR")
            color
            categoryLink
          }
          fields {
            slug
          }
          timeToRead
        }
      }
    }
  }
`

export default BlogList;