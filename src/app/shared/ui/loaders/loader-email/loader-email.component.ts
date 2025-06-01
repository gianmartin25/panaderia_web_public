import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader-email',
  standalone: true,
  imports: [],
  templateUrl: './loader-email.component.html',
  styleUrl: './loader-email.component.scss'
})
export class LoaderEmailComponent {
  @Input() text?: string;
}
