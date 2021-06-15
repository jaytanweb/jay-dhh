import routes from '@/routes/routes';

// util
// import { checkUserInGroup } from '../api/User';

import { isValidArray } from '@/utils/type';

export const useTabs = (user) => {
  return routes.filter((route) => filterRoute(route, user));
};

const filterRoute = (route, user) => {
  // 是 tab 且允许当前用户所在组访问
  return route.isTab;
  // &&
  // (!isValidArray(route.authGroup) ||
  //   checkUserInGroup(
  //     user,
  //     route.authGroup.map((title) => ({ title })),
  //   ))
};
