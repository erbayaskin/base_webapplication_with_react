export function storeAuthState(auth){
    localStorage.setItem('auth',JSON.stringify(auth));
}
export function removeAuthState(){
    localStorage.removeItem('auth');
}

export function loadAuthState(){
    const defaultState = null;
    const authStateInStore = localStorage.getItem('auth');
    try{
        if(authStateInStore === null)
            return defaultState;
        return JSON.parse(authStateInStore);
    } catch {
        return defaultState;
    }
}