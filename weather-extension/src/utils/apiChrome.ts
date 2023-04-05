interface Storage<T = any> {
  data?: T[];
  values?: T;
}

export function setStorage<T = unknown>({ data }: Storage): Promise<T> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ data }).then(() => {
      return resolve(data as T);
    });
  });
}

export function getStorage<T = unknown>(key: keyof Storage) {
  return chrome.storage.local.get([key]) as Storage<T>;
}
