export function getUserDetails() {
    let user = JSON.parse(sessionStorage.getItem('toDoAppUser'));
    return user;
}