export const actions = {
    ADD_CONNECTIONS: 'ADD_CONNECTIONS',
    ADD_CONNECTION: 'ADD_CONNECTION',
    ADD_ENVIRONMENTS: 'ADD_ENVIRONMENTS',
    ADD_ALL: 'ADD_ALL',
    DETAIL: 'DETAIL',
}
export const connectionActions={
    TOGGLE_CONNECTION: 'TOGGLE_CONNECTION',
};
export function connectionAdd(add) {
    return {
        type: actions.TOUCH_CONNECTION,
        add
    }
}

export function connectionToggle(uuid,name) {
    return {
        type: connectionActions.TOGGLE_CONNECTION,
        uuid,
        name
    }
}

export function connectionsAdd(payload) {
    return {
        type: actions.ADD_CONNECTIONS,
        payload
    }
}

export function environmentsAdd(payload) {
    return {
        type: actions.ADD_ENVIRONMENTS,
        payload
    }
}

export function allAdd(payload) {
    return {
        type: actions.ADD_ALL,
        payload
    }
}export function detail(detail) {
    return {
        type: actions.DETAIL,
        detail
    }
}