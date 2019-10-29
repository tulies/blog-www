import axios from 'axios'
export const jssdkConfig = async () => {
  if (!navigator.userAgent.match(/micromessenger/i)) {
    // 如果不是在微信浏览器内，则直接返回空
    return null
  }
  const res = await axios.get('/api/wx/jsapi-config', {
    params: {
      url: encodeURIComponent(location.href.split('#')[0])
      // url: encodeURIComponent('http://www.baidu.com/sad/sdasd?xsjh=你好呀&haha=哈哈')
    }
  })
  if (!(res.status === 200 && res.data.code === 0)) {
    return null
  }
  return res.data.data
}

export const updateappmessagesharedata = (shareData) => {
  shareData = shareData || {
    title: '王嘉炀·个人博客',
    desc: '一个有理想的码农的个人博客，专注前沿技术的研究和学习，一直在快乐学习的路上。',
    link: location.href,
    imgUrl: 'http://stc.wangjiayang.cn/blog/logo.jpg',
    ...shareData
  }
  wx.onMenuShareAppMessage({
    title: shareData.title,
    desc: shareData.desc,
    link: shareData.link,
    imgUrl: shareData.imgUrl
  })
  wx.onMenuShareTimeline({
    title: shareData.title,
    desc: shareData.desc,
    link: shareData.link,
    imgUrl: shareData.imgUrl
  })
  wx.onMenuShareQQ({
    title: shareData.title,
    desc: shareData.desc,
    link: shareData.link,
    imgUrl: shareData.imgUrl
  })
  wx.onMenuShareWeibo({
    title: shareData.title,
    desc: shareData.desc,
    link: shareData.link,
    imgUrl: shareData.imgUrl
  })
}
