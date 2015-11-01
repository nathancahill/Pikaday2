
import assert from 'assert';
import { isArray, isDate, extend } from '../src/lib/utils';


describe('isArray', () => {
    it('returns true when value is an array', () => {
        assert(isArray(['a', 'b', 'c']));
    });

    it('returns false when value is not an array', () => {
        assert(!isArray('abc'));
    });
});

describe('isDate', () => {
    it('returns true when value is a date', () => {
        assert(isDate(new Date()));
    });

    it('returns false when value is not a date', () => {
        assert(!isDate('abc'));
    });
});
