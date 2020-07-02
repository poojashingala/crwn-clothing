import React from 'react';
import Spinner from '../spinner/spinner.components';

const WithSpinner = WrappedComponent =>  ({ isLoading, ...otherProps }) => {
    return isLoading ? <Spinner /> : <WrappedComponent { ...otherProps } />
};

//Another way to write HOC.
// const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
//     return isLoading ? 
//     (<SpinnerOverlay>
//         <SpinnerContainer />
//     </SpinnerOverlay>) :
//     <WrappedComponent { ...otherProps } />
// }

export default WithSpinner;