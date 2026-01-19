import ProtectedRoute from '@/src/Components/layout/ProtectedRoute';
import AdminPage from './Pages/AdminPage';
import ErrorPage from './Pages/ErrorPage';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import MembersPage from './Pages/MembersPage/MembersPage';
import MyPage from './Pages/MyPage';
import NoticeDetailPage from './Pages/NoticeDetailPage';
import NoticePage from './Pages/NoticePage';
import ProjectDetailPage from './Pages/ProjectDetailPage';
import ProjectPage from './Pages/ProjectPage';
import ProjectUploadPage from './Pages/ProjectUploadPage';
import RecruitPage from './Pages/RecruitPage/RecruitPage';
import { TestPopup } from './Pages/TestPopup';

const routes = [
  {
    element: <MainPage />,
    path: '/',
  },
  {
    element: <LoginPage />,
    path: '/login',
  },
  {
    element: <ProjectPage />,
    path: '/project',
  },
  {
    element: <ProjectUploadPage />,
    path: '/project/edit',
  },
  {
    element: <ProjectDetailPage />,
    path: '/project/:id',
  },
  {
    element: <MembersPage />,
    path: '/members',
  },
  {
    element: <RecruitPage />,
    path: '/recruit',
  },
  {
    element: <MyPage />,
    path: '/mypage',
  },
  {
    element: <AdminPage />,
    path: '/admin',
  },
  {
    element: <NoticePage />,
    path: '/notice',
  },
  {
    element: <NoticeDetailPage />,
    path: '/notice/:id',
  },
  {
    element: (
      <ProtectedRoute>
        <TestPopup />
      </ProtectedRoute>
    ),
    path: '/test',
  },
  {
    element: <ErrorPage />,
    path: '/*',
  },
];

export default routes;
