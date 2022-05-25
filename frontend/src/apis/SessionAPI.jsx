import axios from "axios";

class SessionAPI {
  static Login = async (payload) => {
    try {
      console.log(`Posting to : ${axios.defaults.baseURL}/api/signin`);
      const result = await axios({
        method: "POST",
        url: "api/signin",
        data: payload,
      });

      return result.data;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  static Register = async (payload) => {
    try {
      console.log(`Posting to : ${axios.defaults.baseURL}/api/signup`);
      const result = await axios({
        method: "POST",
        url: "api/signup",
        data: payload,
      });

      return result.resMessage === "Success" || false;
    } catch (error) {
      console.log(error.message);
    }
  };

  static Logout = async (token) => {
    try {
      console.log(`Posting to : ${axios.defaults.baseURL}/api/signout`);
      const result = await axios({
        method: "POST",
        url: "api/signout",
        headers: { token: token },
      });

      return result.data;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
}

export default SessionAPI;
