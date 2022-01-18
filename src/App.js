
import './App.css';
import Footer from './Layouts/Footer';
import Dashboard from './Layouts/Dashboard';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
      <Container className="main">
        <Dashboard/>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
