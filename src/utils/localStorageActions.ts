const storageKey = 'toDoToken';

const setToken = (token: string): void => {
  localStorage.setItem(storageKey, token);
};

const isToken = (): string | null => localStorage.getItem(storageKey);
const removeToken = (): void => localStorage.removeItem(storageKey);

export { storageKey, setToken, isToken, removeToken };
