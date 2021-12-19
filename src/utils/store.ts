function getStore(key: string) {
  const value = window.localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  } else {
    return undefined;
  }
}

function setStore(key: string, value: any) {
  if (key && value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export { getStore, setStore };
