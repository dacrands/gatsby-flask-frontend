// export const getUser = () => {
//     window.localStorage.user
//     ? JSON.parse(window.localStorage.gatsbyUser)
//     : {}
// }

export const setUser = user => {
    window.localStorage.user = JSON.stringify(user)
    return
}

