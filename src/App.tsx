import { useContext, useEffect } from 'react';
import "aos/dist/aos.css";

import AOS from "aos";
import Navbar from './components/navbar/Navbar';
import CompaniesList from "./components/companies_list/CompaniesList";
import Loader from './components/loader/Loader';
import { AppDetailsContext } from "./context";

function App() {
  const { isLoading }: any = useContext(AppDetailsContext);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
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
