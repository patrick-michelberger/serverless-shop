const index = require("./index")
// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new index.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})
