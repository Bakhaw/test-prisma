/**
 * Get query parameters in the URL
 *
 * @returns {URLSearchParams}
 */
export default function getURLParams() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  return params;
}
