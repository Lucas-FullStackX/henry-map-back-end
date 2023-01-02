/**
 * @param {Function | Promise} promise - Promise function to resolve.
 * @param {object} errorExt - Error object to add to error.
 * @returns {Promise<[Error, undefined]|[null, object]>} Promise - Promise function to resolve.
 */
export async function to<T, U = Error>(
  promise: (() => Promise<T>) | Promise<T>,
  errorExt?: object,
): Promise<{ type: 'error'; error: U } | { type: 'data'; data: T }> {
  const currentPromise = typeof promise === 'function' ? promise() : promise;

  try {
    const result = await currentPromise;
    return {
      type: 'data',
      data: result,
    };
  } catch (error: any) {
    const e = errorExt ? Object.assign(error, errorExt) : error;
    return { error: e, type: 'error' };
  }
}
