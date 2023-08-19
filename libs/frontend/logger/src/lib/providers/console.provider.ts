import { Log } from '../abstractions/log';
import { LogProvider } from '../abstractions/log-provider';

export class ConsoleProvider extends LogProvider {

  debug(log: Log): void {
    console.debug(log.toString());
  }

  error(log: Log): void {
    const loggedContent = log.message instanceof Error ? log.message : log.toString();
    console.error(loggedContent);
  }

  fatal(log: Log): void {
    const loggedContent = log.message instanceof Error ? log.message : log.toString();
    console.error(loggedContent);
  }

  info(log: Log): void {
    console.info(log.toString());
  }

  trace(log: Log): void {
    console.trace(log.toString());
  }

  warn(log: Log): void {
    console.warn(log.toString());
  }

}
