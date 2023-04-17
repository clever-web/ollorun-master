import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// layouts
import DashboardLayout from "../layouts/dashboard";
// components
import LoadingScreen from "../components/LoadingScreen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  
  return (
    <Suspense
      fallback={<LoadingScreen isDashboard={pathname.includes("/dashboard")} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <HomePage />, index: true },
        // { path: 'home', element: <HomePage /> },
        { path: "legal", element: <LegalInfo /> },
        { path: "policy", element: <PrivacyPage /> },
        { path: "cookie", element: <UseofCookiePage /> },
        { path: "about", element: <About /> },
        { path: "advisors", element: <AdvisorsPage /> },
        { path: "events", element: <EventsPage /> },
        { path: "support", element: <ContactPage /> },
        { path: "saveadvisor/*", element: <SaveAdvisorPage /> },
        { path: "savenewevent/*", element: <SaveEventPage /> },
        { path: "signup/client", element: <SignUpClientPage /> },
        { path: "signup/advisor", element: <SignUpAdvisorPage /> },
      ],
    },
    {
      path: "*",
      children: [
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const HomePage = Loadable(lazy(() => import("../pages/HomePage")));
const About = Loadable(lazy(() => import("../pages/About")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
const LegalInfo = Loadable(lazy(() => import("../pages/LegalInfo")));
const PrivacyPage = Loadable(lazy(() => import("../pages/PrivacyPage")));
const UseofCookiePage = Loadable(lazy(() => import("../pages/UseofCookiePage")));
// const CertifiedPartnerPage = Loadable(lazy(() => import("../pages/CertifiedPartnerPage")));
const AdvisorsPage = Loadable(lazy(() => import("../pages/AdvisorsPage")));
const EventsPage = Loadable(lazy(() => import("../pages/EventsPage")));
const ContactPage = Loadable(lazy(() => import("../pages/ContactPage")));
const SaveAdvisorPage = Loadable(lazy(() => import("../pages/SaveAdvisorPage")));
const SaveEventPage = Loadable(lazy(() => import("../pages/SaveEventPage")));
const SignUpClientPage = Loadable(lazy(() => import("../pages/SignUpClientPage")));
const SignUpAdvisorPage = Loadable(lazy(() => import("../pages/SignUpAdvisorPage")));

