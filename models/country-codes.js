var mongoose = require('mongoose')

const CountryCodesSchema = mongoose.Schema({
        name: {
            type: String,
            required: false,
        },
        dial_code: {
            type: String,
            required: false,
        },
        code: {
            type: String,
            required: false,
        },
    },
    {
        timeStamps: true,
        collection: 'country_codes'
    });   

CountryCodesSchema.statics.getCountryCodes = function (codes, cb) {
    var country = this;

    //get name of country
    country.find({},'-_id -code', (err, country) => {
        if (err) return cb(err);
        cb(null, country);
    })

}

module.exports = mongoose.model('CountryCodes', CountryCodesSchema)