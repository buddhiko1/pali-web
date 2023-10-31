import { graphql } from 'src/gql';

graphql(`
  query Tipitaka {
    tipitaka(sort: ["index"]) {
      name
      index
      info_url
      cover {
        id
        filename_disk
      }
      zip {
        id
        filename_disk
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
