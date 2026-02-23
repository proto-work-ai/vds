/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ClientSideRowModelModule,
  ColDef,
  GridReadyEvent,
  ModuleRegistry,
  PaginationModule,
  ValidationModule,
} from 'ag-grid-community';

ModuleRegistry.registerModules([
  PaginationModule,
  ClientSideRowModelModule,
  ValidationModule,
]);

export interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

@Component({
  selector: 'atlas-ag-grid-table',
  templateUrl: './ag-grid-table.html',
  imports: [AgGridAngular],
  styleUrls: ['./ag-grid-table.scss'],
})
export class AtlasAgGridTable {
  columnDefs: ColDef[] = [
    {
      field: 'athlete',
      minWidth: 170,
    },
    { field: 'age' },
    { field: 'country' },
    { field: 'date' },
    { field: 'total' },
  ];
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };
  rowData: IOlympicData[] = [
    {
      age: 10,
      athlete: '10',
      bronze: 10,
      country: '10',
      date: '10',
      gold: 10,
      silver: 10,
      sport: '19',
      total: 30,
      year: 233,
    },
    {
      age: 10,
      athlete: '10',
      bronze: 10,
      country: '10',
      date: '10',
      gold: 10,
      silver: 10,
      sport: '19',
      total: 30,
      year: 233,
    },
    {
      age: 10,
      athlete: '10',
      bronze: 10,
      country: '10',
      date: '10',
      gold: 10,
      silver: 10,
      sport: '19',
      total: 30,
      year: 233,
    },
    {
      age: 10,
      athlete: '10',
      bronze: 10,
      country: '10',
      date: '10',
      gold: 10,
      silver: 10,
      sport: '19',
      total: 30,
      year: 233,
    },
    {
      age: 10,
      athlete: '10',
      bronze: 10,
      country: '10',
      date: '10',
      gold: 10,
      silver: 10,
      sport: '19',
      total: 30,
      year: 233,
    },
    {
      age: 10,
      athlete: '10',
      bronze: 10,
      country: '10',
      date: '10',
      gold: 10,
      silver: 10,
      sport: '19',
      total: 30,
      year: 233,
    },
  ];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent<IOlympicData>) {}
}
