import test from 'ava';
import {Observable} from 'rx'


test(t => {
    t.plan(10)
    return Observable.range(0, 10).map(()=>t.pass())
        .subscribe()
})