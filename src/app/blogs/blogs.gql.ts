import { graphql } from 'src/gql';

graphql(`
  fragment Blog on blogs {
    id
    title
    status {
      name
    }
    user_created {
      id
      email
      avatar {
        filename_disk
      }
    }
    date_created
    date_updated
    content @include(if: $withContent)
  }

  query BlogById($id: ID!, $withContent: Boolean = true) {
    blog: blogs_by_id(id: $id) {
      ...Blog
    }
  }

  query Blogs(
    $statusName: String!
    $sortFields: [String!]!
    $offset: Int!
    $limit: Int!
    $withContent: Boolean = false
  ) {
    blogs(
      filter: { status: { name: { _eq: $statusName } } }
      sort: $sortFields
      offset: $offset
      limit: $limit
    ) {
      ...Blog
    }
  }

  query UserBlogs(
    $userId: String!
    $statusName: String!
    $sortFields: [String!]!
    $offset: Int!
    $limit: Int!
    $withContent: Boolean = false
  ) {
    blogs(
      filter: {
        user_created: { id: { _eq: $userId } }
        status: { name: { _eq: $statusName } }
      }
      sort: $sortFields
      offset: $offset
      limit: $limit
    ) {
      ...Blog
    }
  }

  query BlogStatus($name: String!) {
    statusList: blog_status(filter: { name: { _eq: $name } }) {
      id
      name
    }
  }

  mutation CreateBlog(
    $data: create_blogs_input!
    $withContent: Boolean = false
  ) {
    blog: create_blogs_item(data: $data) {
      ...Blog
    }
  }

  mutation DeleteBlog($id: ID!) {
    delete_blogs_item(id: $id) {
      id
    }
  }

  mutation UpdateBlog(
    $id: ID!
    $data: update_blogs_input!
    $withContent: Boolean = false
  ) {
    blog: update_blogs_item(id: $id, data: $data) {
      ...Blog
    }
  }
`);
