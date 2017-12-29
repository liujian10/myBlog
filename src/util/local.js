const TTL = '__TTL__';

function getStorage () {
  return localStorage.SENSE ? JSON.parse(localStorage.SENSE) : {
    [TTL]: {} // time to live
  };
}

let storage = getStorage();

const saveStorage = () => (localStorage.SENSE = JSON.stringify(storage));

const checkExpire = () => {
  const now = +new Date();
  storage = getStorage();

  Object.entries(storage[TTL]).forEach(([key, ttl]) => {
    if (ttl - now <= 0) {
      delete storage[key];
      delete storage[TTL][key];
    }
  });

  saveStorage();
  return storage;
};

// 设置值
// ttl 存活时间，单位：毫秒
const set = (key, value, ttl) => {
  storage[key] = value;
  if (ttl != null) {
    storage[TTL][key] = ttl + (+new Date());
  }
  saveStorage();
};

const get = (key) => {
  storage = checkExpire();
  return storage[key];
};

const clear = (...keys) => {
  keys.forEach((key) => {
    delete storage[key];
    delete storage[TTL][key];
  });
  saveStorage();
};

const setTTL = (key, ttl) => {
  storage[TTL][key] = ttl + (+new Date());
  saveStorage();
};

const getTTL = key => storage[TTL][key] - (+new Date());

// const localIp = '10.58.93.124'

export const isLocal = () => {
  return true;
  // location.href.indexOf('localhost') > -1 || location.href.indexOf(localIp) > -1
};

export default { set, get, clear, setTTL, getTTL, isLocal };
