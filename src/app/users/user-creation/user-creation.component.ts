import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { timer } from 'rxjs';

import { LoaderComponent } from 'src/app/ui/loader/loader.component';
import { FormDialogComponent } from 'src/app/ui/form-dialog/form-dialog.component';
import { ResultDialogComponent } from 'src/app/ui/result-dialog/result-dialog.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { RoleEnum } from 'src/app/shared/values/cms.values';
import { PromptEnum } from 'src/app/shared/values/prompts.values';
import { RegisteredEmailValidator } from '../email.validator';
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
    LoaderComponent,
    FormDialogComponent,
    ResultDialogComponent,
  ],
})
export class UserCreationComponent implements OnInit {
  form!: FormGroup;

  isLoading = false;
  error = '';
  prompt = '';

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
    return this.form.get('email')!;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    const roles: UserRoleFragment[] = await this._usersService.fetchRoles();
    const role = roles.find((role) => role.name === RoleEnum.User);
    this.isLoading = true;
    const email = this.form.getRawValue().email;
    try {
      await this._usersService.inviteUser({
        email: email,
        role: role!.id,
        invite_url: `${location.origin}/users/activation`,
      });
      const createdUser = await this._usersService.fetchUserByEmail({
        email: email,
      });
      const defaultAlais = `user-${createdUser!.id
        .replace(/-/g, '')
        .substring(0, 10)}`;
      await this._usersService.createUserProfile({
        data: {
          alais: createdUser!.id,
          user: { id: defaultAlais },
        },
      });
      timer(3000).subscribe(() => {
        this.isLoading = false;
        this.prompt = PromptEnum.SignUp;
      });
    } catch (error: any) {
      this.isLoading = false;
      this.error =
        error.networkError?.message ?? error.graphQLErrors[0].message;
    }
  }

  onResultDialogClick(): void {
    this.error
      ? this._navigationService.goBack()
      : this._router.navigate(['/auth/login']);
  }
}
