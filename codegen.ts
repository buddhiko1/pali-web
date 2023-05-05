import { CodegenConfig } from '@graphql-codegen/cli';
import { environment } from './src/environments/environment';

const config: CodegenConfig = {
  schema: [
    `${environment.host}/graphql?access_token=${environment.gqlToken}`,
    `${environment.host}/graphql/system?access_token=${environment.gqlToken}`,
  ],
  generates: {
    './src/app/gql/': {
      documents: ['src/**/*.gql.ts'],
      preset: 'client',
    },
  },
};

export default config;
