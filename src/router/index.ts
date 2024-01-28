import { createRouter, createWebHistory } from 'vue-router'
import BlankLayoutVue from '@/components/layout/BlankLayout.vue'
import DefaultLayoutVue from '@/components/layout/DefaultLayout.vue'

import AboutViewVue from '@/views/AboutView.vue'
import BlogViewVue from '@/views/blog/BlogView.vue'
import articleViewVue from '@/views/blog/articleView.vue'
import FaqViewVue from '@/views/FaqView.vue'
import HomeView from '../views/HomeView.vue'
import ProfileViewVue from '@/views/profile/ProfileView.vue'
import ProfileEditViewVue from '@/views/profile/ProfileEditView.vue'
import TestResultViewVue from '@/views/test/TestResultView.vue'
import TestViewVue from '@/views/test/TestView.vue'
import TypesSingleViewVue from '@/views/personalityTypes/TypesSingleView.vue'
import TypesViewVue from '@/views/personalityTypes/TypesView.vue'
import LoginViewVue from '@/views/auth/LoginView.vue'
import RegisterViewVue from '@/views/auth/RegisterView.vue'
import ResetPasswordViewVue from '@/views/auth/ResetPasswordView.vue'

import AdminViewVue from '@/views/admin/AdminView.vue'
import CategoriesEditViewVue from '@/views/admin/categories/CategoriesEditView.vue'
import CategoriesIndexViewVue from '@/views/admin/categories/CategoriesIndexView.vue'
import QuestionsEditViewVue from '@/views/admin/questions/QuestionsEditView.vue'
import QuestionsIndexViewVue from '@/views/admin/questions/QuestionsIndexView.vue'
import QuestionsSingleViewVue from '@/views/admin/questions/QuestionsSingleView.vue'
import TypesEditViewVue from '@/views/admin/types/TypesEditView.vue'
import TypesIndexViewVue from '@/views/admin/types/TypesIndexView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayoutVue,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        }
      ]
    },
    {
      path: '/auth/',
      component: BlankLayoutVue,
      children: [
        {
          path: '/login',
          name: 'login',
          component: LoginViewVue,
          meta: {
            public: true
          },
        },
        {
          path: '/register',
          name: 'register',
          component: RegisterViewVue
        }
      ]
    },
    {
      path: '/page/',
      component: DefaultLayoutVue,
      children: [
        {
          path: '/about',
          name: 'about',
          component: AboutViewVue
        },
        {
          path: '/test',
          name: 'testPage',
          component: TestViewVue
        },
        {
          path: '/types',
          name: 'types',
          component: TypesViewVue
        },
        {
          path: '/blog/:currentPage?',
          name: 'blog',
          component: BlogViewVue
        },
        {
          path: '/article/:articleTitle',
          name: 'article',
          component: articleViewVue
        },
        {
          path: '/faq',
          name: 'faqView',
          component: FaqViewVue
        },
        {
          path: '/test-result',
          name: 'testResultView',
          component: TestResultViewVue
        },
        {
          path: '/type/:type',
          name: 'typesSingleView',
          component: TypesSingleViewVue
        },
        {
          path: '/reset-password',
          name: 'ResetPasswordView',
          component: ResetPasswordViewVue
        }
      ]
    },
    {
      path: '/admin/',
      component: DefaultLayoutVue,
      meta: {
        needsAuth: true
      },
      children: [
        {
          path: '/admin',
          name: 'adminView',
          component: AdminViewVue
        },
        {
          path: '/categories-edit',
          name: 'categoriesEditView',
          component: CategoriesEditViewVue
        },
        {
          path: '/categories',
          name: 'categoriesIndexView',
          component: CategoriesIndexViewVue
        },
        {
          path: '/profile',
          name: 'profileView',
          component: ProfileViewVue
        },
        {
          path: '/profile-edit',
          name: 'profileEditView',
          component: ProfileEditViewVue
        },
        {
          path: '/questions-edit',
          name: 'questionsEditView',
          component: QuestionsEditViewVue
        },
        {
          path: '/questions',
          name: 'questionsIndexView',
          component: QuestionsIndexViewVue
        },
        {
          path: '/question',
          name: 'questionsSingleView',
          component: QuestionsSingleViewVue
        },
        {
          path: '/types-edit',
          name: 'typesEditView',
          component: TypesEditViewVue
        },
        {
          path: '/types',
          name: 'typesIndexView',
          component: TypesIndexViewVue
        }
      ]
    },
  ]
});

router.beforeEach((to, from, next) => {
  const getCookie:Array<string> = document.cookie.split('=');
  const xsrfToken = getCookie.filter(x => true)[0]
  
  if(to.meta.needsAuth && xsrfToken != 'XSRF-TOKEN') {
    console.log('to to login');
    next({name: 'login'});
  }

  if(to.meta.public && xsrfToken == 'XSRF-TOKEN') {
    next({name: 'home'});
    console.log('home');
  }
  
  next();

})

export default router
