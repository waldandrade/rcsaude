import { KittenApp } from '../components/NavApp';

const initialState = KittenApp.router.getStateForAction(KittenApp.router.getActionForPathAndParams('Home'));

const navReducer = (state = initialState, action) => {
  const nextState = KittenApp.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export default navReducer;
