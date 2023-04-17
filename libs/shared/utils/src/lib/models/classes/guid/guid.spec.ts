import { Guid } from './guid';

describe('Guid', () => {
  describe('empty', () => {
    it('should return a string with all zeros', () => {
      expect(Guid.empty()).toBe('00000000-0000-0000-0000-000000000000');
    });
  });

  describe('new', () => {
    it('should return a valid GUID', () => {
      const guid = Guid.new();
      expect(Guid.isValid(guid)).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('should return true for an empty GUID', () => {
      expect(Guid.isEmpty('00000000-0000-0000-0000-000000000000')).toBe(true);
    });

    it('should return false for a non-empty GUID', () => {
      expect(Guid.isEmpty(Guid.new())).toBe(false);
    });
  });

  describe('isValid', () => {
    it('should return true for a valid GUID', () => {
      expect(Guid.isValid('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11')).toBe(true);
    });

    it('should return false for an invalid GUID', () => {
      expect(Guid.isValid('not-a-guid')).toBe(false);
    });
  });
});
