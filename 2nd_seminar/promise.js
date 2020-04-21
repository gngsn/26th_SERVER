const func1 = (param) => {
    return new Promise((resolved, rejected) => {
        setTimeout(() => {
            console.log('func1 return resolved');
            resolved(`func 1 success: ${param}`);
        }, 500);
    });
}

const func2 = (param) => {
    return new Promise((resolved, rejected) => {
        setTimeout(() => {
                console.log('func2 return rejected');
                rejected(new Error(`func2 param: '${param}'`));
            }, 500);
    });
}

const func3 = (param) => {
    return new Promise((resolved, rejected) => {
        setTimeout (() => {
                console.log('func3 return resolved');
                resolved(`func 3 success: ${param}\n`);
            }, 500);
    });
}

const func4 = (param) => {
    return new Promise((resolved, rejected) => {
        setTimeout(() => {
                console.log('func4 return rejected');
                rejected(Error(`func 4 error: ${param}\n`));
            }, 500);
    });
}

const func5 = (param) => {
    return new Promise((resolved, rejected) => {
        setTimeout(() => {
                console.log('func5 return resolved');
                resolved(`func 5 success: ${param}\n`);
            }, 500);
    });
}

const promise = func1('sopt')

/*
    .then(func2) 은
    .then((result) => func2(result)) 와 동일
*/
promise
    .then(func2)
    .then(func3)
    .catch(console.error) // errorhandler1
    .then(func4)
    .then(func5)
    .catch(console.error) // errorhandler2
    .then(console.log);