import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Home from './views/Home';
import Experience from './views/Experience';
import Projects from './views/Projects';
import Covid19 from './views/Covid19';
import Crypto from './views/Crypto';
import Contact from './views/Contact';

const App: FC = () => {
  return (
    <Router>
      <Header />
      <Container className="pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/features/covid-19" element={<Covid19 />} />
          <Route path="/features/crypto" element={<Crypto />} />
          <Route path="/features/crypto/:code" element={<Crypto />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
