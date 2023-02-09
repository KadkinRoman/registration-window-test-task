export const registerRequest = async(user) => {
    const url = "https://lmstestapi.reezonly.com/v1/user/signup";


    const formData = new FormData();
    formData.append('public ', Number(user.public));
    formData.append('username', user.name);
    formData.append('role', user.role);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('password_repeat', user.password_repeat);
    formData.append('photo', user.photo);

    return fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json());
}