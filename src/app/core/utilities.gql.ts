/* eslint-disable @typescript-eslint/no-explicit-any */
import { OperationResult } from '@urql/core';

export function removeNullFields(obj: any): any {
  const filteredObj = Object.assign({}, obj);
  for (const key in obj) {
    if (obj[key] === null) {
      delete filteredObj[key];
    }
  }
  return filteredObj;
}

export function validateAndExtractResult(result: OperationResult): any {
  if (result.error) {
    throw Error(
      result.error.networkError?.message ??
        result.error.graphQLErrors[0].message,
    );
  }
  return result.data;
}
