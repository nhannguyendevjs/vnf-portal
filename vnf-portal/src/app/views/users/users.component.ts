import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';
import { UsersColumns } from '../../enums/users';
import { UsersService } from '../../services/users.service';
import { User } from '../../types/users';
import { CdkDataSource } from '../../utils/cdk/data-source';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, CdkTableModule, InfiniteScrollDirective],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  vnfTable = viewChild.required<any>('usersTable');
  inputSearch = viewChild.required<ElementRef<HTMLInputElement>>('inputSearch');

  #usersService = inject(UsersService);

  displayedColumns = UsersColumns;
  dataSource = new CdkDataSource<User>();

  searchValue = '';

  constructor() {
    this.loadUsers();
  }

  clearUsers() {
    this.dataSource.data.next([]);
  }

  loadUsers() {
    this.#usersService.search().subscribe((res) => {
      if (res.success) {
        const users = [
          ...this.dataSource.data.value,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
        ];

        this.dataSource.data.next(users.filter((user) => user.name.toLowerCase().includes(this.searchValue.toLowerCase())));
      }
    });
  }

  onSearch(event) {
    this.searchValue = event.target.value;
    this.clearUsers();
    this.loadUsers();
  }

  onClearSearch() {
    this.searchValue = '';
    this.inputSearch().nativeElement.value = '';
    this.clearUsers();
    this.loadUsers();
  }
}
