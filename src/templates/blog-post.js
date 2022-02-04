import React from 'react';
import { graphql } from 'gatsby'


import Layout from "../components/Layout";
import Comments from "../components/Comments";
import Seo from "../components/Seo";
import * as S from '../components/Post/styled';

const BlogPost = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, fields, html } = markdownRemark;
  return (
    <Layout>
      <Seo 
        title={frontmatter.title} 
        description={frontmatter.description}
        image={frontmatter.thumbnail?.childImageSharp?.fluid?.src}
      />
      <S.PostWrapper>
        <S.PostTitle>{frontmatter.title}</S.PostTitle>
        <S.PostSocial9Wrapper>
          <div className="s9-widget-wrapper" />
        </S.PostSocial9Wrapper>
        <S.PostHeader>
          <S.PostDate>{frontmatter.date}</S.PostDate>
          <S.PostTag color={frontmatter.color}>{frontmatter.category}</S.PostTag>
        </S.PostHeader>
        

        <S.PostDescription>{frontmatter.description}</S.PostDescription>
        {frontmatter.thumbnail ? <S.PostThumbnail fluid={frontmatter.thumbnail.childImageSharp.fluid} /> : <></>}
        
        <S.PostBody dangerouslySetInnerHTML={{__html: html }} />
        <div className="s9-widget-wrapper" />
      </S.PostWrapper>
      <Comments url={fields.slug} title={frontmatter.title} />
    </Layout>
  )
}

export const query = graphql`
  query BlogPost($slug: String!) {
    markdownRemark(fields: {slug: { eq: $slug }}) {
      fields {
        slug
      }
      frontmatter {
        title
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        description
        color
        category
        date(formatString: "DD [de] MMMM [de] YYYY", locale: "pt-BR")
      }
      html
    }
  }
`

export default BlogPost;