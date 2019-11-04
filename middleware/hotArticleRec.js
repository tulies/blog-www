export default async (ctx) => {
  const { status, data } = await ctx.$axios.get('/api/article/hot')
  if (status === 200 && data.code === 0) {
    const hotrec = data.data.map(v => ({
      id: v.id,
      title: v.title,
      desc: `阅读量：${v.pv}`
    }))
    ctx.store.commit('article/setHotrec', hotrec)
  }
}
