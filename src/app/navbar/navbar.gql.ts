import { graphql } from 'src/gql';

graphql(`
  fragment Routes on modules {
    name
    route
  }
  query Routes {
    modules(sort: ["index"]) {
      ...Routes
    }
  }
`);
