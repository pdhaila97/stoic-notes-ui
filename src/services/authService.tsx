export function setUser(user: any): void {
    localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
    const user = localStorage.getItem("user");
    if(user) {
        return JSON.parse(user);
    }
}

export function isUserAuthenticated() {
    const user = getUser();
    return user && true;
}

export function getUserToken() {
    const user = getUser();
    if(user) {
        return user.token;
    }
}

export function clearUser() {
    localStorage.removeItem("user");
}