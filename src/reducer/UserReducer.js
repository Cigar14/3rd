

export const initialState = null;

export const reducer = (state, action) => {
	console.log(state)
	console.log(action)

	if(action.type === "USER"){
		return action.payload
	}
}