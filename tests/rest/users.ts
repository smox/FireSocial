import mongoose from "mongoose";
import dotenv from "dotenv";

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import User, { IUser } from "../../src/models/User";
import bcrypt from "bcrypt";
import { MongoError } from "mongodb";

chai.use(chaiHttp);

describe('Tests user REST API', () => { // the tests container

    let user: IUser | undefined;

    beforeEach((done) => {
        try {
            
            /*
            dotenv.config();
            const mongoUrl = process?.env?.MONGO_URL;

            if(mongoUrl) {
                mongoose.connect(mongoUrl,  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err: MongoError) => {
                    if(err) {
                        console.log('Unable to connect to the server. Please start the server. Error:', err);
                    } else {
                        console.log("Connected to MongoDB");
                        bcrypt.genSalt(10, (err, salt) => {
                            console.log(`Salt ${salt} generated`);
                            bcrypt.hash("12345678", salt, (err, encrypted) => {
                                console.log(`Hash ${encrypted} generated`);
                                const newUser = new User({
                                    username: "testuser1",
                                    email: "testuser1@sm0x.org",
                                    password: encrypted
                                });
                                newUser?._id && console.log(`User ${newUser?._id} created`);
                                newUser?.save((err, doc) => {
                                    if(err) {
                                        console.log(err);
                                    } else {
                                        user = doc;
                                        done();
                                    }
                                });
                            });
                        });
                    }
                });
            } else {
                throw new Error("No URL to MongoDB are provided! Please use ENV MONGO_URL to provide a connection string");
            } */
            chai.request()

        } catch (err) {
            console.log(err);
        }
    });

    it('User created to prepare test', () => {
        expect(user).to.be.not.undefined;
        expect(user?._id).to.be.exist
    });

    it('Registers a new user', () => { // the single test
       

        expect(true).to.be.true;

        /* detect retina 
        expect(options.detectRetina).to.be.false; // Do I need to explain anything? It's like writing in English!

        expect(options.fpsLimit).to.equal(30); // As I said 3 lines above

        expect(options.interactivity.modes.emitters).to.be.empty; // emitters property is an array and for this test must be empty, this syntax works with strings too
        expect(options.particles.color).to.be.an("object").to.have.property("value").to.equal("#fff"); // this is a little more complex, but still really clear
        */
    });
});
        