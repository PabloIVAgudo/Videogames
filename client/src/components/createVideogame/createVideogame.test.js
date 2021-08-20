import React from 'react';
import { configure, mount } from 'enzyme';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CreateVideogame from './createVideogame';
import store from '../../store/index';

configure({adapter: new Adapter()});

describe('<CreateVideogame />',() => {

  describe('Estructura', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
          <Provider store={store}>
              <BrowserRouter>
                <CreateVideogame /> 
              </BrowserRouter>            
          </Provider>      
      );
    })
    it('Renderiza un <form>', () => {
      expect(wrapper.find('form')).toHaveLength(1)
    })

    it('Renderiza un label con el texto igual a "Name"', () => {
      expect(wrapper.find('label').at(0).text()).toEqual('Name');
    })

    it('Renderiza un input con la propiedad "name" igual a "name"', () => {
      expect(wrapper.find('input[name="name"]')).toHaveLength(1);
    })

    it('Renderiza un label con el texto igual a "Description"', () => {
      expect(wrapper.find('label').at(1).text()).toEqual('Description');
    })

    it('Renderiza un input con la propiedad "name" igual a "description"', () => {
      expect(wrapper.find('input[name="description"]')).toHaveLength(1);
    })

    it('Renderiza un label con el texto igual a "Release date"', () => {
      expect(wrapper.find('label').at(2).text()).toEqual('Release date');
    })

    it('Renderiza un input con la propiedad "name" igual a "releaseDate"', () => {
      expect(wrapper.find('input[name="releaseDate"]')).toHaveLength(1);
    })

    it('Renderiza un label con el texto igual a "Rating"', () => {
      expect(wrapper.find('label').at(3).text()).toEqual('Rating');
    })

    it('Renderiza un input con la propiedad "name" igual a "rating"', () => {
      expect(wrapper.find('input[name="rating"]')).toHaveLength(1);
    })   
    
    it('Renderiza un label con el texto igual a "Add platforms: "', () => {
        expect(wrapper.find('label').at(4).text()).toEqual('Add platforms: ');
    })

    it('Renderiza un label con el texto igual a "Add genres: "', () => {
        expect(wrapper.find('label').at(5).text()).toEqual('Add genres: ');
    })

    it('Renderiza un button con el texto igual a "Clear inputs"', () => {
        expect(wrapper.find('button').at(2).text()).toEqual('Clear inputs');
    })

    it('Renderiza un input con el "type" "submit"', () => {
        expect(wrapper.find('input[type="submit"]')).toHaveLength(1);
      })
  })

  describe('Manejo de inputs con estado', () => {
    let wrapper, useState, useStateSpy;
    beforeEach(() => {
        useState = jest.fn();
        useStateSpy = jest.spyOn(React, 'useState')
        useStateSpy.mockImplementation((init) => [init, useState]);
        wrapper = mount(
            <Provider store={store}>
                <BrowserRouter>
                  <CreateVideogame /> 
                </BrowserRouter>            
            </Provider>      
        );
    });

    describe("Name input", () => {

      it('El form deberia cambiar de estado cuando escriban en el input de "Name"', () => {
        wrapper.find('input[name="name"]').simulate('change', {target: {name: 'name', value: 'My new value'}});
        expect(useState).toHaveBeenCalledWith({"name": "My new value", "description": "", "releaseDate": "", "rating": 0.00, "platforms": [], "genres": []});
      });
    });

    describe("Description input", () => {
      it('deberia cambiar de estado cuando escriban en el input de "Description"', () => {
        wrapper.find('input[name="description"]').simulate('change', {target: {name: 'description', value: 'salir a escuchar musica'}});
        expect(useState).toHaveBeenCalledWith({"name": "", "description": "salir a escuchar musica", "releaseDate": "", "rating": 0.00, "platforms": [], "genres": []});
      });
    });

    describe("Release date input", () => {
      it('deberia cambiar de estado cuando escriban en el input de "Release date"', () => {
        wrapper.find('input[name="releaseDate"]').simulate('change', {target: {name: 'releaseDate', value: '2021-12-20'}});
        expect(useState).toHaveBeenCalledWith({"name": "", "description": "", "releaseDate": "2021-12-20", "rating": 0.00, "platforms": [], "genres": []});
      });
    });
    
    describe("Rating input", () => {
        it('deberia cambiar de estado cuando escriban en el input de "Rating"', () => {
          wrapper.find('input[name="rating"]').simulate('change', {target: {name: 'rating', value: 4.56}});
          expect(useState).toHaveBeenCalledWith({"name": "", "description": "", "releaseDate": "", "rating": 4.56, "platforms": [], "genres": []});
        });
    });    
  });
});