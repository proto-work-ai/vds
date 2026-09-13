import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core'
import {
  FlexRenderDirective,
  GroupingState,
  Updater,
  createAngularTable,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
} from '@tanstack/angular-table'
import { columns } from './columns'
import { makeData } from './makeData'

@Component({
  selector: 'atlas-column-grouping-table',
  templateUrl: './column-grouping-table.html',
  styleUrls: ['./column-grouping-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlexRenderDirective, CommonModule],
})
export class AtlasColumnGroupingTable {
  title = 'grouping'
  data = signal(makeData(10000))
  grouping = signal<GroupingState>([])

  stringifiedGrouping = computed(() => JSON.stringify(this.grouping(), null, 2))

  tableOptions = computed(() => ({
    data: this.data(),
    columns: columns,
    state: {
      grouping: this.grouping(),
    },
    onGroupingChange: (updaterOrValue: Updater<GroupingState>) => {
      const groupingState =
        typeof updaterOrValue === 'function'
          ? updaterOrValue([...this.grouping()])
          : updaterOrValue
      this.grouping.set(groupingState)
    },
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
  }))

  table = createAngularTable(this.tableOptions)

  onPageInputChange(event: any): void {
    const page = event.target.value ? Number(event.target.value) - 1 : 0
    this.table.setPageIndex(page)
  }

  onPageSizeChange(event: any) {
    this.table.setPageSize(Number(event.target.value))
  }

  refreshData() {
    this.data.set(makeData(10000))
  }
}
