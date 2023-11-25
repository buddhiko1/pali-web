import { graphql } from 'src/gql';

graphql(`
  query HomePageModules {
    modules(sort: ["index"]) {
      index
      name
      route
      description
    }
  }
`);
