import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import {App} from './App.js';
import Home from './components/home/home';
import VideogameDetail from './components/videogameDetail/videogameDetail';
import CreateVideogame from './components/createVideogame/createVideogame';
import PageInicio from './components/pageInicio/pageInicio';

configure({adapter: new Adapter()});

describe('App', () => {
  let store
  const middlewares = []
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  it('El componente PageInicio debe renderizar en la ruta /', () => {
    const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ '/' ]}>
            <App />
          </MemoryRouter>
        </Provider>
    );
      expect(wrapper.find(PageInicio)).toHaveLength(1);
  });
    
});
