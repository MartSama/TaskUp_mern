import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import NewPassword from "./pages/NewPassword"
import ConfirmAccount from "./pages/ConfirmAccount"
import { AuthProvider } from "./context/AuthProvider"
import Projects from "./pages/Projects"
import ProtectedRoute from "./layout/ProtectedRoute"
import NewProject from "./pages/NewProject"
import EditProject from "./pages/EditProject"
import NewCollaborator from "./pages/NewCollaborator"
import { ProjectProvider } from "./context/ProjectProvider"
import Project from "./pages/Project"
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="forgot-password/:token" element={<NewPassword />} />
            <Route path="confirm-account/:token" element={<ConfirmAccount />} />
          </Route>

          <Route path="/projects" element={<ProtectedRoute />}>
            <Route index element={<Projects />} />
              <Route path="new-project" element={<NewProject />} />
              <Route path=":id" element={<Project />} />
              <Route path="edit/:id" element={<EditProject />} />
              <Route path="collaborators/:id" element={<NewCollaborator />} />
          </Route>
        </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
