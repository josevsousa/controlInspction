import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InspectionAddPage } from './inspection-add.page';

describe('InspectionAddPage', () => {
  let component: InspectionAddPage;
  let fixture: ComponentFixture<InspectionAddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InspectionAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
