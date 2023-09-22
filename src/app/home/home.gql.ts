import { graphql } from 'src/gql';

graphql(`
  query Modules {
    modules(sort: ["index"]) {
      index
      name
      route
      description
    }
  }
`);
