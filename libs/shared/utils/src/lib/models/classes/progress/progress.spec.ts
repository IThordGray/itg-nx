import { take, toArray } from 'rxjs/operators';
import { Progress } from './Progress'; // Adjust the import based on your file structure

describe('Progress', () => {
  let progress: Progress<number>;
  let mockHandler: jest.Mock;

  beforeEach(() => {
    mockHandler = jest.fn();
    progress = new Progress(mockHandler);
  });

  afterEach(() => {
    progress.dispose();
  });

  test('should create an instance correctly', () => {
    expect(progress).toBeInstanceOf(Progress);
    // Also checks if progressChanged$ is an Observable
    expect(progress.progressChanged$.subscribe).toBeDefined();
  });

  test('report should call the handler and emit the value', (done) => {
    const testValue = 42;
    // Subscribe to progressChanged$ to test emissions
    progress.progressChanged$.subscribe({
      next: value => {
        expect(value).toBe(testValue);
        expect(mockHandler).toHaveBeenCalledWith(testValue);
        done();
      },
      error: done.fail
    });

    // Trigger the report method
    progress.report(testValue);
  });

  test('report should not fail if no handler is provided', () => {
    // Create a progress instance without a handler
    const handlerlessProgress = new Progress<number>();
    const testValue = 99;

    expect(() => {
      handlerlessProgress.report(testValue);
    }).not.toThrow();
  });

  test('dispose should complete the Subject', (done) => {
    const emittedValues: number[] = [];

    // Test that no more values are emitted after disposal
    progress.progressChanged$.pipe(take(2), toArray()).subscribe({
      next: values => {
        emittedValues.push(...values);
      },
      complete: () => {
        expect(emittedValues).toEqual([ 1 ]);
        done();
      }
    });

    // Report a value and then dispose
    progress.report(1);
    progress.dispose();
    progress.report(2); // This should not emit
  });
});
