import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {

  listFilter: string;
  @Input() displayDetail: boolean;
  @ViewChild("filterElement") filterElementRef: ElementRef;
  @Input() hitCount: number;
  hitMessage: string;


  constructor() { }

  ngOnChanges(changes: SimpleChanges):void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = "No matches found";
    } else {
      this.hitMessage = "Hits:" + this.hitCount;
    }
  }

  ngAfterViewInit(): void {
    if (this.filterElementRef) {
      this.filterElementRef.nativeElement.focus();
    }
  }

  ngOnInit() {
  }

}
