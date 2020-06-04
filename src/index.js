/* eslint-disable */
import Turntable from './Turntable.vue'

const install = function (Vue) {
    Vue.component(Turntable.name, Turntable)
}

/* 浏览器上引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
    //全局的ajax
    window.$http = window.Vue.prototype.$http;
}

Turntable.install = install;

export default Turntable;
