import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnvironmentListPage } from './environment-list.page';

describe('EnvironmentListPage', () => {
  let component: EnvironmentListPage;
  let fixture: ComponentFixture<EnvironmentListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnvironmentListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
