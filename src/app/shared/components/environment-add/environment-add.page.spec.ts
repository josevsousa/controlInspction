import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnvironmentAddPage } from './environment-add.page';

describe('EnvironmentAddPage', () => {
  let component: EnvironmentAddPage;
  let fixture: ComponentFixture<EnvironmentAddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnvironmentAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
