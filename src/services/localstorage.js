export const getLocalStorage = (id) => {
    return localStorage.getItem(id);
  };
  
  export const removeLocalStorage = (id) => {
    localStorage.removeItem(id);
  };
  
  export const setLocalStorage = (id, value) => {
    try {
      localStorage.setItem(id, value);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('localStorage.setItem(id, value)');
    }
  };