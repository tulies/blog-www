export default async (ctx) => {
  const data = await ctx.$axios.$get('/api/article/hot')
  if (data && data.code === 0) {
    const hotrec = data.data.map((v) => ({
      id: v.id,
      title: v.title,
      desc: `阅读量：${v.pv}`,
    }))

    ctx.store.commit('article/setHotrec', hotrec)
  }
}
