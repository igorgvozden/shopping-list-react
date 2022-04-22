const httpRequest = (urlEndPoint, method, formData, requestHandler, requestCallback) => {
    const config = {
        url: `http://localhost:3000/${urlEndPoint}`,
        method,
        headers: {
            'Access-Control-Allow-Credentials': true,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: formData
    };

    requestHandler(config, () => requestCallback());
};

export default httpRequest;