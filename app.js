const express = require('express');
const client = require("@mailchimp/mailchimp_marketing")

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"));

app.get('/', function (req,res) {
    res.sendFile(__dirname + '/signup.html');
});

    app.post('/', function (req, res){
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;


        client.setConfig({
            apiKey: "e129798316ed6c33f946ba91b4d99973",
            server: "us21",
        });
        const run = async () => {
            try {
                const response = await client.lists.addListMember(
                    "6ccc27f464",
                    {
                        email_address: email,
                        status: "subscribed",
                        merge_fields: {
                            FNAME: firstName,
                            LNAME: lastName,
                        },
                    },
                    {
                        skipMergeValidation: false,
                    }
                );
                console.log(response);
                res.sendFile(__dirname + "/success.html")
            }
            catch (error) {
                console.error(error)
                res.sendFile(__dirname + "/failure.html")
            }

            };
        run();
    });



app.listen(3000, function (){
    console.log('Server started on port 3000')
})
