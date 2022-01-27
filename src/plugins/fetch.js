// 모든 컴포넌트들이 공유할 수 있는 로직을 여기서 정의한다.
import axios from 'axios'

export default {
  install(app) {
    // 어디서든 할 수 있도록 정의한다.
    app.config.globalProperties.$fetch = async (options) => {
      const { requestName } = options
      const res = await axios({
          url: `https://trusting-williams-8cacfb.netlify.app/.netlify/functions/main?apiKey=1216&requestName=${requestName}`,
          method: 'GET',
      })
      return res.data
    }
  }
}



