export const HasValue = (value: any): boolean => {
  const key = typeof value;

  switch (key) {
    case 'string':
      return value !== '';

    case 'bigint':
    case 'number':
      return value !== undefined && value !== null && value !== '' && !Number.isNaN(+value);

    case 'object':
      if (value !== null) {
        if (Array.isArray(value)) {
          return value.length !== 0;
        }
        if (value instanceof Date) {
          return true;
        }
        if (value instanceof Object) {
          return Object.keys(value).length !== 0;
        }
      }
      break;
  }

  return false;
};

export const HasValueType = (value: any, type: 'string' | 'number' | 'bigint' | 'object' | 'array' | 'date'): boolean => {
  switch (type) {
    case 'string':
      return !!value;

    case 'bigint':
    case 'number':
      return value !== undefined && value !== null && value !== '' && !Number.isNaN(+value);

    case 'array':
      return Array.isArray(value) && value.length !== 0;

    case 'date':
      return value instanceof Date;

    case 'object':
      if (value !== null) {
        if (Array.isArray(value)) {
          return value.length !== 0;
        }

        if (value instanceof Date) {
          // TODO: Check for Date validation
          return true;
        }

        // Keep this last as all Date and Array are objects
        if (value instanceof Object) {
          return Object.keys(value).length !== 0;
        }
      }
      break;

    default:
      return false;
  }

  return false;
};
