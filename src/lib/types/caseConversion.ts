function toCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', '')
    );
  }
  
  export function keysToCamelCase<T>(obj: T): CamelCaseKeys<T> {
    if (typeof obj !== 'object' || obj === null) {
      return obj as CamelCaseKeys<T>;
    }
  
    if (Array.isArray(obj)) {
      return obj.map(keysToCamelCase) as CamelCaseKeys<T>;
    }
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const camelKey = toCamelCase(key);
      result[camelKey] = keysToCamelCase(value);
    }
  
    return result as CamelCaseKeys<T>;
  }