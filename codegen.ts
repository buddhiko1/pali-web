import { CodegenConfig } from '@graphql-codegen/cli';
import { environment } from './src/environments/environment';

const config: CodegenConfig = {
  schema: [
    `${environment.cms}/graphql?access_token=${environment.gqlToken}`,
    `${environment.cms}/graphql/system?access_token=${environment.gqlToken}`,
  ],
  generates: {
    './src/gql/': {
      documents: ['src/**/*.gql.ts'],
      preset: 'client',
    },
  },
};

export default config;
