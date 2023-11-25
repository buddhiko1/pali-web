import { graphql } from 'src/gql';

graphql(`
  fragment Routes on modules {
    name
    route
  }
  query NavbarRoutes {
    routes: modules(sort: ["index"]) {
      ...Routes
    }
  }
`);
