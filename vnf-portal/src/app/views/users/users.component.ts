import { CdkTableModule } from '@angular/cdk/table'
import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core'
import { VnfTableDirective } from '../../directives/vnf-table.directive'
import { UsersColumns } from '../../enums/users'
import { UsersService } from '../../services/users.service'
import { User } from '../../types/users'
import { CdkDataSource } from '../../utils/cdk/data-source'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, CdkTableModule, VnfTableDirective],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  #usersService = inject(UsersService)

  @ViewChild(VnfTableDirective) vnfTable!: VnfTableDirective

  displayedColumns = UsersColumns
  dataSource = new CdkDataSource<User>()

  constructor() {
    this.loadUsers()
  }

  loadUsers() {
    this.#usersService.search().subscribe((res) => {
      if (res.success) {
        this.dataSource.data.next(res.data)
        this.vnfTable.updateTableDataClassNames();
      }
    })
  }
}
