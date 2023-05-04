import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    {
      'http://localhost:9000/graphql': {
        headers: {
          Authorization: 'Trk53nUhc3gDtT9cBy8eBS7Rpal-S1Cy',
        },
      },
    },
    {
      'http://localhost:9000/graphql/system': {
        headers: {
          Authorization: 'Trk53nUhc3gDtT9cBy8eBS7Rpal-S1Cy',
        },
      },
    },
  ],
  generates: {
    './src/app/gql/': {
      documents: ['src/**/*.gql.ts'],
      preset: 'client',
    },
  },
};

export default config;
