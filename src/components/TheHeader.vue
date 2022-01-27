<template>
  <header>
    <div class="inner">
      <div 
        class="open-nav-drawer"
        @click="onNav">
      </div>
      <a
        href="/"
        class="logo"></a>
      <div class="search">
        <input
          v-model="searchText" 
          placeholder="찾고 싶은 상품을 검색해 보세요!"
          @keypress.enter="search" />
        <div
          class="search__icon"
          @click="search"></div>
      </div>
      <div class="ranking">
        <div
          ref="swiper"
          class="swiper">
          <div class="swiper-wrapper">
            <div
              v-for="(ranking, index) in rankings.rankings"
              :key="ranking.name"
              class="swiper-slide">
              <a :href="ranking.href">
                <span class="index">{{ index + 1 }}</span>
                <span class="name">{{ ranking.name }}</span>
              </a>
            </div>
          </div>
        </div>
        <div
          class="open-more"
          @click="toggleRankingWrap"></div>
        <!--  실시간 쇼핑 검색어 목록 -->
        <div 
          v-if="rankings.rankings"
          class="ranking-warp">
          <div class="title">
            <h3>실시간 쇼핑 검색어</h3>
            <div class="time">
              {{ new Date(rankings.referenceDate).toLocaleString() }} 기준
            </div>
            <div class="close-wrap"></div>
          </div>
          <div class="tabs">
            <div
              :class="{ active : isHighTab }"
              class="tab"
              @click="isHighTab = true">
              1~10위
            </div>
            <div 
              :class="{ active : !isHighTab }"
              class="tab"
              @click="isHighTab = false">
              11~20위
            </div>
          </div>
          <ul class="list">
            <li
              v-for="(ranking, index) in filteredRankings"
              :key="ranking.name">
              <a :href="ranking.href">
                <span class="index">{{ (isHighTab ? 0 : 10) + index + 1 }}</span>
                <span class="name">{{ ranking.name }}</span>
                <span class="relative-name">{{ ranking.relativeName }}</span>
              </a>
              <div 
                class="icon"></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="user-menu">
      </div>
    </div>
  </header>
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

export default {
  data() {
    return {
      searchText : '',
      isHighTab: true,
      rankings: {},

    }
  },
  computed: {
    filteredRankings() {
      return this.rankings.rankings
        .filter((_, i) => this.isHighTab ? i < 10 : i >= 10)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.rankings = await this.$fetch({
        requestName: 'rankings'
      })

      console.log(this.rankings)
      // 화면이 갱신될때까지 기다리는 함수가 존재한다. 
      await this.$nextTick()

      new Swiper(this.$refs.swiper, {
        direction: 'vertical',
        speed: 1000,
        autoplay: {
          delay: 200
        },
        loop: true
      })

    },
    onNav() {
      // this.$fetch의 경우, use()를 통해서 해당 플러그인을 사용하겠다고 선언해두었다.
      this.$store.dispatch('navigation/onNav')
    },
    search() {
      
    },
  }
}
</script>


<style lang="scss" scoped>
header {
  padding: 20px 20px;
  border-bottom: 1px solid $color-primary;
  a {
    margin-right: 10px;
    line-height: 1;
  }
  background-color: #fff;
  &.fixed {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 97;
    box-shadow: 0 2px 8px rgba(#000, .07);
    .inner {
      // 스크롤링 되어서 상단에 header가 고정되도록 함.
      height: 80px;
    }
  }
  .inner {
    height: 120px;
    display: flex;
    align-items: center;
  }
  .open-nav-drawer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    // 중첩된 그림자 형태로 구현이 가능하다.
    box-shadow:
      0 2px 6px rgba(#000,.06),
      0 0 1px rgba(#000,.4);
    &::after {
      content: "";
      display: block;
      width: 36px;
      height: 36px;
      background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
      background-position: -302px -203px;
      background-size: 363px;
    }
  }
  .logo {
    width: 94px;
    height: 40px;
    margin: 0 24px;
    background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
    background-position: -162px 0;
    background-size: 363px;
    cursor: pointer;
  }
  .search {
    position: relative;
    input {
      width: 500px;
      height: 50px;
      padding: 0 27px;
      border: 1px solid #ddd;
      border-radius: 25px;
      box-sizing: border-box;
      background-color: #fafafa;
      outline: none;
      font-size: 18px;
      font-family: 'Noto Sans KR', sans-serif;
      &::placeholder {
        color: #bbb;
      }
    }
    &__icon {
      width: 50px;
      height: 50px;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
      background-position: -162px -45px;
      background-size: 363px;
    }
  }
  .ranking {
    width: 210px;
    position: relative;
    margin: 0 30px;
    .swiper {
      width: 182px;
      height: 28px;
      margin: 0;
      .swiper-slide {
        transition: .4s;
        opacity: 0;
        a {
          display: block;
          height: 28px;
          line-height: 28px;
          text-decoration: none;
          font-size: 15px;
          color: #333;
          font-weight: 700;
          .index {
            margin-right: 10px;
            color: #f43142;
            font-style: italic;
          }
          &:hover .name {
            color: #f43142;
          }
        }
        &.swiper-slide-active {
          opacity: 1;
        }
      }
    }
    .open-more {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1; // Required! Cause Swiper.
      cursor: pointer;
      user-select: none; // 실시간 쇼핑 검색어가 자동으로 선택(Selection)되는 것을 방지.
      &:hover {
        background-color: #ececec;
      }
      &::after {
        content: "";
        display: block;
        width: 7px;
        height: 7px;
        margin-top: -3px;
        border: solid #999;
        border-width: 0 1px 1px 0;
        box-sizing: border-box;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
