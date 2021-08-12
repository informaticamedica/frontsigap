import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'tabla-generica',
  templateUrl: './tabla-generica.component.html',
  styleUrls: ['./tabla-generica.component.scss'],
})
export class TablaGenericaComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  @Input() data: any[] | undefined;
  @Output() onClick = new EventEmitter<{}>();
  dataSource!: MatTableDataSource<any>;
  columnas: string[] | undefined;
  @ViewChild(MatSort)
  sort: MatSort | null = new MatSort();
  // @ViewChild(MatPaginator)
  // paginator: MatPaginator | null = new MatPaginator();
  ngAfterViewInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.dataSource = new MatTableDataSource(this.data);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.columnas = Object.keys(this.dataSource.filteredData[0]);
    }
    console.log(changes);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  OnClick(event: Event) {
    // console.log(event);
    this.onClick.emit(event);
  }
}
