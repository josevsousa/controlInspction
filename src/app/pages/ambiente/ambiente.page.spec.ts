import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmbientePage } from './ambiente.page';

describe('AmbientePage', () => {
  let component: AmbientePage;
  let fixture: ComponentFixture<AmbientePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AmbientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
