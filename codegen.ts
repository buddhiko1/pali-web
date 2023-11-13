import { CodegenConfig } from '@graphql-codegen/cli';
import { environment } from './src/environments/environment';

const config: CodegenConfig = {
  schema: [
    `${environment.cms}/graphql?access_token=${environment.gqlToken}`,
    `${environment.cms}/graphql/system?access_token=${environment.gqlToken}`,
  ],
  documents: ['src/**/*.gql.ts'],
  generates: {
    './src/gql/': {
      preset: 'client',
    },
  },
};

export default config;
