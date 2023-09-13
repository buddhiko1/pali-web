import { graphql } from 'src/gql';

graphql(`
  query Modules {
    modules {
      index
      name
      route
      description
    }
  }
`);
