import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InspectionListPage } from './inspection-list.page';

describe('InspectionListPage', () => {
  let component: InspectionListPage;
  let fixture: ComponentFixture<InspectionListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InspectionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
