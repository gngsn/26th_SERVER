function funcScope() {
    var v1 = 123;
    if (true) {
        var v2 = 123;
        let ll = 'abc';
        console.log('let은 Block Scope, ll : ', ll);
    }
    // console.log('let은 Block Scope, ll : ', ll);
    console.log('var은 function Scope, v2 : ', v2);
}
funcScope();
// console.log('var은 function Scope, v1 : ', v2);
