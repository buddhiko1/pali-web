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
        filename_disk
      }
      zip {
        filename_disk
      }
    }
  }
`);
