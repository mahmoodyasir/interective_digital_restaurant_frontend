export const domain = "http://localhost:8000";

export const userToken = window.localStorage.getItem("token")
export const adminToken = window.localStorage.getItem("admin_token")

export const header = {
    Authorization: `token ${userToken}`
}

export const admin_header = {
    Authorization: `token ${adminToken}`
}