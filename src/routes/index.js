import { isValidArray } from '@/utils/type';
import { Spin } from 'antd';
import React, { useMemo, Suspense, lazy } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

// import { Loading } from '@/design/components';

import { default as rootRoutes } from './routes';

export default () => {
  const genRoutesDom = ({ routes, parentPath = '' }) => {
    if (!isValidArray(routes)) return null;

    return (
      <Switch>
        {routes.map((route) => {
          const {
            path,
            redirect,
            exact,
            component,
            routes: nestedRoutes,
          } = route;
          const fullPath = (parentPath === '/' ? '' : parentPath) + path;

          if (redirect) {
            return (
              <Redirect
                exact={exact}
                path={path}
                to={redirect}
                key={fullPath}
              />
            );
          }

          // 当前
          let Page;
          if (!redirect && component) {
            // 直接引入的组件
            if (
              typeof component === 'function' ||
              React.Component.isPrototypeOf(component)
            ) {
              Page = component;
            }
            // 动态引入的页面
            else if (typeof component === 'string') {
              Page = lazy(() => import(`@/pages${component}`));
            }
          }

          return (
            Page && (
              <Route key={fullPath} path={path}>
                <Page>{genRoutesDom({ routes: nestedRoutes })}</Page>
              </Route>
            )
          );
        })}
      </Switch>
    );
  };

  const routesDom = useMemo(
    () => genRoutesDom({ routes: rootRoutes }),
    [rootRoutes],
  );

  return (
    <Router basename="/">
      <Suspense
        fallback={
          <div
            style={{
              width: '100vw',
              height: '100vh',
              display: 'grid',
              placeContent: 'center',
            }}
          >
            <Spin size="large" />
          </div>
        }
      >
        {routesDom}
      </Suspense>
    </Router>
  );
};
