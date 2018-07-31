//let serverURL = "http://localhost:4000/";
const basePath = serverContextPath + "/api/connections/";
const connection = serverContextPath + "/api/connections";

export function connections(basePath) {
    return responsr(fetch(basePath + "default/get-all"));

}
export function responsr(fetchCallback) {
    return fetchCallback.then(function (response) {
        if (response.ok) {
            return response.text().then(function(text) {
                // console.log(text);
                return text ? JSON.parse(text) : null
            });
        }


        return response.json().then((error) => {console.log(error);return Promise.reject()});


    }).catch(function (error) {
        console.error(error);
        return Promise.reject();
    })
}

export function postConnection(data){
    // return responsr(fetch("localhost:4000/api/connections/tls/" , {method: 'POST'}));
    // return responsr(fetch("localhost:4000/api/connections/default/tls/" , {
    //     mode: 'no-cors',
    //     method: "POST",
    //     body: data
    // }).then(function (res) {
    //     if (res.ok) {
    //         console.info("Perfect! ");
    //     } else if (res.status == 401) {
    //         console.info("Oops! ");
    //     }
    // }, function (e) {
    //     alert("Error submitting form!");
    // }));
    //
    return responsr(fetch(basePath+"/default/tls/" , {
        mode: 'no-cors',
        method: "POST",
        body: data
    }));
}
export function getAll(daemon) {
    return responsr(fetch(basePath + `${daemon}/get-all`));
}

export function environment(daemon) {
    return responsr(fetch(basePath + `${daemon}/environment`));//e9efc872-ddd1-460f-8763-29a3d2f1a347

}export function instanceGet(daemon,id) {
    return responsr(fetch(basePath + `${daemon}/instance/${id}`));
}
export function getConnections() {
    return responsr(fetch(connection ));
}

/*
export function environment(id){
    return responsr(fetch(basePath + "environment/" + id));
}
*/

export function environmentDelete(daemon,id){
    return responsr(fetch(basePath + `${daemon}/environment/${id}`, {method: 'DELETE'}));
}

export function environmentStop(daemon,id){
    return responsr(fetch(basePath + `${daemon}/environment/${id}/stop`, {method: 'POST'}));
}

export function environmentStart(daemon,id){
    return responsr(fetch(basePath + `${daemon}/environment/${id}/start`, {method: 'POST'}));
}

export function environmentRestart(daemon,id){
    return responsr(fetch(basePath + `${daemon}/environment/${id}/restart`, {method: 'POST'}));
}

export function instance(daemon,id){
    return responsr(fetch(basePath + `${daemon}/instance/${id}`));
}
export function instanceDelete(daemon,id){
    return responsr(fetch(basePath + `${daemon}/instance/${id}`, {method: 'DELETE'}));
}

export function instanceStop(daemon,id){
    return responsr(fetch(basePath + `${daemon}/instance/${id}/stop`, {method: 'POST'}));
}

export function instanceStart(daemon,id){
    return responsr(fetch(basePath + `${daemon}/instance/${id}/start`, {method: 'POST'}));
}

export function instanceRestart(daemon,id){
    return responsr(fetch(basePath + `${daemon}/instance/${id}/restart`, {method: 'POST'}));
}

