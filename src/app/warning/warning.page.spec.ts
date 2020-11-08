import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { WarningPage } from './warning.page';

describe('WarningPage', () => {
  let component: WarningPage;
  let fixture: ComponentFixture<WarningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WarningPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(WarningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
