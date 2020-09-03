import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get companies. Companies can be filtered by a search term. */

  static async getCompanies(searchTerm) {

    let params = searchTerm === '' ? {} : {'name': searchTerm}
   
    let res = await this.request(`companies`, params );
    return res.companies;
  }

  /** Get jobs. Jobs can be filtered by title. */
  static async getJobs(searchTerm) {

    let params = searchTerm === '' ? {} : {'title': searchTerm}
   
    let res = await this.request(`jobs`, params );
    return res.jobs;
  }

  /**Handle Login */
  static async requestLogin(username, password){
    
    let res = await this.request('auth/token', {username, password}, 'post')
    this.token = res.token
    return res.token
  }

  /** Handle register */
  static async requestRegister(username, password, firstName, lastName, email) {

    let res = await this.request('auth/register', {username, password, firstName, lastName, email}, 'post');
    this.token = res.token
    return res.token
  }

  /** Get user */
  static async getUser(token, username){

    let res = await this.request(`users/${username}`, {token})
    return res.user
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;