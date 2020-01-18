const request = require("request");

const base_url = "http://localhost:8081/api/"

describe("Simple Test", () => {

	const data = {};

	beforeAll( async (done) => {
		const invoice = {
      net: 5.5,
      date: '2020-02-10',
      tax: 21.00,
      total: 10,
      invoiceNumber: 1
    }

    const resource = "invoice";
    const options = {
      method: 'POST',
      uri: base_url+resource,
      headers: {
        "content-type": "application/json"
        },
      body: JSON.stringify({invoice})
    };

    const response = await asyncRequest(options);
    data.payload = response.data;
    data.status = response.response.statusCode;
    done();
	});
  
  it("GET /invoice returns status code 200", async (done) => {
    const resource = "invoice";
    const options = {
      method: 'GET',
      uri: base_url+resource
    };
    const response = await asyncRequest(options);
    expect(response.response.statusCode).toBe(200);  
		done();
  });

  it("Find By Id /invoice returns status code 200", async (done) => {
    const resource = "invoice";
    const options = {
      method: 'GET',
      uri: base_url + resource + '/' + data.payload.id
    };
    const response = await asyncRequest(options);
    expect(response.response.statusCode).toBe(200);  
    done();
    
  });

  it("DELETE /invoice returns status code 200", async (done) => {
		const resource = "invoice";
    const options = {
      method: 'DELETE',
      uri: base_url + resource + '/' + data.payload.id
    };
    const response = await asyncRequest(options);
    expect(response.response.statusCode).toBe(200);  
    done();
  });
  
});

const asyncRequest = async (value) => 
    new Promise((resolve, reject) => {
        request(value, (error, response, data) => {
            if(error) reject(error)
            else resolve({response, data: JSON.parse(data)})
        })
    })