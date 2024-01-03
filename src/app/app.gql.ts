import { graphql } from 'src/gql';

graphql(`
  fragment FileFields on directus_files {
    id
  }

  query FolderId($name: String!) {
    folders(filter: { name: { _eq: $name } }) {
      id
    }
  }

  mutation DeleteFileById($id: ID!) {
    delete_files_item(id: $id) {
      id
    }
  }
`);
