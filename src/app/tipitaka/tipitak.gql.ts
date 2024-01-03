import { graphql } from 'src/gql';

graphql(`
  query Tipitaka {
    tipitaka(sort: ["index"]) {
      name
      index
      info_url
      cover {
        filename_disk
      }
      zip {
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
