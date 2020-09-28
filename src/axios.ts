import Axios from "axios";

const baseUrl = "";

export const axios = Axios.create({
  baseURL: baseUrl,
});

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

type httpMethodTypes = keyof typeof HTTP_METHODS;

export const JWTKeyname = "jwt";

export const createAxiosRequest = async (
  method: httpMethodTypes,
  url: string,
  data: any,
  type: string
): Promise<any> => {
  const token = await localStorage.getItem(JWTKeyname);
  try {
    const response = await axios({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        data: {
          attributes: data,
          type,
        },
      },
    });

    const responseObject = response.data.data;

    /**
     * when fetching data from database you also have relationships key
     * so overall it looks like this
     * data: {
     *  attributes: {
     *      title: "",
     *      description: "",
     *        ....
     *  },
     *  relationships: {
     *    user: {
     *       data: {
     *         ...
     *       }
     *    }
     *  }
     * }
     *
     * so what we have to do is to like move everything in relationships
     * to exercises, i think i will just do this in the backend, in the next PR
     * lets solve this issue
     */
    // const relationships =
    //   Object.keys(responseObject.relationships).map((relationship) => {
    //     return relationship;
    //   }) || {};
    // console.log(responseObject);
    return {
      ...responseObject.attributes,
      id: responseObject.id,
    };
  } catch (err) {
    // return the statusCode and the message of the error
    // from the error response object.

    return {
      statusCode: err.response.status,
      message: err.response.data.message,
    };
  }
};

class SendApiRequest {
  /**
   * Authentication
   */
  async me() {
    return createAxiosRequest("GET", "/me", null, "user");
  }

  async login(email: string, password: string) {
    return createAxiosRequest(
      "POST",
      "/user/login",
      { email, password },
      "auth"
    );
  }

  async register(email: string, username: string, password: string) {
    return createAxiosRequest(
      "POST",
      "/user/register",
      { email, username, password },
      "user"
    );
  }

  async logout() {
    return createAxiosRequest("GET", "/user/logout", {}, "user");
  }
}

export const fromApi = new SendApiRequest();
