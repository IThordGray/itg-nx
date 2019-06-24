import { TestBed } from '@angular/core/testing';
import { DefaultNotifyProvider } from './models/default-notification.provider.class';
import { NotifyService } from './models/notification.provider.interface';
import { NotifyModule } from './notify.module';
import { MockNotifyProvider } from './test-utils/mock-provider';

describe('NotifyModule', () => {
  it('should create a NotifyService with the DefaultNotifyProvider', () => {
    TestBed.configureTestingModule({
      imports: [NotifyModule.withDefaultProvider()]
    });

    const notify = TestBed.get(NotifyService);
    expect(notify).toBeTruthy();
    expect(notify instanceof DefaultNotifyProvider);
  });

  it('should create a NotifyService with a CustomNotifyProvider', () => {
    TestBed.configureTestingModule({
      imports: [NotifyModule.withCustomProviders([
        { provide: NotifyService, useClass: MockNotifyProvider }
      ])]
    });

    const notify = TestBed.get(NotifyService);
    expect(notify).toBeTruthy();
    expect(notify instanceof DefaultNotifyProvider);
  });
});
