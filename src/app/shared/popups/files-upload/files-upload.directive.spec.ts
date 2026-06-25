import { MatDialog } from '@angular/material/dialog';
import { FilesUploadDirective } from './files-upload.directive';

describe('FilesUploadDirective', () => {
  it('should create an instance', () => {
    const directive = new FilesUploadDirective({} as MatDialog);
    expect(directive).toBeTruthy();
  });
});
