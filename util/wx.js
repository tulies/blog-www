import axios from 'axios'
export const jssdkConfig = async () => {
  const res = await axios.get('/api/wx/jsapi-config', {
    params: {
      url: location.href.split('#')[0]
    }
  })
  if (!(res.status === 200 && res.data.code === 0)) {
    return null
  }
  return res.data.data
}
