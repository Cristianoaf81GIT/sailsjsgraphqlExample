/**
 * HelloController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    /**
     * @author cristiano faria <cristianoaf81@hotmail.com>
     * @param { any } _ any
     * @param { object } _args object arguments   
     * @param { object } _context object with request, response and next 
     * @returns { string } welcome message and api version
     */
    helloController: function (_, _args, _context) {
        return `Welcome to Study Event GraphQL, version: 1.0`
    }

};

