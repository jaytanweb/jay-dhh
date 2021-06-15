/**
 * @author Elon 2019-07-31
 * @param {string}  href: 需要处理的地址， 默认为当前地址
 *
 */
export default class {
  constructor(targetSearch) {
    this.query = {};
    const search = targetSearch || window.location.search;
    if (search) {
      const query = search.slice(1);

      query.split('&').forEach((kv) => {
        if (kv && typeof kv === 'string' && kv.indexOf('=') > 0) {
          const [key, value] = kv.split('=');

          this.query[key] = value;
        }
      });
    }
  }

  get(key) {
    if (typeof key === 'string' && this.query[key]) {
      return this.query[key];
    }
    return undefined;
  }

  getAll() {
    return this.query;
  }
}

export class Custom {
  constructor(symbol, targetHref) {
    this.query = {};
    const href = targetHref || window.location.href;
    const search = href.slice(href.indexOf(symbol));
    if (search) {
      const query = search.slice(1);

      query.split('&').forEach((kv) => {
        if (kv && typeof kv === 'string' && kv.indexOf('=') > 0) {
          const [key, value] = kv.split('=');

          this.query[key] = value;
        }
      });
    }
  }

  get(key) {
    if (typeof key === 'string' && this.query[key]) {
      return this.query[key];
    }
    return undefined;
  }

  getAll() {
    return this.query;
  }
}
