// import articleDAO from '../dao/article'
const articleDAO = require('../dao/article')
module.exports = {
  async getArticleList(ctx) {
    // console.log(ctx.request.query)
    const { page, size, categoryId } = ctx.request.query
    // 这边调用数据库的操作方法
    const list = await articleDAO.getArticleList({
      page: Number(page),
      size: Number(size),
      categoryId: Number(categoryId),
    })
    ctx.body = {
      code: 0,
      msg: '成功',
      data: list,
    }
  },
  async getArticleByTag(ctx) {
    const { page, size, tag } = ctx.request.query
    // 这边调用数据库的操作方法
    const list = await articleDAO.getArticleByTag({
      page: Number(page),
      size: Number(size),
      tag,
    })
    ctx.body = {
      code: 0,
      msg: '成功',
      data: list,
    }
  },
  async getArticleByTags(ctx) {
    const { page, size, tags, sortProp, sortOrder } = ctx.request.query
    // 这边调用数据库的操作方法
    const list = await articleDAO.getArticleByTags({
      page: Number(page),
      size: Number(size),
      tags,
      sortProp,
      sortOrder,
    })
    ctx.body = {
      code: 0,
      msg: '成功',
      data: list,
    }
  },
  async hot(ctx) {
    const { page, size, sortProp, sortOrder } = ctx.request.query
    // 这边调用数据库的操作方法
    const list = await articleDAO.getArticleList({
      page: page || 0,
      size: size || 6,
      sortProp: sortProp || 'pv',
      sortOrder: sortOrder || 'descending',
    })

    ctx.body = {
      code: 0,
      msg: '成功',
      data: list.list,
    }
  },
  async new(ctx) {
    const { page, size, sortProp, sortOrder } = ctx.request.query
    // 这边调用数据库的操作方法
    const list = await articleDAO.getArticleList({
      page: page || 0,
      size: size || 6,
      sortProp: sortProp || 'id',
      sortOrder: sortOrder || 'descending',
    })

    ctx.body = {
      code: 0,
      msg: '成功',
      data: list.list,
    }
  },
  async getArticle(ctx) {
    const { id } = ctx.params
    if (!id) {
      ctx.body = {
        code: -1,
        msg: '缺少内容id',
      }
      return false
    }
    // 调用一下增加pv
    const res = await articleDAO.incrementArticlePv({ id })
    if (!res) {
      ctx.body = {
        code: -1,
        msg: '数据不存在',
      }
      return false
    }
    // 这边调用数据库的操作方法
    const article = await articleDAO.getArticle({ id })
    if (!article) {
      ctx.body = {
        code: -1,
        msg: '数据不存在',
      }
      return false
    }

    ctx.body = {
      code: 0,
      msg: '成功',
      data: article,
    }
  },
  async getCategory(ctx) {
    const { id } = ctx.params
    if (!id) {
      ctx.body = {
        code: -1,
        msg: '缺少分类id',
      }
      return false
    }
    // 这边调用数据库的操作方法
    const category = await articleDAO.getCategory({ id })
    if (!category) {
      ctx.body = {
        code: -1,
        msg: '数据不存在',
      }
      return false
    }
    ctx.body = {
      code: 0,
      msg: '成功',
      data: category,
    }
  },
  async getCategoryChild(ctx) {
    const { id } = ctx.params
    if (!id) {
      ctx.body = {
        code: -1,
        msg: '缺少分类id',
      }
      return false
    }
    // 这边调用数据库的操作方法
    const categorys = await articleDAO.getCategoryChild({ id })
    ctx.body = {
      code: 0,
      msg: '成功',
      data: categorys,
    }
  },
  async getCategoryUp(ctx) {
    const { id } = ctx.params
    if (!id) {
      ctx.body = {
        code: -1,
        msg: '缺少分类id',
      }
      return false
    }
    // 这边调用数据库的操作方法
    const category = await articleDAO.getCategoryUp({ id })
    if (!category) {
      ctx.body = {
        code: -1,
        msg: '数据不存在',
      }
      return false
    }
    ctx.body = {
      code: 0,
      msg: '成功',
      data: category,
    }
  },
  async getCategoryTree(ctx) {
    const { id } = ctx.params
    if (!id) {
      ctx.body = {
        code: -1,
        msg: '缺少分类id',
      }
      return false
    }
    // 这边调用数据库的操作方法
    const category = await articleDAO.getCategoryTree({ id })
    if (!category) {
      ctx.body = {
        code: -1,
        msg: '数据不存在',
      }
      return false
    }
    ctx.body = {
      code: 0,
      msg: '成功',
      data: category,
    }
  },
  async getCategoryLeaf(ctx) {
    const { id } = ctx.params
    if (!id) {
      ctx.body = {
        code: -1,
        msg: '缺少分类id',
      }
      return false
    }
    // 这边调用数据库的操作方法
    const category = await articleDAO.getCategoryLeaf({ id })
    if (!category) {
      ctx.body = {
        code: -1,
        msg: '数据不存在',
      }
      return false
    }
    ctx.body = {
      code: 0,
      msg: '成功',
      data: category,
    }
  },
}
