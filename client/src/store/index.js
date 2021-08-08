import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducer/index";
import thunk from "redux-thunk";

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )        
);

export default store;