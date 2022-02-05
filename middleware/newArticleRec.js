export default async (ctx) => {
  const data = await ctx.$axios.$get('/api/article/new')
  if (data && data.code === 0) {
    const newrec = data.data.map((v) => ({
      id: v.id,
      title: v.title,
      desc: `· ${v.create_time.substring(0, 10)} 发表`,
    }))
    ctx.store.commit('article/setNewrec', newrec)
  }
}
