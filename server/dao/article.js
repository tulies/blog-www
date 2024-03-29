// import moment from 'moment'
// import mysql from '../lib/mysql'
// import configs from '../config'
const moment = require('moment')
const mysql = require('../lib/mysql')
const configs = require('../config')

const formatTags = (tags) => {
  if (tags.startsWith(',')) {
    tags = tags.substring(1)
  }
  if (tags.endsWith(',')) {
    tags = tags.substring(0, tags.length - 1)
  }
  return tags
}

// 查询文章列表 asc descending
const getArticleList = async ({
  page,
  size,
  categoryId,
  sortProp,
  sortOrder,
}) => {
  page = page || 0
  size = size || 10
  page = Number(page)
  size = Number(size)
  categoryId = categoryId || undefined

  // 如果分类id存在，我们就要去查一下分类id有没有子节点，我们要遍历下面所有的子节点
  let categoryIds = []
  if (categoryId) {
    categoryIds = await getCategoryLeaf({ id: categoryId })
    categoryIds = categoryIds.map((v) => v.id)
  }
  const whereBuilder = (builder) => {
    builder.where('status', 1)
    if (categoryIds && categoryIds.length > 0) {
      builder.whereIn('category_id', categoryIds)
    }
  }

  const model = mysql('blog_article').where(whereBuilder)

  const totalCount = await model.clone().count('id as count')
  const list = await model
    .clone()
    .limit(size)
    .offset(page * size)
    .orderBy(sortProp || 'id', sortOrder === 'asc' ? 'asc' : 'desc')
    .map((row) => ({
      ...row,
      tags: formatTags(row.tags),
      poster:
        row.poster && !row.poster.startsWith('http')
          ? configs.hosts.fileUrlHost + row.poster
          : row.poster,
      update_time: moment(row.update_time).format('YYYY-MM-DD HH:mm:ss'),
      create_time: moment(row.create_time).format('YYYY-MM-DD HH:mm:ss'),
    }))

  return {
    total: totalCount[0].count,
    page,
    size,
    list,
  }
}

// 根据标签查询文章列表 asc descending
const getArticleByTag = async ({ page, size, tag, sortProp, sortOrder }) => {
  page = page || 0
  size = size || 10
  page = Number(page)
  size = Number(size)
  // 如果分类id存在，我们就要去查一下分类id有没有子节点，我们要遍历下面所有的子节点
  const whereBuilder = (builder) => {
    builder.where('status', 1)
    builder.where('tags', 'like', `%,${tag},%`)
  }

  const model = mysql('blog_article').where(whereBuilder)

  const totalCount = await model.clone().count('id as count')
  const list = await model
    .clone()
    .limit(size)
    .offset(page * size)
    .orderBy(sortProp || 'id', sortOrder === 'asc' ? 'asc' : 'desc')
    .map((row) => ({
      ...row,
      tags: formatTags(row.tags),
      poster:
        row.poster && !row.poster.startsWith('http')
          ? configs.hosts.fileUrlHost + row.poster
          : row.poster,
      update_time: moment(row.update_time).format('YYYY-MM-DD HH:mm:ss'),
      create_time: moment(row.create_time).format('YYYY-MM-DD HH:mm:ss'),
    }))

  return {
    total: totalCount[0].count,
    page,
    size,
    list,
  }
}

// 根据相关推荐 通过tag去关联
const getArticleByTags = async ({ page, size, tags, sortProp, sortOrder }) => {
  page = page || 0
  size = size || 10
  page = Number(page)
  size = Number(size)
  // 如果分类id存在，我们就要去查一下分类id有没有子节点，我们要遍历下面所有的子节点
  const whereBuilder = (builder) => {
    builder.where('status', 1)
  }
  const tagsBuilder = (builder) => {
    let i = 0
    tags.split(',').forEach((tag) => {
      if (i === 0) {
        builder.where('tags', 'like', `%,${tag},%`)
      } else {
        // builder.orWhere('tags', 'like', `%${tag}%`)
        builder.orWhere('tags', 'like', `%,${tag},%`)
      }
      i++
    })
  }

  const model = mysql('blog_article').where(whereBuilder).andWhere(tagsBuilder)

  const totalCount = await model.clone().count('id as count')
  const list = await model
    .clone()
    .limit(size)
    .offset(page * size)
    .orderBy(sortProp || 'id', sortOrder === 'asc' ? 'asc' : 'desc')
    .map((row) => ({
      ...row,
      tags: formatTags(row.tags),
      poster:
        row.poster && !row.poster.startsWith('http')
          ? configs.hosts.fileUrlHost + row.poster
          : row.poster,
      update_time: moment(row.update_time).format('YYYY-MM-DD HH:mm:ss'),
      create_time: moment(row.create_time).format('YYYY-MM-DD HH:mm:ss'),
    }))

  return {
    total: totalCount[0].count,
    page,
    size,
    list,
  }
}

