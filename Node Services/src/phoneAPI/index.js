const axios = require('axios');

async function validateNb(number) {
    const url = `https://api.apilayer.com/number_verification/validate?number=${number}`;
    const options = {
        headers: {'apikey': "MJkvwEiwRA4ibyXG0AJcmLmZjwWMybwU"}
    }
   
    const response = await axios.get(url,options);
    console.log('ReqSuccess:',response.data);
    let data = response.data;
    if(data.error || data.valid != true){
        throw 'Invalid Number'
    }
    return {
        countryCode: data.country_code,
        countryName: data.country_name,
        operatorName: data.carrier
    }
}

module.exports = validateNb;