export const courseReducer = (state, action) => {
	const {type,payload} = action;

	switch(type){
		case 'COURSES_LOADED_SUCCESS':
			return {
				...state,
				courseLoading: false,
				courses: payload
			};
		case 'COURSES_LOADED_FAIL':
			return {
				...state,
				courseLoading: true,
				courses: []
			};
		default:
			return state;
	}
}