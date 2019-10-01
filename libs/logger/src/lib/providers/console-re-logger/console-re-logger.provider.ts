// tslint:disable:no-console
import { LogProvider } from '../../models/abstract.log.provider';
import { LogLevel } from '../../models/log-level.enum';
import { ILogProviderConfig } from '../../models/log-provider-config';
import { LogEntry } from '../../models/log-entry';

// import consolRe = require('console-remote-client')
//
// import * as consoleRe from 'console-remote-client'
// const consolRe : any = require('console-remote-client')
//

// const consolRe: any = {
//     channel: 'itg-remote-log-dev',
//     api: '//console.re/connector.js',
//     ready: function (c) { var d = document, s = <any>d.createElement('script'), l; s.src = this.api; s.id = 'consolerescript'; s.setAttribute('data-channel', this.channel); s.onreadystatechange = s.onload = function () { if (!l) { c(); } l = true; }; d.getElementsByTagName('head')[0].appendChild(s); }
// };

// export interface RemoteLoggerInterface {
//     re : {
//         info(message) : void
//     }
// }

export class ConsoleRemoteLogProvider extends LogProvider {

    // public get remoteLogger(): RemoteLoggerInterface {
    //     return (console as unknown as RemoteLoggerInterface)
    // }

    // private consolere: any

    private init() {
        const consoleRe: any = {
        channel: 'itg-remote-log-dev',
        api: '//console.re/connector.js',
        ready: function (c) { var d = document, s = <any>d.createElement('script'), l; s.src = this.api; s.id = 'consolerescript'; s.setAttribute('data-channel', this.channel); s.onreadystatechange = s.onload = function () { if (!l) { c(); } l = true; }; d.getElementsByTagName('head')[0].appendChild(s); }
        };
        let self = this;
        // this.consolere = require('console-remote-client').connect('console.re', '80', 'itg-remote-log-dev');
        consoleRe.ready(function () {
            setInterval(()=>{
                let log = new LogEntry();
                log.message = "remote log test";
                log.logLevel = LogLevel.Info;
                log.entryDate = new Date();
                self.info(log)
            },5000)

            // console.re.log('remote log test');
        });
        // this.consolere = consolRe.toServerRe.connect('console.re', '80', 'itg-remote-log-dev');
        // setInterval(() => {
        //     let log = new LogEntry();
        //     log.message = "Test";
        //     log.logLevel = LogLevel.Info;
        //     log.entryDate = new Date();
        //     this.info(log)
        // }, 1000)
    }

    constructor(
        config: ILogProviderConfig = { logLevel: LogLevel.Trace }
    ) {
        super(config);
        this.init();
    }

    public clear(): void {
        (console as any).re.clear()
    }

    public debug(entry: LogEntry): void {
        // (console as any).re.debug(entry.message)
    }

    public error(entry: LogEntry): void {
        (console as any).re.error(entry.message)
    }

    public fatal(entry: LogEntry): void {
        (console as any).re.error(entry.message)
    }

    public info(entry: LogEntry): void {
        (console as any).re.info(entry.message);
    }

    public trace(entry: LogEntry): void {
        (console as any).re.trace(entry.message);
    }

    public warn(entry: LogEntry): void {
        (console as any).re.warn(entry.message);
    }
}
