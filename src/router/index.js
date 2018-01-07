import Vue from 'vue'
import Router from 'vue-router'
// import Recommend from 'components/recommend/recommend'
// import Singer from 'components/singer/singer'
// import Rank from 'components/rank/rank'
// import Search from 'components/search/search'
// import SingerDetail from 'components/singer-detail/singer-detail'
// import topList from 'components/top-list/top-list'
// import Disc from 'components/disc/disc'
// import User from 'components/user-center/user-center'

Vue.use(Router)
// const Recommend = r => require.ensure([], () => r(require('@/components/recommend/recommend')), 'Recommend');
// const Singer = r => require.ensure([], () => r(require('@/components/singer/singer')), 'Singer');
// const Rank = r => require.ensure([], () => r(require('@/components/rank/rank')), 'Rank');
// const Search = r => require.ensure([], () => r(require('@/components/search/search')), 'Search');
// const SingerDetail = r => require.ensure([], () => r(require('@/components/singer-detail/singer-detail')), 'SingerDetail');
// const topList = r => require.ensure([], () => r(require('@/components/top-list/top-list')), 'topList');
// const Disc = r => require.ensure([], () => r(require('@/components/disc/disc')), 'Disc');
// const User = r => require.ensure([], () => r(require('@/components/user-center/user-center')), 'Search');
const Recommend = () => import('components/recommend/recommend')
const Singer = () => import('components/singer/singer')
const Rank = () => import('components/rank/rank')
const Search = () => import('components/search/search')
const SingerDetail = () => import('components/singer-detail/singer-detail')
const topList = () => import('components/top-list/top-list')
const Disc = () => import('components/disc/disc')
const User = () => import('components/user-center/user-center')


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: topList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/user',
      component: User
    }
  ]
})
