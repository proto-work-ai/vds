/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { TuiTree } from '@taiga-ui/kit';
import { Component, signal } from '@angular/core';
import { FormImports } from '../../components/form';
import { SwiperFullImages } from '../../components/swiper-full-images/swiper-full-images';

@Component({
  selector: 'app-ceiling-certificates',
  templateUrl: 'ceiling-certificates.html',
  styleUrl: 'ceiling-certificates.scss',
  imports: [TuiDataList, TuiDropdown, TuiTree, SwiperFullImages, FormImports],
})
export class CeilingCertificatesComponent {
  protected readonly images = signal([
    '/img/ceiling-certificates/sertifikat-clipso.jpg',
    '/img/ceiling-certificates/sertifikat-deskor.jpg',
    '/img/ceiling-certificates/sertifikat-deskor-2.jpg',
    '/img/ceiling-certificates/sertifikat-msd.jpg',
    '/img/ceiling-certificates/sertifikat-msd-2.jpg',
    '/img/ceiling-certificates/sertifikat-pongs.jpg',
    '/img/ceiling-certificates/sertifikat-pongs1.jpg',
  ] as const);
}
