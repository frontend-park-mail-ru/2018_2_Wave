import ajax from './ajax';


/*                   apps                   */

async function getAllApps() {
  try {
    const apps = await ajax.GET({
      path: '/apps',
    });
    return { apps };
  } catch (err) {
    return { err };
  }
}

async function getMyApps() {
  try {
    const apps = await ajax.GET({
      path: '/me/apps',
    });
    return { apps: apps.user_apps };
  } catch (err) {
    return { err };
  }
}

async function addApp(name) {
  try {
    return await ajax.POST({
      path: '/me/apps',
      body: { name },
    });
  } catch (err) {
    return { err };
  }
}

async function getApp(name) {
  try {
    const app = await ajax.GET({
      path: `/apps/${name}`,
    });
    return { app };
  } catch (err) {
    return { err };
  }
}

// async function addApp(name) {
//   try {
//     return await ajax.POST({
//       path: '/me/apps',
//       body: { name },
//     });
//   } catch (err) {
//     return { err };
//   }
// }

// /apps GET
// 200 OK {apps:[{name,cover,description,installations,price,year},...]}

// /me/apps POST {name:'<name of app to add to the profile app list>'}
// 401 UNAUTHORIZED
// 200 OK

// /me/apps DELETE {name:'<name of app to delete from the profile app list>'}
// 401 UNAUTHORIZED
// 200 OK

// /apps/popular GET
// 200 OK {apps:[{name,cover,description,installations,price,year},...]}

// /apps/{name} GET
// 200 OK {name,cover,description,installations,price,year}
// 404 NOT FOUND

// /me/apps GET
// 200 OK {name,cover,description,installations,price,year,time_total} !!!!!! <be careful>
// 401 UNAUTHORIZED


/*                  current user                  */

async function register(form) {
  try {
    return await ajax.POST({
      path: '/users',
      body: form,
    });
  } catch (err) {
    return { err };
  }
}

/**  `await getProfile`  returns `{profile}`  OR  `{err}`.  */
async function getProfile() {
  try {
    const profile = await ajax.GET({
      path: '/users/me',
    });
    return { profile };
  } catch (err) {
    return { err };
  }
}

/**  `await getProfile`  returns `{err}` OR  nothing.  */
async function updateProfile(form) {
  try {
    return await ajax.PUT({
      path: '/users/me',
      body: form,
    });
  } catch (err) {
    return { err };
  }
}


/*                      other users                      */

/**  `await getUser`  returns `{user}`  OR  `{err}`.  */
async function getUser(name) {
  try {
    const user = await ajax.GET({
      path: `/users/${name}`,
    });
    return { user };
  } catch (err) {
    return { err };
  }
}

/**  `await getLeaders`  returns `{leaders}`  OR  `{err}`.  */
async function getLeaders(count, page) {
  try {
    const leaders = await ajax.GET({
      path: `/users/leaders?count=${count}&page=${page}`,
    });
    return { leaders };
  } catch (err) {
    return { err };
  }
}


/*                      session                      */

async function login(loginData) {
  try {
    return await ajax.POST({
      path: '/session',
      body: loginData,
    });
  } catch (err) {
    return { err };
  }
}

async function logout() {
  try {
    return await ajax.DELETE({
      path: '/session',
    });
  } catch (err) {
    return { err };
  }
}


export {
  getAllApps,
  getMyApps,
  addApp,
  getApp,

  register,
  getProfile,
  updateProfile,
  getUser,
  getLeaders,

  login,
  logout,
};
