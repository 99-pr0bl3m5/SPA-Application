import axios from "axios";

class SessionAPI {
  static Login = async (payload) => {
    try {
      const result = await axios({
        method: "POST",
        url: "api/Session/login",
        data: payload,
      });
      //useUser
      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  static Register = async (payload) => {
    try {
      const result = await axios({
        method: "POST",
        url: "api/Session/register",
        data: payload,
      });

      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  };
}

export default SessionAPI;
