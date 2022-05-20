type dataOptions = '' | 'nome' | 'anos' | 'email';

export const UserOptions = (data: dataOptions) => {
   let returnObject = {
      nome: false,
      anos: false,
      email: false
   };

   if (data !== '') {
      console.log(data);
      returnObject[data] = true;
   }

   return returnObject;
}