import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtlasTable } from './table';

describe('AtlasTable', () => {
  let component: AtlasTable;
  let fixture: ComponentFixture<AtlasTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtlasTable],
    }).compileComponents();

    fixture = TestBed.createComponent(AtlasTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
