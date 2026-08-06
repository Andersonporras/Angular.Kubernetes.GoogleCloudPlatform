import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InmuebleRoutingModule } from './inmueble-routing.module';
import {Store, StoreModule} from '@ngrx/store';
import {reducers, effects} from './store'
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InmuebleRoutingModule,
    StoreModule.forFeature('inmueble',reducers),
    EffectsModule.forFeature(effects)
  ]
})
export class InmuebleModule { }
