class Google {
  constructor() {
    this.init();
  }
  init() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    const script1 = document.createElement('script');
    script1.src = 'https://apis.google.com/js/api:client.js';

    document.body.appendChild(script1);
  }

  login(client_id) {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', function () {
        let auth2;

        gapi.load('auth2', function () {
          auth2 = gapi.auth2.init({
            client_id,
            cookiepolicy: 'profile',
          });
          console.log(`auth2`, auth2);

          auth2.signIn().then(function () {
            const user = auth2.currentUser.get();
            const idToken = user.getAuthResponse().id_token;
            const accessToken = user.getAuthResponse().access_token;

            const id = user.getId();

            user.disconnect();

            // var email = auth2.currentUser
            //   .get()
            //   .getBasicProfile()
            //   .getEmail();
            resolve({ id, idToken, accessToken });
          });
        });
      });
    });
  }

  static logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function (res) {
      console.log('User signed out.', { res });
    });
  }
}

export default Google;
