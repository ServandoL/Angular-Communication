import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() displayDetail: boolean;
  @ViewChild("filterElement") filterElementRef: ElementRef;
  @Input() hitCount: number;
  hitMessage: string;
  // @output() for event binding and catching the event from child to parent
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value); // event payload
  }


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
