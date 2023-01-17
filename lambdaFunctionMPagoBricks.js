import mercadopago from "mercadopago";

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
});



export const handler = async (event) => {
    let headers = {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers" : "*"
        }
    let response = {}
    try{
        const {body} =  await mercadopago.payment.save(JSON.parse(event.body));
        const { status, status_detail, id } = body;
        response = {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({
                    statusCode: 200,
                    ok:true,
                    message: {
                        "status": status,
                        "status_detail" : status_detail,
                        "id": id
                    },
                }),
        };
    }catch(e){
        response = {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify({
                    statusCode: 400,
                    ok:false,
                    error: 'Client Error',
                    internalError: e.message,
                }),
        };
        return response;
    };

    return response;
};
