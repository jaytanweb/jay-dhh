class Naver {
  constructor() {
    this.init();
  }

  init() {
    const script = document.createElement('script');
    script.src = 'https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js'; // TAG 方法1
    // script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js'; // TAG 方法2
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    const script2 = document.createElement('script');
    script2.src = 'https://code.jquery.com/jquery-1.11.3.min.js';
    script2.async = true;
    script2.defer = true;
    document.body.appendChild(script2);
  }

  loginWithNaverId(CLIENT_ID, CALLBACK_URL, SERVICE_URL) {
    return new Promise(async (resolve, reject) => {
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: CLIENT_ID,
        callbackUrl: CALLBACK_URL,
        isPopup: true,
        loginButton: {
          color: 'white',
          type: 3,
          height: 40,
        },
        callbackHandle: true,
      });
      // 初始化实例
      naverLogin.init();
      // TAG 点击 NAVER 按钮
      await new Promise((resolve, reject) => {
        const clickNaver = () => {
          const dom = document.getElementById('naverIdLogin_loginButton');
          if (dom) {
            dom.click();
            resolve(true);
            return;
          }
          setTimeout(() => {
            clickNaver();
          }, 1000);
        };
        clickNaver();
      });
      // TAG NAVER 返回的数据
      const getStatus = () => {
        naverLogin.getLoginStatus(function (status) {
          console.log(status);
          if (status) {
            const email = naverLogin.user.getEmail();
            const name = naverLogin.user.getNickName();
            const uniqId = naverLogin.user.getId();
            const token = naverLogin.accessToken.accessToken;
            console.log(email, name, uniqId, token);
            resolve(token);
            return;
          }
          setTimeout(() => {
            getStatus();
            console.log('retry');
          }, 1000);
        });
      };
      getStatus();
    });
  }
  naverIdLogin(CLIENT_ID, CALLBACK_URL, SERVICE_URL) {
    return new Promise(async (resolve, reject) => {
      var naver_id_login = new window.naver_id_login(CLIENT_ID, CALLBACK_URL);
      var state = naver_id_login.getUniqState();
      naver_id_login.setButton('white', 2, 40);
      naver_id_login.setDomain(SERVICE_URL);
      naver_id_login.setState(state);
      naver_id_login.setPopup();
      naver_id_login.init_naver_id_login();

      // TAG 点击 NAVER 按钮
      // naver_id_login_anchor
      await new Promise((resolve, reject) => {
        const clickNaver = () => {
          const dom = document.getElementById('naver_id_login_anchor');
          if (dom) {
            dom.click();
            resolve(true);
            return;
          }
          setTimeout(() => {
            clickNaver();
          }, 1000);
        };
        clickNaver();
      });
    });
  }

  token(CLIENT_ID, CALLBACK_URL) {
    const naver_id_login = new window.naver_id_login(CLIENT_ID, CALLBACK_URL);
    // TAG 查询naver用户配置文件
    // naver_id_login.get_naver_userprofile('naverSignInCallback()');
    naver_id_login.get_naver_userprofile(() => {
      console.log(naver_id_login.getProfileData('email'));
      console.log(naver_id_login.getProfileData('nickname'));
      console.log(naver_id_login.getProfileData('age'));
    });
    // 您可以在浏览naver用户配置文件后处理配置文件的信息 callback function
    window.naverSignInCallback = function naverSignInCallback() {
      alert(naver_id_login.getProfileData('email'));
      alert(naver_id_login.getProfileData('nickname'));
      alert(naver_id_login.getProfileData('age'));
    };
    return naver_id_login.oauthParams.access_token;
  }

  /**
   *
   * @param {*} title 分享标题
   * @param {*} path 链接地址
   */
  share(title, path = window.location.host) {
    const shareURL = `https://share.naver.com/web/shareView.nhn?url=${path}&title=${title}`;
    window.open(shareURL, '_blank');
  }

  /**
   *
   * @param {*} title 分享标题
   * @param {*} path 链接地址
   */
  blogShare(title, path = window.location.host) {
    const shareURL = `http://blog.naver.com/openapi/share?url=${path}&title=${title}`;
    window.open(shareURL, '_blank');
  }
}

export default Naver;
