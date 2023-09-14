import { CombinedError } from '@urql/core';

export function removeNullFields(obj: any, ...fieldsToRemove: string[]): any {
  const filteredObj = Object.assign({}, obj);
  for (const key in obj) {
    if (fieldsToRemove.includes(key) && obj[key] === null) {
      delete filteredObj[key];
    }
  }
  return filteredObj;
}

export function checkAndExtractResult(result: any): any {
  if (result.error) {
    const combinedError = result.error as CombinedError;
    throw Error(
      combinedError.networkError?.message ??
        combinedError.graphQLErrors[0].message
    );
  }
  return result.data;
}
