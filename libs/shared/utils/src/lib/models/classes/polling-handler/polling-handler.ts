export interface IPollingOptions<TResult> {
    pollFn: () => Promise<TResult>;
    interval?: number;
    shouldStop?: (result: TResult) => boolean;
    onStop?: () => void;
    onError?: (error: unknown) => void;
    maxRetries?: number;
    startImmediately?: boolean;
}

export interface IPollingResult<T> {
    result: T | null;
}

export class PollingHandler<T> {
    private _intervalId: number | null = null;
    private _isPolling = false;
    private _attempts = 0;
    private _options: IPollingOptions<T>;

    constructor(options: IPollingOptions<T>) {
        this._options = {
            pollFn: options.pollFn,
            interval: options.interval ?? 1000,
            shouldStop: options.shouldStop,
            startImmediately: options.startImmediately ?? true,
            maxRetries: options.maxRetries ?? 3,
        };

        if (this._options.startImmediately) this.start();
    }

    start(): void {
        if (this._isPolling) return;

        this._isPolling = true;

        this._poll();
    }

    stop(): void {
        if (!this._isPolling) return;

        this._isPolling = false;
        this._clearInterval();

        this._options.onStop?.();
    }

    get isPolling(): boolean {
        return this._isPolling;
    }

    private async _poll(): Promise<void> {
        if (!this._isPolling) return;

        try {
            const result = await this._options.pollFn();
            this._attempts = 0;

            if (this._options.shouldStop?.(result)) {
                this.stop();
                return;
            }

            this._scheduleNextPoll();
        } catch (error) {
            this._attempts++;
            this._options.onError?.(error);

            if (this._options.maxRetries && this._attempts >= this._options.maxRetries) {
                this.stop();
                return;
            }

            this._scheduleNextPoll();
        }
    }

    private _scheduleNextPoll(): void {
        if (!this._isPolling) return;

        this._intervalId = window.setTimeout(() => this._poll(), this._options.interval);
    }

    private _clearInterval(): void {
        if (this._intervalId !== null) {
            clearTimeout(this._intervalId);
            this._intervalId = null;
        }
    }
}
