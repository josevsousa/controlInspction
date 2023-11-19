import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagesListPage } from './images-list.page';

describe('ImagesListPage', () => {
  let component: ImagesListPage;
  let fixture: ComponentFixture<ImagesListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ImagesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
