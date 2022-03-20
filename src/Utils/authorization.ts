export const getJWT = localStorage.getItem("jwt");

export const headersObject = {
   headers: {
      Authorization: "Bearer " + getJWT,
   },
};
