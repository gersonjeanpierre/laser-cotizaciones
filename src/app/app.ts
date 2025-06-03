import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  template: `
  <main>
      <header class="brand-name">
        <h1 class="text-5xl">Laser Color Veloz</h1>
      </header>
      <section class="content">
      </section>
    </main>
  `,
  // templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'laser-cotiza';
}
