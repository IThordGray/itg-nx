import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {

  let cfg: Record<string, any>;

  beforeEach(() => {
    cfg = { a: { b: { c: 'Congrats. You won.' } }, x: 1 };
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigService, useFactory: () => new ConfigService(cfg) }
      ]
    });
  });

  it('should return a copy of the config', () => {
    const service: ConfigService = TestBed.inject(ConfigService);
    const cfg = service.get();
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
    const service: ConfigService = TestBed.inject(ConfigService);
    expect(service.get('a.b.d.a')).toBe(undefined);
  });

  it('should return value "1" of config section "x"', () => {
    const service: ConfigService = TestBed.inject(ConfigService);
    expect(service.get('x')).toBe(1);
  });

  it('should return value "Congrats. You won." of config section "a.b.c"', () => {
    const service: ConfigService = TestBed.inject(ConfigService);
    expect(service.get('a.b.c')).toBe('Congrats. You won.');
  });

  it('should return a fallback value', () => {
    const service: ConfigService = TestBed.inject(ConfigService);
    let cfg = service.get('a.b.d');
    expect(cfg).toBeUndefined();
    cfg = service.get('a.b.d', 10);
    expect(cfg).toBe(10);
  });

  it('should set value of the property x', () => {
    const service: ConfigService = TestBed.inject(ConfigService);
    expect(service.get('x')).toBe(1);
    service.set('x', 10);
    expect(service.get('x')).toBe(10);
  });

  it('should set value of the known property path a.b.c', () => {
    const service: ConfigService = TestBed.inject(ConfigService);
    expect(service.get('a.b.c')).toBe('Congrats. You won.');
    service.set('a.b.c', 10);
    expect(service.get('a.b.c')).toBe(10);
  });

  it('should set value of the known property path x.y.z', () => {
    const service: ConfigService = TestBed.inject(ConfigService);
    expect(service.get('x.y.z')).toBeUndefined();
    service.set('x.y.z', 10);
    expect(service.get('x.y.z')).toBe(10);
  });

});

