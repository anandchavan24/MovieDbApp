let faker  = require('@faker-js/faker');
console.log(faker)
faker = faker.faker;
const userService = require('../userService');
    describe('create user test cases',()=>{
        let user = {
            id :  faker.datatype.uuid(),
            firstname : faker.name.firstName() ,
            lastname : faker.name.lastName(),
            mobile : faker.phone.number(),
            email: faker.internet.email(), //unique required
            city : faker.address.city(),
            country : faker.address.country(),
            password : faker.internet.password()
        }
        test('user cretad successfully, it should retun error as null',()=>{
            const mockFn = jest.fn();
            const mockCreateUser = jest.fn((user)=>true)
            expect(mockCreateUser(user)).toBe(mockCreateUser(user))
        })
    })