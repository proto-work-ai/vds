/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { TuiTree } from '@taiga-ui/kit';
import { Component, signal } from '@angular/core';
import { FormImports } from '../../components/form';
import { SwiperFullImages } from '../../components/swiper-full-images/swiper-full-images';

@Component({
  selector: 'app-photos-works',
  templateUrl: 'photos-works.html',
  styleUrl: 'photos-works.scss',
  imports: [TuiDataList, TuiDropdown, TuiTree, SwiperFullImages, FormImports],
})
export class PhotosWorksComponent {
  protected readonly images = signal(Array.from(new Array(28), (_, i) => `/img/works/image-${i + 1}.jpg`));
}
