const callAPIMiddleware = ({ dispatch, getState }) => next => async action => {
    const { before = [], onSuccess = [], onFailure = [], callAPI, shouldCallAPI = () => true, payload = {} } = action

    if (!callAPI) {
        // Normal action: pass it on
        return next(action)
    }
    validateParameters(callAPI, before, onSuccess, onFailure)

    if (!shouldCallAPI(getState())) {
        return
    }

    dispatchActions(dispatch, before, payload)
    try {
        const response = await callAPI()
        dispatchActions(dispatch, onSuccess, { ...payload, ...response })
    } catch (e) {
        dispatchActions(dispatch, onFailure, { ...payload, ...e })
    }
}

const dispatchActions = (dispatch, types, payload) => types.map((type => dispatch({ ...payload, type })))

function validateParameters(callAPI, before, onSuccess, onFailure) {
    if (typeof callAPI !== 'function') {
        throw new Error('Expected callAPI to be a function.')
    }

    [before, onSuccess, onFailure].map((types => {
        if (!Array.isArray(types) ||
            !types.every(type => typeof type === 'string')) {
            throw new Error('Expected an array of three string types.')
        }
    }))
}


export default callAPIMiddleware;