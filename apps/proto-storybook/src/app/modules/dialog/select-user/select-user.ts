import { Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDialogDescription, HlmDialogHeader, HlmDialogService, HlmDialogTitle } from '@spartan-ng/helm/dialog';
import { HlmTableImports } from '@spartan-ng/helm/table';

export type ExampleUser = {
  name: string;
  email: string;
  phone: string;
};

@Component({
  selector: 'spartan-dynamic-content',
  imports: [HlmDialogHeader, HlmDialogTitle, HlmDialogDescription, HlmTableImports],
  providers: [provideIcons({ lucideCheck })],
  host: {
    class: 'flex flex-col gap-4',
  },
  templateUrl: 'select-user.html',
})
export class SelectUser {
  private readonly dialogRef = inject<BrnDialogRef<ExampleUser>>(BrnDialogRef);
  private readonly dialogContext = injectBrnDialogContext<{ users: ExampleUser[] }>();

  protected readonly _users = this.dialogContext.users;

  public selectUser(user: ExampleUser) {
    this.dialogRef.close(user);
  }
}
