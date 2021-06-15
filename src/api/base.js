import AxiosApi from '@/utils/request';
import { getSession, setSession } from '@/utils/session';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import UrlQuery from '@/utils/query';
import Browser from 'bowser';

import {
  DEV_BASEURL,
  TEST_BASEURL,
  RELEASE_BASEURL,
} from '../../defaultSettings';

// console.log({ NODE_ENV, WEBPACK_BUILD_TYPE });

let BASEURL = DEV_BASEURL;

if (NODE_ENV === 'production') {
  switch (WEBPACK_BUILD_TYPE) {
    case 'release':
      BASEURL = RELEASE_BASEURL;
      break;
    case 'test':
      BASEURL = TEST_BASEURL;
      break;
  }
}

const genGameInfo = () => {
  const isRelease =
    NODE_ENV === 'production' && WEBPACK_BUILD_TYPE === 'release';

  const baseGameInfo = isRelease
    ? {
        // 正式环境
        channelId: '4', // 渠道id
        gameId: '36', // 游戏id
        packageId: '108', // 应用id
      }
    : {
        // 仿真化境
        channelId: '1', // 渠道id
        gameId: '1', // 游戏id
        packageId: '1', // 应用id
      };

  const agent = Browser.parse(navigator.userAgent);

  return {
    model: `${agent.browser.name} ${agent.browser.version}`, // 设备型号
    os: agent.os.name, // 操作系统
    osVersion: agent.os.version, // 系统版本
    ...baseGameInfo,
  };
};

const genAdId = () => {
  const urlQuery = new UrlQuery();
  return urlQuery.get('adId') || 'unknown';
};

const genFingerprint = async () => {
  const fpPromise = await FingerprintJS.load();
  const fp = fpPromise;
  const result = await fp.get();
  const visitorId = result.visitorId;
  return `browser_${visitorId}`;
};
// 后端所需要的参数信息
export const genHeaders = async () => {
  const devUniqueId = await genFingerprint();

  setSession('headers', {
    adId: genAdId(), // 广告id unknown || url?adId='xxx'
    devUniqueId, // 设备id => 本地存一个随机数
    ...genGameInfo(),
  });
};

export const BaseApi = new AxiosApi(`${BASEURL}`, true, () => {
  const accessToken = getSession('accessToken');
  const headers = getSession('headers');

  return accessToken ? { ...headers, accessToken } : headers;
});
