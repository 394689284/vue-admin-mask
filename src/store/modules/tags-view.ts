/*
 * @FilePath: \vue-typescript-admin-template\src\store\modules\tags-view.ts
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 16:04:42
 * @Reference: 引用方 src\store\index.ts
 * @Descripttion: 说明 标签栏视图 状态管理
 */
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import { Route } from 'vue-router'
import store from '@/store'
export interface ITagView extends Partial<Route> {
  title?: string
}
/** 标签视图接口 */
export interface ITagsViewState {
  visitedViews: ITagView[]
  cachedViews: (string | undefined)[]
}
/** 标签视图 实现类 */
@Module({ dynamic: true, store, name: 'tagsView' })
class TagsView extends VuexModule implements ITagsViewState {
  /** 访问过的视图 */
  public visitedViews: ITagView[] = []
  /** 视图缓存 */
  public cachedViews: (string | undefined)[] = []
  @Mutation
  private ADD_VISITED_VIEW(view: ITagView) {
    if (this.visitedViews.some(v => v.path === view.path)) return
    this.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta?.title || 'no-name'
      })
    )
  }

  @Mutation
  private ADD_CACHED_VIEW(view: ITagView) {
    if (view.name === null) return
    if (this.cachedViews.includes(view.name)) return
    if (!view.meta?.noCache) {
      this.cachedViews.push(view.name)
    }
  }

  @Mutation
  private DEL_VISITED_VIEW(view: ITagView) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1)
        break
      }
    }
  }

  @Mutation
  private DEL_CACHED_VIEW(view: ITagView) {
    if (view.name === null) return
    const index = this.cachedViews.indexOf(view.name)
    index > -1 && this.cachedViews.splice(index, 1)
  }

  @Mutation
  private DEL_OTHERS_VISITED_VIEWS(view: ITagView) {
    this.visitedViews = this.visitedViews.filter(v => {
      return v.meta?.affix || v.path === view.path
    })
  }

  @Mutation
  private DEL_OTHERS_CACHED_VIEWS(view: ITagView) {
    if (view.name === null) return
    const index = this.cachedViews.indexOf(view.name)
    if (index > -1) {
      this.cachedViews = this.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      this.cachedViews = []
    }
  }

  @Mutation
  private DEL_ALL_VISITED_VIEWS() {
    // keep affix tags
    const affixTags = this.visitedViews.filter(tag => tag.meta?.affix)
    this.visitedViews = affixTags
  }

  @Mutation
  private DEL_ALL_CACHED_VIEWS() {
    this.cachedViews = []
  }

  @Mutation
  private UPDATE_VISITED_VIEW(view: ITagView) {
    for (let v of this.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }

  /** 添加指定视图缓存 */
  @Action
  public addView(view: ITagView) {
    this.ADD_VISITED_VIEW(view)
    this.ADD_CACHED_VIEW(view)
  }

  /** 添加指定访问过的视图 */
  @Action
  public addVisitedView(view: ITagView) {
    this.ADD_VISITED_VIEW(view)
  }

  /** 删除指定视图 */
  @Action
  public delView(view: ITagView) {
    this.DEL_VISITED_VIEW(view)
    this.DEL_CACHED_VIEW(view)
  }

  /** 删除指定视图缓存 */
  @Action
  public delCachedView(view: ITagView) {
    this.DEL_CACHED_VIEW(view)
  }

  /** 删除指定其他视图 */
  @Action
  public delOthersViews(view: ITagView) {
    this.DEL_OTHERS_VISITED_VIEWS(view)
    this.DEL_OTHERS_CACHED_VIEWS(view)
  }

  /** 删除全部视图 */
  @Action
  public delAllViews() {
    this.DEL_ALL_VISITED_VIEWS()
    this.DEL_ALL_CACHED_VIEWS()
  }

  /** 删除所有视图缓存 */
  @Action
  public delAllCachedViews() {
    this.DEL_ALL_CACHED_VIEWS()
  }

  /** 更新指定访问过的视图 */
  @Action
  public updateVisitedView(view: ITagView) {
    this.UPDATE_VISITED_VIEW(view)
  }
}

export const TagsViewModule = getModule(TagsView)
