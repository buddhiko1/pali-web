import { graphql } from 'src/gql';

graphql(`
  query DictIntroduction {
    dict_introduction {
      title
      text
    }
  }
  query Dictionaries {
    dictionaries(sort: ["index"]) {
      index
      name
      abbreviation
      description
      info_url
      cover {
        id
      }
      zip {
        id
      }
    }
  }
`);
