import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagContainerComponent } from './tag-container.component';

describe('TagContainerComponent', () => {
  let component: TagContainerComponent;
  let fixture: ComponentFixture<TagContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagContainerComponent]
    });
    fixture = TestBed.createComponent(TagContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
