import { graphql } from 'src/gql';

graphql(`
  query FolderWithName($name: String!) {
    folders(filter: { name: { _eq: $name } }) {
      id
    }
  }
`);