// 查询单个文章详情
const getArticle = async ({ id }) => {
  let article = await mysql('blog_article')
    .first([
      'blog_article.*',
      'blog_article_ext.content',
      { category_name: 'blog_category.name' },
    ])
    .leftJoin(
      'blog_article_ext',
      'blog_article.id',
      'blog_article_ext.article_id'
    )
    .leftJoin('blog_category', 'blog_article.category_id', 'blog_category.id')
    .where({ 'blog_article.id': id, 'blog_article.status': 1 })

  if (article) {
    article = {
      ...article,
      tags: formatTags(article.tags),
      poster:
        article.poster && !article.poster.startsWith('http')
          ? configs.hosts.fileUrlHost + article.poster
          : article.poster,
      update_time: moment(article.update_time).format('YYYY-MM-DD HH:mm:ss'),
      create_time: moment(article.create_time).format('YYYY-MM-DD HH:mm:ss'),
    }
  }

  return article
}
// 增加文章的点击pv
const incrementArticlePv = async ({ id }) => {
  const result = await mysql('blog_article').where('id', id).increment('pv', 1)
  return result
}

// 根据id查询单个category信息
const getCategory = async ({ id }) => {
  const category = await mysql('blog_category').first().where('id', id)
  return category
}

// 根据id查询单个category信息
const getCategoryChild = async ({ id }) => {
  // let category = await mysql('blog_category').first().where('id', id)
  const categorys = await mysql('blog_category')
    .where('parent_id', id)
    .orderBy('sort', 'desc')

  return categorys
}

// 根据id查询单个category信息
const getCategoryLeaf = async ({ id, parentIds }) => {
  // let category = await mysql('blog_category').first().where('id', id)
  // 根据您id 查询当前id的信息。
  const category = await getCategory({ id })

  const { childrens } = await findChildCategory(category.id, parentIds)
  if (childrens) {
    return childrens
  } else {
    return [category]
  }
}

// 根据id查询单个category信息
const getCategoryTree = async ({ id, parentIds }) => {
  // let category = await mysql('blog_category').first().where('id', id)
  // 根据您id 查询当前id的信息。
  const category = await getCategory({ id })

  // 查询出子节点。
  const { tree } = await findChildCategory(category.id, parentIds)

  category.children = tree
  return category
}

const findChildCategory = async (parentId, parentIds, childrens) => {
  parentIds =
    parentIds ||
    (await mysql('blog_category')
      .distinct('parent_id')
      .select()
      .map((row) => row.parent_id))
  childrens = childrens || []

  // 判断parentid在不在里面,不在父节点下，说明是子节点。
  if (!parentIds.includes(parentId)) {
    return { tree: null, childrens: null }
  }

  const categorys = await mysql('blog_category').where('parent_id', parentId)
  for (let i = 0; i < categorys.length; i++) {
    const { tree } = await findChildCategory(
      categorys[i].id,
      parentIds,
      childrens
    )
    if (tree === null) {
      childrens.push(categorys[i])
    }
    categorys[i].children = tree
  }
  return { tree: categorys, childrens }
}

// 根据id级联查询所有父category信息
const getCategoryUp = async ({ id }) => {
  const category = await mysql('blog_category').first().where('id', id)
  if (category && category.parent_id !== 0) {
    category.parent = await getCategoryUp({ id: category.parent_id })
  }
  return category
}
module.exports = {
  getArticleList,
  getArticle,
  getCategory,
  getCategoryUp,
  getCategoryLeaf,
  findChildCategory,
  getCategoryTree,
  getArticleByTag,
  getCategoryChild,
  getArticleByTags,
  incrementArticlePv,
}
