// Success messages_________________________________________

export const loginSuccess: JSX.Element = <span id="login-success">You have successfully logged in</span>;

// Error messages____________________________________________

export const emptyInputsError: JSX.Element = <span id="empty-inputs-error">All fields are required</span>;

export const emailNotValid: JSX.Element = <span id="email-not-valid">Email address is not valid</span>;

export const passwordNotValid: JSX.Element = (
   <span id="psw-not-valid">
      Password should contain at least 8 characters, at least one number and one special character
   </span>
);

export const errorOccured: JSX.Element = <span id="error-occured">An error occured</span>;
