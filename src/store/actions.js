import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch, savePlay} from 'common/js/cache'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)

}

export const insertSong = function ({commit, state}, song) {
  let playList = state.playList.slice() //不能直接操作state playlist和sequenceList
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex  //支赋值不会有问题

  //记录当前歌曲
  let currentSong = playList[currentIndex]
  //查找当前插入歌曲在playList中的位置并返回
  let fdIndex = findIndex(playList, song)
  //因为是插入歌曲当前index++
  currentIndex++
  playList.splice(currentIndex, 0, song)
  //如果这个ge已经存在
  if (fdIndex > -1) {
    if (currentIndex > fdIndex) {
      playList.splice(currentIndex, 1)
      currentIndex--
    } else {
      playList.splice(fdIndex + 1, 1)
    }
  }

  let currentSindex = findIndex(sequenceList, currentSong) + 1
  let fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSindex, 0, song)
  if (fsIndex > -1) {
    if (currentSindex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      playList.splice(fdIndex + 1, 1)
    }
  }
  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit}, query) { //实现本地缓存和vuex数据提交
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const deleteSong = function ({commit, state}, song) {
  let playList = state.playList.slice() //不能直接操作state playlist和sequenceList
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex  //支赋值不会有问题
  let pIndex = findIndex(playList, song)
  playList.splice(pIndex, 1)
  let SIndex = findIndex(sequenceList, song)
  sequenceList.splice(SIndex, 1)
  if (currentIndex > pIndex || currentIndex === playList.length) {
    currentIndex--
  }
  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  if (!playList.length) {
    commit(types.SET_PLAYING_STATE, false)
  } else {
    commit(types.SET_PLAYING_STATE, true)
  }
}

export const deleteSongList = function ({commit}) {
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_PLAYING_STATE, false)
}

export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}
