import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import Layout from "./components/Layout";
import AddMemory from "./pages/AddMemory";
import Memories from "./pages/Memories";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import { store } from "./features/memories/store";
import { theme } from "./theme";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import TestPlaygroundHome from "./testing-playground/TestPlaygroundHome";
import Counter from "./testing-playground/basic/counter/Counter";
import ToggleButton from "./testing-playground/basic/toggle/ToggleButton";
import UserForm from "./testing-playground/intermediate/forms/UserForm";
import RoleBasedPanel from "./testing-playground/intermediate/conditional-rendering/RoleBasedPanel";
import SearchBox from "./testing-playground/intermediate/useeffect/SearchBox";
import UsersPage from "./testing-playground/redux-toolkit-query/pages/UsersPage";
import { InteractionType } from "@azure/msal-browser";
import GraphProfile from "./pages/GraphProfile";
import { loginRequest } from "./auth/authConfig";
function App() {
  const { instance, accounts } = useMsal();
  console.log("instance", instance);
  console.log("accounts", accounts);

  return (
    <MsalAuthenticationTemplate
      authenticationRequest={loginRequest}
      interactionType={InteractionType.Redirect}
    >
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/add-memory" element={<AddMemory />} />
                  <Route path="/memories" element={<Memories />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/graph" element={<GraphProfile />} />

                  {/* Testing Playground Routes */}
                  <Route
                    path="/test-playground"
                    element={<TestPlaygroundHome />}
                  />
                  <Route
                    path="/test-playground/counter"
                    element={<Counter />}
                  />
                  <Route
                    path="/test-playground/toggle"
                    element={<ToggleButton />}
                  />
                  <Route path="/test-playground/form" element={<UserForm />} />
                  <Route
                    path="/test-playground/role"
                    element={<RoleBasedPanel role="user" />}
                  />
                  <Route
                    path="/test-playground/search"
                    element={<SearchBox />}
                  />
                  <Route
                    path="/test-playground/rtk-query"
                    element={<UsersPage />}
                  />
                </Routes>
              </Layout>
            </Router>
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </MsalAuthenticationTemplate>
  );
}

export default App;
