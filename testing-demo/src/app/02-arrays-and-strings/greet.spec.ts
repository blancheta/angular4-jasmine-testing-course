import { greet } from './greet';

describe('greet', () => {
    it('should return 0 if input is negative', () => {
        expect(greet('mosh')).toContain('mosh');
    });
});