export default {
  article (id) {
    return `/article?id=${id}`
  },
  tag (name) {
    return `/tag?tag=${name}`
  },
  cate (id) {
    return `/cate?id=${id}`
  }

}
