import React, { Component } from 'react';
// import { twitterAccount } from '@/defaultSettings';

class Twitter {
  constructor(props) {
    this.redirecting = false;

    this.pixelID = props.pixelID;
    this.loginPath = props.loginPath;
    this.account = props.account;
  }

  /**
   *
   * @param {*} content 分享文案
   * @param {*} path 链接地址
   */
  share(content, path = window.location.host, hashTag) {
    const _shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      content,
    )}&url=${encodeURIComponent(path)}`;

    console.log({ content, _shareUrl });

    window.open(
      _shareUrl,
      '_blank',
      `toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0,width=770,height=660,top=${
        (screen.height - 660) / 2
      },left=${(screen.width - 770) / 2}`,
    );
  }

  login() {
    if (this.redirecting) return;

    this.redirecting = true;
    // window.location.href = BASEURL + this.loginPath;
    setTimeout(() => (this.redirecting = false), 2000);
  }

  /**
   *
   *  @description twitter 登录后的信息获取
   *
   */
  loginInfo() {
    const params = new Query().getAll();
    if (params.jwt) {
      // 登录 twitter
    }
    if (params.id) {
    }

    return params;
  }

  /**
   *  埋点
   */
  statisticEmbed() {
    const script = document.createElement('script');
    script.innerHTML = `
            !function (e, t, n, s, u, a) {
                e.twq || (s = e.twq = function () {
                    s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
                }, s.version = '1.1', s.queue = [], u = t.createElement(n), u.async = !0, u.src = '//static.ads-twitter.com/uwt.js',
                    a = t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u, a))
            }(window, document, 'script');
            // Insert Twitter Pixel ID and Standard Event data below
            twq('init', '${this.pixelID}');
            twq('track', 'PageView');
        `;
    document.head.appendChild(script);

    // 在页面上使用如下埋点
    // if(window.twq) {
    //     window.twq('track', 'CompleteRegistration');
    // }
  }
}

export default Twitter;

// const twitter = new Twitter(twitterAccount);

// class Timeline extends Component {
//   state = {
//     reloadTime: 0,
//   };

//   componentDidMount() {
//     this.loadTwitterTimeline();
//   }

//   loadTwitterTimeline() {
//     if (window.twttr && window.twttr.widgets && window.twttr.widgets.load) {
//       window.twttr.widgets.load();
//     } else {
//       const { reloadTime } = this.state;

//       if (reloadTime >= 3) return;

//       // 首次进入
//       if (reloadTime === 0) {
//         // 载入 twitter 插件
//         const script = document.createElement('script');
//         script.async = true;
//         script.charset = 'utf-8';
//         script.src = 'https://platform.twitter.com/widgets.js';

//         document.head.appendChild(script);
//       }

//       // reload
//       this.setState({ reloadTime: reloadTime + 1 }, this.loadTwitterTimeline);
//     }
//   }

//   render() {
//     const { bg, containerStyle = {}, style = {} } = this.props;

//     return (
//       <div
//         style={{
//           width: '100%',
//           position: 'relative',
//           ...(bg ? containerStyle : style),
//         }}
//       >
//         {bg && <img src={bg} style={{ width: '100%' }} alt="" />}
//         <div
//           style={{
//             position: bg ? 'absolute' : 'static',
//             background: 'rgba(205, 205, 205, .6)',
//             borderRadius: 4,
//             // padding: 12,
//             overflow: 'auto',
//             ...style,
//           }}
//         >
//           <a
//             class="twitter-timeline twitter-timeline-rendered"
//             href={`https://twitter.com/${twitter.account}`}
//           >
//             Tweets by {twitter.account}
//           </a>
//         </div>
//       </div>
//     );
//   }
// }

// twitter.Timeline = Timeline;

// export default twitter;
