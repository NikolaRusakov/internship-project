import {actions,connectionActions} from "./actions";

const initStore = {
    environments: {},
    connection: {},
    listOfConnections: {},
    instanceDetail: {},
    all: {},
};

const initConnection = {
    currentDaemon: "default",//e9efc872-ddd1-460f-8763-29a3d2f1a347
    daemonName:"default"
    // prestine: true,
    // touched: false
};

export function connectionStore(state =initConnection,action={}) {
switch (action.type){
    case connectionActions.TOGGLE_CONNECTION:{
       return{
           ...state,
           currentDaemon:action.uuid,
           daemonName:action.name
        }
    }
    default:
        return state;
}
}

export function dashStore(state = initStore, action = {}) {
    switch (action.type) {
        case actions.TOUCH_CONNECTION: {
            const {connection} = state;
            return {
                ...state,
                connection: [
                    ...connection,
                    {
                        name: action.add
                    }
                ]
            }
        }
        /*  case actions.TOGGLE_CONNECTION: {
              const {connection} = state;
              return {
                  connection: connection.map((i, index) => {
                      if (index == action.index) {
                          return {
                              ...i,
                          }
                      }
                  })
              }
          }
          */
        case actions.ADD_CONNECTIONS
        : {
            const {listOfConnections} = state;
            return {
                ...state,
                listOfConnections: {
                    ...listOfConnections,
                    ...action.payload
                }
            }

        }

        case actions.ADD_ENVIRONMENTS: {
            const {environments} = state;
            return {
                ...state,
                environments: {
                    ...environments,
                    ...action.payload
                }
            }
        }
        case actions.ADD_ALL: {
            const {all} = state;
            return {
                ...state,
                all: {
                    ...all,
                    ...action.payload
                }
            }
        }
        default:
            return state;
    }
}
