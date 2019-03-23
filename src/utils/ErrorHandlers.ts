import swal from 'sweetalert';

export const redirectToHome = (router:any, errorObject:any):void => {
  if(errorObject.response && errorObject.response.status === 401) 
    router.push('/')
}

export const showMessage = (errorObject:any) => {
  if(errorObject.response && errorObject.response.data)
    swal(errorObject.response.data.error)
  }