import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article.component';
import { ArticleCommentListComponent } from './comment/list/list.component';
import { ArticleContentAddComponent } from './content/add/add.component';
import { ArticleContentEditComponent } from './content/edit/edit.component';
import { ArticleContentListComponent } from './content/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleComponent,
    data: { title: 'ROUTE.ARTICLE' },
    children: [
      /* Config */
      {
        path: 'config',
        loadChildren: () =>
          import('./config/article-config.module').then((m) => m.ArticleConfigModule),
      },
      /* Config */
      {
        path: 'content',
        // resolve: {categoryList: CategoryResolver},
        // loadChildren: () =>    import('./content/content.module').then(m => m.ContentModule)
        component: ArticleContentListComponent,
        data: { title: 'ROUTE.ARTICLE' },
      },
      {
        path: 'content/add/:CategoryId',
        component: ArticleContentAddComponent,
        data: { title: 'ROUTE.ARTICLE' },
      },
      {
        path: 'content/edit/:Id',
        component: ArticleContentEditComponent,
        data: { title: 'ROUTE.ARTICLE' },

      },
      {
        path: 'comment',
        component: ArticleCommentListComponent,
        data: { title: 'ROUTE.ARTICLE' },

      },
      {
        path: 'comment/:ContentId',
        component: ArticleCommentListComponent,
        data: { title: 'ROUTE.ARTICLE' },

      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRouting {
}
