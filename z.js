let arr = [1,2,5,2,2,5]
let a =5

function solution ( a , arr ) {
    // Write your solution here
    let newArr = [ ]
      
       for ( let i = 0 ; i < a ; i ++ ) {
        let count = 0
           for ( let j = 0 ; j < a ; j ++ ) {
               if ( arr [ i ] === arr [ j ] ) {
                       
                count++ 
                
        }} newArr.push (count)
            
                

}  console.log(...newArr);
            
}
          
solution(a,arr)