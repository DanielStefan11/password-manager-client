export const getJWT = sessionStorage.getItem("jwt");

export const headersObject = {
   headers: {
      Authorization: "Bearer " + getJWT,
   },
};
