function getStore(key) {
  const value = window.localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  } else {
    return undefined;
  }
}

function setStore(key, value) {
  if (key && value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export { getStore, setStore };
