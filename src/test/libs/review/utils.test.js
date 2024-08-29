const {gretterThanZeroAndLessThenFive} = require('../../../libs/review/utils')



describe('gretterThenZeroAndLessThenFive',()=>{
    it('should return number ',()=>{
       expect(gretterThanZeroAndLessThenFive(1)).toBe(1)
       expect(gretterThanZeroAndLessThenFive(5)).toBe(5)
       expect(gretterThanZeroAndLessThenFive(4)).toBe(4)
       expect(gretterThanZeroAndLessThenFive(4.5)).toBe(4.5)

    })
    it('should throw an Error if we pass zero',()=>{
        
        expect(()=>gretterThanZeroAndLessThenFive(0)).toThrow()
        
    })
    it('should throw an error if we pass less then 0',()=>{
        expect(()=>gretterThanZeroAndLessThenFive(-1)).toThrow()
        expect(()=>gretterThanZeroAndLessThenFive(-100)).toThrow()
    })
    it('should throw an error if we pass gretter then five',()=>{
        expect(()=>gretterThanZeroAndLessThenFive(10)).toThrow()
        expect(()=>gretterThanZeroAndLessThenFive(5.1)).toThrow()
    })
})