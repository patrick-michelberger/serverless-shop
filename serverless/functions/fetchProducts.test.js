const fetchProducts = require("./fetchProducts")
// @ponicode
describe("fetchProducts.handler", () => {
    test("0", () => {
        let callFunction = () => {
            fetchProducts.handler(false, "DELETE FROM Projects WHERE pid = %s", "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fetchProducts.handler(false, "UNLOCK TABLES;", "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fetchProducts.handler(true, "UPDATE Projects SET pname = %s WHERE pid = %s", "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fetchProducts.handler(true, "DROP TABLE tmp;", "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fetchProducts.handler(false, "SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';", "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fetchProducts.handler(undefined, "", undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
