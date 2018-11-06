import ajax from './ajax';


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
  register,
  getProfile,
  updateProfile,
  getUser,
  getLeaders,
  login,
  logout,
};
