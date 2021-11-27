export const userReducer = (state, action) => {
	const {type,payload: {userProfile, courses}} = action;

	switch(type){
		case 'USER_PROFILE_LOADED_SUCCESS':
			return {
				...state,
				userLoading: false,
				userProfile: userProfile
			};
		case 'USER_PROFILE_LOADED_FAIL':
			return {
				...state,
				userLoading: true,
				userProfile: null,
				courses: []
			};
		case 'USER_COURSES_LOADED_SUCCESS':
			return {
				...state,
				courses: courses
			};
		case 'USER_COURSES_LOADED_FAIL':
			return {
				...state,
				courses: []
			};
		default:
			return state;
	}
}