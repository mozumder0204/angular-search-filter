import { UserService } from './../user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CommonService } from 'src/app/shared/services/common.service';
import { User } from './../models/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  results: User[] = [];
  mainData: User[] = [];
  userListSub: Subscription;
  value = '';
  selectedUser: User;

  constructor(
    private commonService: CommonService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList = () => {
    this.userListSub = this.userService
      .getUser()
      .pipe(
        map((response: any) =>
          response.map((cs: User) => {
            return { ...cs, selected: false };
          })
        )
      )
      .subscribe(
        (data: User[]) => {
          if (data && !data.length) {
            this.commonService.showErrorMsg(`No Data Found !`);
          } else {
            this.results = data;
            this.mainData = data;
          }
        },
        (error) => {
          this.commonService.showErrorMsg(`Server not respond!`);
        }
      );
  };

  OnSearch() {
    this.results = this.findUserByFilter(this.value);
  }

  findUserByFilter(value: string) {
    const filter = value.toLowerCase();
    if (value !== '') {
      this.results = this.mainData;
      const condition = new RegExp(filter);

      return this.results.filter(
        (option: any) =>
          condition.test(option.name.toLowerCase()) ||
          condition.test(option.username.toLowerCase()) ||
          condition.test(option.email.toLowerCase())
      );
    } else {
      return this.mainData;
    }
  }

  OnClear() {
    this.value = '';
    this.getUserList();
  }

  onSelectCard(obj: User, index: number) {
    obj.selected = !obj.selected;
    this.results.map((cs, i) => {
      if (i !== index) {
        cs.selected = false;
      }
    });

    if (obj.selected) {
      this.selectedUser = obj;
    } else {
      this.selectedUser = undefined;
    }
  }

  ngOnDestroy() {
    if (this.userListSub) {
      this.userListSub.unsubscribe();
    }
  }
}
