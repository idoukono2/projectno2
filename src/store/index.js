import Vue from 'vue'
import vuex from 'vuex'

import state from './state.js'
import * as getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

import createLogger from 'vuex/dist/logger'; // 修改日志


Vue.use(vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new vuex.Store({
    state,
    getters,
    actions,
    mutations,

    plugins: debug ? [createLogger()] : [] // 开发环境下显示vuex的状态修改
})