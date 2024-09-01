export const storeToLocalStorage = (key, value) => {
    if (!value) return;
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  };
  
  export const getFromLocalStorage = (key) => {
      let value = localStorage.getItem(key);
      if (!value) return;
      return JSON.parse(value);
  };
  
  export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };