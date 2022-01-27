import { createStore } from 'vuex'
import navigation from './navigation'

// 데이터를 컴포넌트 간 교환하거나 공유할 때 중앙 집중된 데이터 저장소의 데이터를 모든 컴포넌트가 사용하도록 변경해줘야한다.
export default createStore({
  modules: {
    navigation
  }
})
