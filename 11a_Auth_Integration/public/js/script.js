import { createAuth0Client } from "https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.esm.js";

let auth0Client = null;

const fetchAuthConfig = () => fetch("/auth_config.json");

const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();
  
    auth0Client = await createAuth0Client({
      domain: config.domain,
      clientId: config.clientId
    });
};

window.onload = async () => {
    await configureClient();
  
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {

      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/");
    }
  
    updateUI();
  };

const updateUI = async () => {
    const isAuthenticated = await auth0Client.isAuthenticated();
  
    document.getElementById("btn-logout").disabled = !isAuthenticated;
    document.getElementById("btn-login").disabled = isAuthenticated;

    if(isAuthenticated) {
        const user = await auth0Client.getUser();
        document.getElementById("user").innerText = JSON.stringify(user, null, 2);

    }
};
/*
const login = async () => {
    await auth0Client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    });
};
*/

const login = async () => {
  try {
    await auth0Client.loginWithPopup();
    updateUI();
  } catch (error) {
    console.error("Login failed", error);
  }
}

const logout = () => {
    auth0Client.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
};

document.getElementById("btn-login").addEventListener("click", login);
document.getElementById("btn-logout").addEventListener("click", logout);