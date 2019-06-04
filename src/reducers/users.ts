
const INITIAL_STATE = {
  value: '',
  foucus: false
}

export default function SearchBar(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'setValue':
      return { ...state }
    default:
      return state
  }
}