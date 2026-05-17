import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import OlhoVivoPatrol from "./pages/OlhoVivoPatrol";
import OlhoVivoParking from "./pages/OlhoVivoParking";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import Contato from "./pages/Contato";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/olhovivo-patrol"} component={OlhoVivoPatrol} />
      <Route path={"/olhovivo-parking"} component={OlhoVivoParking} />
      <Route path={"/blog"} component={BlogList} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/contato"} component={Contato} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
