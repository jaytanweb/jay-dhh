class Facebook {
  constructor() {
    this.init();
  }
  init() {
    const script = document.createElement('script');
    script.innerHTML = `
            var ID, email, name;
            var fbAutoLogin;
            (function (d, s, id) {
                var js,
                    fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "https://connect.facebook.net/zh_TW/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            })(document, "script", "facebook-jssdk");
        `;
    document.body.appendChild(script);
  }

  login() {
    return new Promise((resolve, reject) => {
      FB.login(
        function (response) {
          if (!response.authResponse) {
            reject();
            return;
          }
          resolve(response.authResponse.userID);
        },
        { perms: 'public_profile,email' },
      );
    });
  }

  // 初始化对应的游戏
  fbAsyncInit(appId) {
    return new Promise(async (resolve, reject) => {
      if (window.FB) {
        window.FB.init({
          appId,
          status: true,
          cookie: true,
          xfbml: true,
          version: 'v2.5', //facebook登录版本
        });

        await this.login();

        resolve();
      }
    });
  }

  //邮箱
  getEmail() {
    return new Promise((resolve, reject) => {
      FB.api('/me?fields=id,name,picture,email', function (response) {
        resolve(response);
      });
    });
  }

  // token_for_business
  getBusinessToken() {
    return new Promise((resolve, reject) => {
      FB.api('/me?fields=token_for_business', function (response) {
        console.log(`getBusinessToken:`, response);
        if (response.error) {
          reject();
          return;
        }
        resolve(response.token_for_business);
      });
    });
  }
  // access_token
  getAccessToken() {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          resolve(response.authResponse.accessToken);
        }
      });
    });
  }

  static logout() {
    FB.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        FB.logout(function (res) {
          console.log({ res });
        });
      }
    });
  }
}

export default Facebook;
