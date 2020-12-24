import {ADD} from './actionTypes';

export const addCreator = counter => ({
    type: ADD,
    payload: counter
  });