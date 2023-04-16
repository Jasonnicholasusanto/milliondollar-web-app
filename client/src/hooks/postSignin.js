import axios from "axios";

export const postSignIn = async (email, password, setToken, setUser) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/auth/local", 
        {
            identifier: email,
            password: password,
        },
        {
          baseURL: process.env.REACT_APP_API_URL,
          headers: {
              Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
          },
        }).then(response => {
          // Handle success.
          setToken(response.data.jwt);
          setUser(response.data.user);
        })
    } catch (error) {
      console.error(error);
    }
  };