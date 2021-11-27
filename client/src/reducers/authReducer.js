export const authReducer = (state, action) => {
	const {type,payload: {isAuthenticated,user,isAdmin}} = action;

	switch(type){
		case 'SET_AUTH':
			return {
				...state,
				authLoading: false,
				isAuthenticated,
				user
			};
		case 'SET_ADMIN':
			return {
				...state,
				isAdmin
			}
		default:
			return state;
	}
}