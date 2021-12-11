import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Favorites from './components/Favorites';
import Home from './views/Home';
import Experience from './views/Experience';
import Projects from './views/Projects';
import Covid19 from './views/Covid19';
import Crypto from './views/Crypto';
import Contact from './views/Contact';

import MoviesRouteDictionary from './features/movies/routes';
import Movies from './features/movies/views/Movies';

const App: FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <div className="sticky-top">
          <Header />
          <Favorites />
        </div>
        <Container className="pb-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/features/covid-19" element={<Covid19 />} />
            <Route path="/features/covid-19/:country" element={<Covid19 />} />
            <Route path="/features/crypto" element={<Crypto />} />
            <Route path="/features/crypto/:code" element={<Crypto />} />

            <Route path={MoviesRouteDictionary.Index} element={<Movies />} />
            <Route path={MoviesRouteDictionary.Detail} element={<Movies />} />
          </Routes>
        </Container>
      </Router>
    </RecoilRoot>
  );
};

export default App;
