export const error = (state = {}, {type, error}) => {
  switch(type){
    case 'EADDRNOTAVAIL':
      return error;
    case 'ENOENT':
      return error;
    default:
      return state;
}

export const network = (state = {}, {type, status, error}) => {
  switch(type){
    case 'NETWORK':
      return status;
    default:
      return state;
  }
}


export const accounts = (state = {}, {type, accounts}) => {
  switch(type){
    case 'ACCOUNTS':
      return accounts;
    default:
      return state;
  }
}
