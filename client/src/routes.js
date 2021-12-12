import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BoardsPage } from './pages/boards/BoardsPage';
import { CreateBoardPage } from './pages/boards/CreateBoardPage';
import { BoardPage } from './pages/boards/BoardPage';
import { UpdateBoardPage } from './pages/boards/UpdateBoardPage';
import { AuthPage } from './pages/auth/AuthPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { Context } from './index';
import RequireAuth from './privateRoute';
import { AddUser } from './pages/boards/AddUser';
import { CreateListPage } from './pages/lists/CreateListPage';
import { ListPage } from './pages/lists/ListPage';
import { CreateCardPage } from './pages/cards/CreateCardPage';
import { CardPage } from './pages/cards/CardPage';
import { EditComment } from './pages/cards/EditComment';
import { CreateLabelPage } from './pages/labels/CreateLabelPage';
import { UpdateListPage } from './pages/lists/UpdateListPage';
import { UpdateCardPage } from './pages/cards/UpdateCardPage';

export const useRoutes = () => {
  const { store } = useContext(Context);

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        index
        path="/"
        element={
          <RequireAuth>
            <BoardsPage />
          </RequireAuth>
        }
      />
      <Route
        path="b/create"
        element={
          <RequireAuth>
            <CreateBoardPage />
          </RequireAuth>
        }
      />
      <Route
        path="b/:id"
        element={
          <RequireAuth>
            <BoardPage />
          </RequireAuth>
        }
      />
      <Route
        path="b/update/:id"
        element={
          <RequireAuth>
            <UpdateBoardPage />
          </RequireAuth>
        }
      />
      <Route
        path="b/:id/user"
        element={
          <RequireAuth>
            <AddUser />
          </RequireAuth>
        }
      />
      <Route
        path="b/:id/l/create"
        element={
          <RequireAuth>
            <CreateListPage />
          </RequireAuth>
        }
      />
      <Route
        path="b/:boardId/l/:id"
        element={
          <RequireAuth>
            <ListPage />
          </RequireAuth>
        }
      />
      <Route
        path="b/:boardId/l/update/:id"
        element={
          <RequireAuth>
            <UpdateListPage />
          </RequireAuth>
        }
      />
      <Route
        path="b/:boardId/l/:id/c/create"
        element={
          <RequireAuth>
            <CreateCardPage />
          </RequireAuth>
        }
      />
      <Route
        path="b/:boardId/l/:listId/c/update/:id"
        element={
          <RequireAuth>
            <UpdateCardPage />
          </RequireAuth>
        }
      />
      <Route
        path="b/:boardId/l/:listId/c/:id"
        element={
          <RequireAuth>
            <CardPage />
          </RequireAuth>
        }
      />
      <Route
        path="b/:boardId/l/:listId/c/:cardId/comments/edit/:id"
        element={
          <RequireAuth>
            <EditComment />
          </RequireAuth>
        }
      />
      <Route
        path="b/:boardId/l/:listId/c/:id/labels"
        element={
          <RequireAuth>
            <CreateLabelPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
};
