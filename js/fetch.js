
/**Fetch al JSON
 * @params url
*/
const fetchURL = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
