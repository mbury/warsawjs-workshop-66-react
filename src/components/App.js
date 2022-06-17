import PageContent from './PageContent';
import NavBar from './NavBar';
import { GlobalStateProvider } from '../commons/globalState';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <GlobalStateProvider>
          <NavBar />
          <PageContent />
        </GlobalStateProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
