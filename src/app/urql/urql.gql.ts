import { graphql } from 'src/gql';

graphql(`
  mutation RefreshToken($tokenForRefresh: String!) {
    refreshedToken: auth_refresh(refresh_token: $tokenForRefresh, mode: json) {
      access_token
      refresh_token
    }
  }
`);
