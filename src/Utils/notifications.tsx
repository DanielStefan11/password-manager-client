// Success messages_________________________________________

export const loginSuccess: JSX.Element = <span id="login-success">You have successfully logged in</span>;

export const passwordAddedSuccess: JSX.Element = <span id="add-psw-success">Password was added successfully</span>;

// Error messages____________________________________________

export const emptyInputsError: JSX.Element = <span id="empty-inputs-error">All fields are required</span>;

export const emailNotValid: JSX.Element = <span id="email-not-valid">Email address is not valid</span>;

export const passwordNotValid: JSX.Element = (
   <span id="psw-not-valid">
      Password should contain at least 8 characters, at least one number and one special character
   </span>
);

export const errorOccured: JSX.Element = <span id="error-occured">An error occured</span>;

export const errorFetchFavicon: JSX.Element = <span id="error-fetch-favicon">You did not specify a URL</span>;
