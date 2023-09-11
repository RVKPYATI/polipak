function useSession() {
  const getSession = (key) => {
    try {
      const storedValue = sessionStorage.getItem(key);
      return storedValue;
    } catch (error) {
      console.error(`Ошибка при получении sessionStorage: ${error}`);
      return null;
    }
  };

  const setSession = (key, value) => {
    try {
      sessionStorage.setItem(key, value);
    } catch (error) {
      console.error(`Ошибка при настройке sessionStorage: ${error}`);
    }
  };

  const removeSession = (key) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Ошибка при удалении sessionStorage: ${error}`);
    }
  };

  return { getSession, setSession, removeSession };
}

export { useSession };
