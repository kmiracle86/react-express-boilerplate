const storageKey = 'app-storage-key';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(storageKey);
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(storageKey, serializedState);
  } catch (error) {
    console.log('Error saving state', error);
    // Nothing to do, nowhere to go
  }
};

export const saveAuthToken = (token) => {
  try {
    localStorage.setItem(`${storageKey}-token`, token);
  } catch (error) {
    // Nothing to do, nowhere to go
  }
};

export const deleteAuthToken = () => {
  try {
    localStorage.setItem(`${storageKey}-token`, null);
  } catch (error) {
    // Nothing to do, nowhere to go
  }
};

export const loadAuthToken = () => localStorage.getItem(`${storageKey}-token`) || '';
