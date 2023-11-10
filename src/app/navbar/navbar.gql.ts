import { graphql } from 'src/gql';

graphql(`
  fragment Routes on modules {
    name
    route
  }
  query Routes {
    routes: modules(sort: ["index"]) {
      ...Routes
    }
  }
`);
