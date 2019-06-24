import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConfigModule } from '../lib/config.module';
import { ConfigService } from './config.service';
import { IConfigConfig } from './config.type';

describe('ConfigService', () => {

  it('should be created using .withValue', () => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ConfigModule.withValue({
          'test': 1
        })
      ]
    });

    const service: ConfigService = TestBed.get(ConfigService);
    expect(service).toBeTruthy();
    expect(service.get('test')).toBe(1);
  });

  it('should create Config service with no arguments', () => {

    const x = new ConfigService();
    expect(x).toBeTruthy();
    expect((<any>x)._appConfig).toBeTruthy();
    expect((<any>x)._appConfig instanceof Object).toBeTruthy();

  });

  it('should create Config service with no arguments but fail on loadConfig', async (done) => {

    let x = new ConfigService();
    try {
      await x.loadConfig();
      done.fail('Should not have loaded config without path');
    } catch (error) {
      expect(error.message).toBe('Config path cannot be null or empty.');
      done();
    }


    x = new ConfigService(null, '123');
    expect((<any>x)._httpClient).toBeUndefined();

    try {
      await x.loadConfig();
      done.fail('Should not have loaded config without httpClient.');
    } catch (error) {
      expect(error.message).toBe('No HttpClient was provided.');
      done();
    }

  });

  it('should be created using .withPath', (done) => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ConfigModule.withPath('assets/data/config.json')
      ]
    });

    const service: ConfigService = TestBed.get(ConfigService);
    expect(service).toBeTruthy();

    spyOn((<any>service)._httpClient, 'get').and.returnValue(of({
      'test': 1
    }));

    service.loadConfig();
    setTimeout(() => {
      expect(service.get('test')).toBe(1);
      done();
    }, 100);

  });

  const cfg = { a: { b: { c: 'Congrats. You won.' } }, x: 1 }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ConfigModule.withValue(cfg)
      ]
    });
  });

  it('should return a copy of the config', () => {
    const service: ConfigService = TestBed.get(ConfigService);
    const cfg = service.get<IConfigConfig>();
    expect(cfg.a.b.c).toBe('Congrats. You won.');
    expect(cfg.x).toBe(1);

    cfg.a.b.c = 'Changed.';
    expect(service.get().a.b.c).toBe('Congrats. You won.');
    expect(cfg.a.b.c).toBe('Changed.');

    cfg.a = { x: 1 };
    expect(service.get().a.x).toBeUndefined();
    expect(service.get().a.b).toBeDefined();
    expect(cfg.a.x).toBe(1);
  });

  it('should return undefined if the path is not found', () => {
    const service: ConfigService = TestBed.get(ConfigService);
    expect(service.get('a.b.d.a')).toBe(undefined);
  });

  it('should return value "1" of config section "x"', () => {
    const service: ConfigService = TestBed.get(ConfigService);
    expect(service.get('x')).toBe(1);
  });

  it('should return value "Congrats. You won." of config section "a.b.c"', () => {
    const service: ConfigService = TestBed.get(ConfigService);
    expect(service.get('a.b.c')).toBe('Congrats. You won.');
  })

  it('should return a fallback value', () => {
    const service: ConfigService = TestBed.get(ConfigService);
    let cfg = service.get('a.b.d');
    expect(cfg).toBeUndefined();
    cfg = service.get('a.b.d', 10);
    expect(cfg).toBe(10);
  });

  it('should set value of the property x', () => {
    const service: ConfigService = TestBed.get(ConfigService);
    expect(service.get('x')).toBe(1);
    service.set('x', 10);
    expect(service.get('x')).toBe(10);
  });

  it('should set value of the known property path a.b.c', () => {
    // const service: ConfigService = TestBed.get(ConfigService);
    const service: ConfigService = new ConfigService(cfg);
    expect(service.get('a.b.c')).toBe('Congrats. You won.');
    service.set('a.b.c', 10);
    expect(service.get('a.b.c')).toBe(10);
  });

  it('should set value of the known property path x.y.z', () => {
    const service: ConfigService = TestBed.get(ConfigService);
    expect(service.get('x.y.z')).toBeUndefined();
    service.set('x.y.z', 10);
    expect(service.get('x.y.z')).toBe(10);
  });

});
