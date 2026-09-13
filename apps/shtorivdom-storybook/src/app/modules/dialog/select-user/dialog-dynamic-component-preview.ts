/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, inject } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { ExampleUser, SelectUser } from './select-user';

@Component({
  selector: 'spartan-dialog-dynamic-component-preview',
  imports: [HlmButton],
  template: `
		<button hlmBtn (click)="openDynamicComponent()">Select User</button>
	`,
})
export class DialogDynamicPreview {
  private readonly dialogService = inject(HlmDialogService);

  private readonly _users: ExampleUser[] = [
    {
      name: 'Helena Chambers',
      email: 'helenachambers@chorizon.com',
      phone: '+1 (812) 588-3759',
    },
    {
      name: 'Josie Crane',
      email: 'josiecrane@hinway.com',
      phone: '+1 (884) 523-3324',
    },
    {
      name: 'Lou Hartman',
      email: 'louhartman@optyk.com',
      phone: '+1 (912) 479-3998',
    },
    {
      name: 'Lydia Zimmerman',
      email: 'lydiazimmerman@ultrasure.com',
      phone: '+1 (944) 511-2111',
    },
  ];

  public openDynamicComponent() {
    const dialogRef = this.dialogService.open(SelectUser, {
      context: {
        users: this._users,
      },
      contentClass: 'sm:!max-w-[750px]',
    });

    dialogRef.closed$.subscribe((user) => {
      if (user) {
        console.log('Selected user:', user);
      }
    });
  }
}


