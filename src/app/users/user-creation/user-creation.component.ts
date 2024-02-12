import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { LoaderComponent } from 'src/app/ui/loader/loader.component';
import { FormDialogComponent } from 'src/app/ui/form-dialog/form-dialog.component';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { RoleEnum } from 'src/app/shared/values/cms.values';
import { PromptEnum } from 'src/app/shared/values/prompts.values';
import { RegisteredEmailValidator } from '../email.validator';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrl: './user-creation.component.css',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    LoaderComponent,
    FormDialogComponent,
  ],
})
export class UserCreationComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;

  constructor(
    private _router: Router,
    private _registeredEmailValidator: RegisteredEmailValidator,
    private _usersService: UsersService,
    private _utilitiesService: UtilitiesService,
    private _notificationsService: NotificationsService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this._registeredEmailValidator.validate.bind(
            this._registeredEmailValidator,
          ),
        ],
        updateOn: 'change',
      }),
    });
  }

  get email() {
    return this.form.get('email')!;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const email = this.form.getRawValue().email;
    this.isLoading = true;
    this._usersService
      .fetchRolesByName({
        name: RoleEnum.User,
      })
      .then((roles) => {
        const role = roles[0];
        return this._usersService.inviteUser({
          email: email,
          role: role.id,
          invite_url: `${location.origin}/users/activation`,
        });
      })
      .then(() => {
        return this._usersService.fetchUserByEmail({
          email: email,
        });
      })
      .then((invitedUser) => {
        this._usersService.createUserProfile({
          data: {
            alais: this._utilitiesService.generateRandomAlais(),
            user: { id: invitedUser!.id },
          },
        });
      })
      .then(() => {
        this._notificationsService.pushSuccessInfo({
          title: 'Sign Up Successful',
          content: PromptEnum.SignUp,
        });
        this._router.navigate(['/auth/login']);
      })
      .catch((error) => {
        this._notificationsService.pushErrorInfo({
          title: 'Sign Up Error',
          content: error.toString(),
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
