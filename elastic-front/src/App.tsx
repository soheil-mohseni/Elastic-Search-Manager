import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyledComponents } from "./global/global_style/GlobalStyledComponents";
import Sidebar from "./global/sidebar";
import Routers from "./routes/index";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <GlobalStyledComponents />
      {/* whole container */}
      <div className="w-[100%] h-[100vh] flex flex-row justify-start items-start relative">
        {/* Sidebar with higher z-index */}
        <Sidebar  />
        
        {/* Main content with lower z-index */}
        <div style={{ zIndex: 1, position: 'relative' }} className="w-full h-[100vh] bg-[#2312]">
          <Routers />
        </div>
      </div>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
