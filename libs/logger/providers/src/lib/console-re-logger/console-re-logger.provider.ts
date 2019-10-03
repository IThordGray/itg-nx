// tslint:disable:no-console
import { LogLevel } from '@itg/logger/abstractions';
import { LogProvider, ILogProviderConfig, LogEntry } from '@itg/logger/service';
// import * as consoleReClient from 'console-remote-client'

type ConsoleReLogType = 'info' | 'trace' | 'debug' | 'error' | 'warn';

export class ConsoleRemoteLogProvider extends LogProvider {
  private _consoleReClient: any;

  private bootstrapLogger_async(): Promise<void> {
    return new Promise<void>(resolve => {
      this._consoleReClient = {
        channel: this.options.channelName,
        api: '//console.re/connector.js',
        ready: function(c) {
          var d = document,
            s = <any>d.createElement('script'),
            l;
          s.src = this.api;
          s.id = 'consolerescript';
          s.setAttribute('data-channel', this.channel);
          s.onreadystatechange = s.onload = function() {
            if (!l) {
              c();
            }
            l = true;
            console.log('Script ready');
          };
          d.getElementsByTagName('head')[0].appendChild(s);
        }
      };

      resolve();
    });
  }

  private async init() {
    await this.bootstrapLogger_async();
    // this._consoleReClient.ready(() => {
    //     (console as any).re.debug("Consol.Re ready on channel XYZ")
    // })
  }

  private logWhenReady(logType: ConsoleReLogType, message: string) {
    if (!(console as any).re) {
      this._consoleReClient.ready(() => {
        (console as any).re[logType](message);
      });
      return;
    }

    (console as any).re[logType](message);
  }

  constructor(
    private options: { channelName: string },
    config: ILogProviderConfig = { logLevel: LogLevel.Trace }
  ) {
    super(config);
    this.init();
  }

  public clear(): void {
    this._consoleReClient.ready(() => {
      (console as any).re.clear();
    });
  }

  public debug(entry: LogEntry): void {
    this.logWhenReady('debug', entry.message);
  }

  public error(entry: LogEntry): void {
    this.logWhenReady('error', entry.message);
  }

  public fatal(entry: LogEntry): void {
    this.logWhenReady('error', entry.message);
  }

  public info(entry: LogEntry): void {
    this.logWhenReady('info', entry.message);
  }

  public trace(entry: LogEntry): void {
    this.logWhenReady('trace', entry.message);
  }

  public warn(entry: LogEntry): void {
    this.logWhenReady('warn', entry.message);
  }
}
