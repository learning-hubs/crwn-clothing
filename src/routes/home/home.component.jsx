import { Outlet } from "react-router-dom";
import Directory from "../../components/directory/directory.component";

const Home = () => {

      return <div>
        {/* Outlet allows us to leverage this pattern matching using nesting structure in order to dynamically change portions of our code based on routes and nested routes */}
        <Outlet/>
        <Directory/>;
      </div>
};

export default Home;