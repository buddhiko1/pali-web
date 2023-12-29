import { graphql } from 'src/gql';

graphql(`
  fragment FileFields on directus_files {
    id
  }
  query FolderWithName($name: String!) {
    folders(filter: { name: { _eq: $name } }) {
      id
    }
  }
`);
