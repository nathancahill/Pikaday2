
import assert from 'assert';
import { hasClass, addClass, removeClass } from '../src/lib/classutils';


describe('hasClass', () => {
    it('returns true when an element has a class', () => {
        let el = {className: 'a b c'};

        assert(hasClass(el, 'a'));
    });

    it('returns false when an element does not have a class', () => {
        let el = {className: 'b c'};

        assert(!hasClass(el, 'a'));
    });
});

describe('addClass', () => {
    it('adds a class when an element does not have the class', () => {
        let el = {className: 'b c'};

        addClass(el, 'a');

        assert.equal('b c a', el.className);
    });

    it('does not add a class when an element already has the class', () => {
        let el = {className: 'a b c'};

        addClass(el, 'a');

        assert.equal('a b c', el.className);
    });
});

describe('removeClass', () => {
    it('removes a class when an element has the class', () => {
        let el = {className: 'a b c'};

        removeClass(el, 'a');

        assert.equal('b c', el.className);
    });

    it('does nothing when an element does not have the class', () => {
        let el = {className: 'b c'};

        removeClass(el, 'a');

        assert.equal('b c', el.className);
    });
});
