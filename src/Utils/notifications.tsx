// Success messages_________________________________________

export const loginSuccess: JSX.Element = <span id="login-success">You have successfully logged in</span>;

export const passwordAddedSuccess: JSX.Element = <span id="add-psw-success">Password was added successfully</span>;

export const passwordEditedSuccess: JSX.Element = <span id="edit-psw-success">Password was edited successfully</span>;

export const passwordDeletedSuccess: JSX.Element = (
   <span id="delete-psw-success">Password was deleted successfully</span>
);

export const noteDeletedSuccess: JSX.Element = <span id="delete-note-success">Note was deleted successfully</span>;

export const noteEditedSuccess: JSX.Element = <span id="edit-note-success">Note was edited successfully</span>;

// Error messages____________________________________________

export const emptyInputsError: JSX.Element = <span id="empty-inputs-error">Some fields are empty</span>;

export const emailNotValid: JSX.Element = <span id="email-not-valid">Email address is not valid</span>;

export const passwordNotValid: JSX.Element = (
   <span id="psw-not-valid">
      Password should contain at least 8 characters, at least one number and one special character
   </span>
);

export const errorOccured: JSX.Element = <span id="error-occured">An error occured</span>;

export const errorFetchFavicon: JSX.Element = <span id="error-fetch-favicon">You did not specify a URL</span>;
