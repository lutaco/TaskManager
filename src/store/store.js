import { createStore } from 'redux';
import reducer from './reducer';

const initialState = {
    stages: []
};

const store = createStore(reducer, initialState);

export default store;