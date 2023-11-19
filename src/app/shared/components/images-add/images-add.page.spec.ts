import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagesAddPage } from './images-add.page';

describe('ImagesAddPage', () => {
  let component: ImagesAddPage;
  let fixture: ComponentFixture<ImagesAddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ImagesAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
