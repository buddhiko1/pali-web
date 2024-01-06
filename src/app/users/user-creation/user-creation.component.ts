import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { timer } from 'rxjs';
import { CombinedError } from '@urql/core';

import { LoadingComponent } from 'src/app/ui/loading/loading.component';
import { FormDialogComponent } from 'src/app/ui/form-dialog/form-dialog.component';
import { InfoDialogComponent } from 'src/app/ui/info-dialog/info-dialog.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { RoleEnum } from 'src/app/shared/values/cms.values';
import { PromptEnum } from 'src/app/shared/values/prompts.values';
import { RegisteredEmailValidator } from '../shared/email.validator';
import { UsersService } from '../users.service';
import { UserRoleFragment } from 'src/gql/graphql';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrl: './user-creation.component.css',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    LoadingComponent,
    FormDialogComponent,
    InfoDialogComponent,
  ],
})
export class UserCreationComponent implements OnInit {
  form!: FormGroup;

  isLoading = false;
  error = '';
  successInfo = '';

  constructor(
    private _router: Router,
    private _usersService: UsersService,
    private _registeredEmailValidator: RegisteredEmailValidator,
    private _navigationService: NavigationService,
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.form.get('email')!;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    const roles: UserRoleFragment[] = await this._usersService.fetchRoles();
    const role = roles.find((role) => role.name === RoleEnum.User);
    if (!role) {
      throw new Error('user role is not exsits');
    }
    this.isLoading = true;
    this._usersService
      .createUser({
        email: this.form.getRawValue().email,
        role: role.id,
        urlForActive: `${location.origin}/users/activation`,
      })
      .then((user) => {
        // create default alais with user id
        this._usersService
          .createUserProfile({
            data: {
              alais: user.id,
              user: { id: user.id },
            },
          })
          .then(() => {
            // wait for 3 seconds for user to receive the email.
            timer(3000).subscribe(() => {
              this.isLoading = false;
              this.successInfo = PromptEnum.SignUp;
            });
          });
      })
      .catch((error: CombinedError) => {
        this.isLoading = false;
        this.error =
          error.networkError?.message ?? error.graphQLErrors[0].message;
      });
  }

  onErrorDialogSubmit(): void {
    this._navigationService.goBack();
  }

  onSuccessDialogSubmit(): void {
    this._router.navigate(['/auth/login']);
  }
}
