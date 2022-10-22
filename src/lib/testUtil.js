/**
 * Test if an element has all of the expected styles
 * @param {Object} testElement the element to be tested
 * @param {Object} styles the value of the style property
 */
 export const testStyle = async (testElement, styles) => {
    for(const key in styles) {
        await expect(testElement).toHaveStyle(`${key}: ${styles[key]}`);
    }
}

/**
 * Mock an API on the server
 * @param {String} url API route
 * @param {Function} handler callback of the route
 * @returns {Object} the fetchMock
 */
export const setUpApi = (url, handler) => {
    return jest.spyOn(global, 'fetch')
        .mockImplementation((reqUrl, config) => {
            if(reqUrl === url) return handler(config);
    });
}