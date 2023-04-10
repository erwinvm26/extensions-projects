interface Storage<T = any> {
  data?: T[];
  values?: string;
}

export function setStorage<T = unknown>({
  data,
  values,
}: Storage): Promise<Storage<T>> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ data, values }).then(() => {
      return resolve({
        data,
        values,
      });
    });
  });
}

export function getStorage<T = unknown>(key: keyof Storage) {
  return chrome.storage.local.get([key]) as Storage<T>;
  // return chrome.storage.local.get([key]);
}

async function main() {
  const res = await getStorage("values");
  res.values;
}
