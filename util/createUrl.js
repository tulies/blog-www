export default {
  article(id) {
    return `/article/${id}`
  },
  tag(name) {
    return `/tag/${encodeURIComponent(name)}`
  },
  cate(id) {
    return `/cate/${id}`
  },
}
