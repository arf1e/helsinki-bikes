/**
 * This function constructs query string from given filtering and pagination values for further use as a useEffect dependency in hooks calling API for data.
 * @param filters - Object containing filtering & sorting form values
 * @param page - Current page number
 * @returns Query string composed from given form values and page number
 */
export const composeQueryString = (filters: { [key: string]: string }, page: number) => {
  const queryObject = new URLSearchParams();
  queryObject.set('page', page.toString());

  for (const [key, value] of Object.entries(filters)) {
    if (Boolean(value) === true) {
      queryObject.set(key, value);
    }
  }

  const queryString = queryObject.toString();
  return queryString;
};
