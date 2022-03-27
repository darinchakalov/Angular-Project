import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, MatMenuModule, MatBadgeModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
