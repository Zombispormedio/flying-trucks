import {Observable} from 'rx'

Observable.zip(Observable.range(0, 10), Observable.interval(1000)).subscribe(
    function (x) {
        console.dir(x);
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });
