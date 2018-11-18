export default async (ctx) => {
  const { status, data } = await ctx.$axios.get(`/api/article/new`)
  if (status === 200 && data.code === 0) {
    const newrec = data.data.map(v => ({
      id: v.id,
      title: v.title,
      desc: `· ${v.create_time.substring(0, 10)} 发表`
    }))
    ctx.store.commit('article/setNewrec', newrec)
  }
}
