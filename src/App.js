import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import ContactManger from "./Pages/ContactManager";

function App(props) {
  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <ContactManger />
        <Header />
      </div>
    </div>
  );
}

export default App;
