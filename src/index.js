export default {
  async fetch(request, env) {
    // 把所有请求都代理给静态资源（public/ 下的文件）
    return env.ASSETS.fetch(request);
  },
};