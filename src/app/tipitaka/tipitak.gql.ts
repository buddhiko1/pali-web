import { graphql } from 'src/gql';

graphql(`
  query Tipitaka {
    tipitaka(sort: ["index"]) {
      name
      index
      info_url
      cover {
        id
      }
      zip {
        id
      }
    }
  }
  query Cites {
    cites(sort: ["index"]) {
      index
      text
      author
      author_url
    }
  }
`);
