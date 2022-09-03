import { useContext } from 'react';
import './App.css';

import Navbar from './components/navbar/Navbar';
import CompaniesList from "./components/companies_list/CompaniesList";
import Loader from './components/loader/Loader';
import { AppDetailsContext } from "./context";

function App() {
  const { isLoading }: any = useContext(AppDetailsContext);
  return (
    <div>
      {
        isLoading ? <Loader /> : (
          <>
            <Navbar />
            <CompaniesList />
          </>
        )
      }
    </div>
  );
}

export default App;
