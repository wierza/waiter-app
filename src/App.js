import { Container } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom';
import Header from "./components/views/Header";
import Footer from "./components/views/Footer";
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import SingleTable from './components/pages/SingleTable';

function App() {
  return (
    <main>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:id" element={<SingleTable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </main>
  );
}

export default App;
