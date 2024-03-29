import cloudy_128 from "../../public/icons/cloudy_128.png";

interface Storage<T = any> {
  data?: T[];
  values?: string;
  activeWeatherFloting?: boolean;
}

interface NotificationChromeProps {
  title: string;
  message: string;
}

interface TabsQueryChromeProps {
  queryInfo?: chrome.tabs.QueryInfo;
  fn: (result: chrome.tabs.Tab[]) => void;
}

export function setStorageChrome<T = unknown>({
  data,
  values,
  activeWeatherFloting,
}: Storage): Promise<Storage<T>> {
  return new Promise(resolve => {
    chrome.storage.local
      .set({ data, values, activeWeatherFloting })
      .then(() => {
        return resolve({
          data,
          values,
          activeWeatherFloting,
        });
      });
  });
}

export function getStorageChrome<T = unknown>(key: (keyof Storage)[]) {
  return chrome.storage.local.get(key) as Storage<T>;
}

export function setBadgeChrome<T = unknown>(text: T) {
  chrome.action.setBadgeText({ text: `${text}` });
}

export function notificationChrome({
  title,
  message,
}: NotificationChromeProps) {
  chrome.notifications.create(`not-${randomIds()}`, {
    type: "basic",
    iconUrl: cloudy_128,
    title,
    message,
  });
}

export function tabsQueryChrome({ queryInfo, fn }: TabsQueryChromeProps) {
  chrome.tabs.query(queryInfo || { active: true }, fn);
}

function randomIds(ramdonNumber: number = 6) {
  return Math.random().toString().substring(2, ramdonNumber);
}
