import { graphql } from 'src/gql';

graphql(`
  fragment FileFields on directus_files {
    id
  }
`);
