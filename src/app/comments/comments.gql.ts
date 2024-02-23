import { graphql } from 'src/gql';

graphql(`
  query CommentStatus($name: String!) {
    status: comment_status(filter: { name: { _eq: $name } }) {
      id
      name
    }
  }

  fragment Comment on comments {
    id
    status {
      name
    }
    user_created {
      id
      email
      avatar {
        id
      }
    }
    date_created
    date_updated
    content
    blog {
      id
      title
    }
    sub_comments {
      id
    }
  }

  union blogId = String | Int

  query BlogComments(
    $blogId: GraphQLStringOrFloat!
    $statusName: String!
    $sortFields: [String!]!
    $offset: Int!
    $limit: Int!
  ) {
    comments(
      filter: {
        blog: { id: { _eq: $blogId } }
        status: { name: { _eq: $statusName } }
      }
      sort: $sortFields
      offset: $offset
      limit: $limit
    ) {
      ...Comment
    }
  }

  query QuantityOfBlogComments(
    $blogId: GraphQLStringOrFloat!
    $statusName: String!
  ) {
    comments_aggregated(
      filter: {
        blog: { id: { _eq: $blogId } }
        status: { name: { _eq: $statusName } }
      }
    ) {
      count {
        id
      }
    }
  }

  query UserComments(
    $userId: String!
    $statusName: String!
    $sortFields: [String!]!
    $offset: Int!
    $limit: Int!
  ) {
    comments(
      filter: {
        user_created: { id: { _eq: $userId } }
        status: { name: { _eq: $statusName } }
      }
      sort: $sortFields
      offset: $offset
      limit: $limit
    ) {
      ...Comment
    }
  }

  mutation CreateComment($data: create_comments_input!) {
    comment: create_comments_item(data: $data) {
      ...Comment
    }
  }

  mutation UpdateComment($id: ID!, $data: update_comments_input!) {
    comment: update_comments_item(id: $id, data: $data) {
      ...Comment
    }
  }

  mutation DeleteComment($id: ID!) {
    delete_comments_item(id: $id) {
      id
    }
  }
`);
