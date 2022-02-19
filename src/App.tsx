import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Favorites from './components/Favorites';

import BaseRouteDictionary from './routes';
import Home from './views/Home';
import Experience from './views/Experience';
import Projects from './views/Projects';
import Contact from './views/Contact';

import Covid19RouteDictionary from './features/covid19/routes';
import Covid19 from './features/covid19/views';

import CryptoRouteDictionary from './features/crypto/routes';
import Crypto from './features/crypto/views';

import MoviesRouteDictionary from './features/movies/routes';
import Movies from './features/movies/views';

const App: FC = () => (
  <RecoilRoot>
    <Router>
      <div className="sticky-top">
        <Header />
        <Favorites />
      </div>
      <Container className="pb-5">
        <Routes>
          <Route path={BaseRouteDictionary.Index} element={<Home />} />
          <Route path={BaseRouteDictionary.Experience} element={<Experience />} />
          <Route path={BaseRouteDictionary.Projects} element={<Projects />} />
          <Route path={BaseRouteDictionary.Contact} element={<Contact />} />

          <Route path={Covid19RouteDictionary.Index} element={<Covid19 />} />
          <Route path={Covid19RouteDictionary.Detail} element={<Covid19 />} />

          <Route path={CryptoRouteDictionary.Index} element={<Crypto />} />
          <Route path={CryptoRouteDictionary.Detail} element={<Crypto />} />

          <Route path={MoviesRouteDictionary.Index} element={<Movies />} />
          <Route path={MoviesRouteDictionary.Detail} element={<Movies />} />
        </Routes>
      </Container>
    </Router>
  </RecoilRoot>
);

export default App;
