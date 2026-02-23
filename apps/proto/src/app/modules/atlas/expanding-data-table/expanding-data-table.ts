/* eslint-disable @angular-eslint/component-selector */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core'
import {
  ColumnDef,
  createAngularTable,
  ExpandedState,
  flexRenderComponent,
  FlexRenderDirective,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/angular-table';
import { ReactiveFormsModule } from '@angular/forms'
import { ExpandableCell, ExpandableHeaderCell } from './expandable-cell'
import { makeData, type Person } from './makeData';

const defaultColumns: ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    header: () =>
      flexRenderComponent(ExpandableHeaderCell, {
        inputs: {
          label: 'First name',
        },
      }),
    cell: () => flexRenderComponent(ExpandableCell),
  },
  {
    accessorFn: (row) => row.lastName,
    id: 'lastName',
    cell: (info) => info.getValue(),
    header: () => 'Last Name',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'age',
    header: () => 'Age',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'visits',
    header: () => `Visits`,
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'progress',
    header: 'Profile Progress',
    footer: (props) => props.column.id,
  },
]

@Component({
  selector: 'atlas-expanding-data-table',
  templateUrl: './expanding-data-table.html',
  styleUrls: ['./expanding-data-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlexRenderDirective, ReactiveFormsModule],
})
export class AtlasExpandingDataTable {
  readonly data = signal<Person[]>(makeData(100, 5, 3))
  readonly expanded = signal<ExpandedState>({})

  readonly table = createAngularTable(() => ({
    data: this.data(),
    columns: defaultColumns,
    state: {
      expanded: this.expanded(),
    },
    onExpandedChange: (updater) =>
      typeof updater === 'function'
        ? this.expanded.update(updater)
        : this.expanded.set(updater),
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    // filterFromLeafRows: true,
    // maxLeafRowFilterDepth: 0,
    debugTable: true,
  }))

  readonly rawExpandedState = computed(() =>
    JSON.stringify(this.expanded(), undefined, 2),
  )

  readonly rawRowSelectionState = computed(() =>
    JSON.stringify(this.table.getState().rowSelection, undefined, 2),
  )

  onPageInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement
    const page = inputElement.value ? Number(inputElement.value) - 1 : 0
    this.table.setPageIndex(page)
  }

  onPageSizeChange(event: any): void {
    this.table.setPageSize(Number(event.target.value))
  }
}
