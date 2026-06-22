import { Component, inject, signal } from '@angular/core';
import { TuiAccordion } from '@taiga-ui/kit';
import { IsPlatformBrowserDirective } from '../../../components/is-platform-browser.directive';
import { repairServicePrice } from '../../service-pages';
import { PriceListUnitTable } from '../../../modules/catalog-price/price-list-unit-table/price-list-unit-table';
import { AnyQuestions } from '../../../components/any-questions/any-questions';
import { ServicesForm } from '../../../modules/services/services-form/services-form';
import { FormImports } from '../../../components/form';
import { UnitPrice } from '../../price-list.service';
import { WayWeWorkComponent } from '../../../modules/way-we-work/way-we-work.component';
import { Meta, Title } from '@angular/platform-browser';

/*
  https://sanremo62.ru/ceiling/articles/remont_potolkov
  https://irkutsk.potolki-natyazhniye.ru/remont/
*/
@Component({
  templateUrl: 'repair-stretch-ceilings.html',
  styleUrl: 'repair-stretch-ceilings.scss',
  imports: [
    TuiAccordion,
    IsPlatformBrowserDirective,
    PriceListUnitTable,
    AnyQuestions,
    ServicesForm,
    FormImports,
    WayWeWorkComponent,
  ],
})
export class Detail {
  constructor() {
    const title = `Decken Master | Ремонт натяжного потолка в Москве`;
    inject(Title).setTitle(title);
    inject(Meta).updateTag({ property: 'og:title', content: title });

    inject(Meta).updateTag({
      name: 'description',
      content: `Осуществляем ремонт натяжного потолка любой сложности. Срочный выезд мастера. Бесплатная консультация и точный расчет стоимости ремонта потолка.`,
    });
  }

  protected readonly tablePrices = signal(repairServicePrice);

  protected readonly services = signal<{ title: string; image: string; text: string }[]>([
    {
      title: `Порез в ходе ремонта`,
      text: `Распространенная проблема. При неаккуратной работе с обрезкой обоев, шпаклевке стен. При перестановке мебели и переезде`,
      image: '/services/repair/image-1.jpg',
    },
    {
      title: `Разрыв около светильника`,
      text: `Воздействие горячей галогенной лампы на термоусадочное кольцо. Разрыв в ходе эксплуатации несоответствующих ламп.`,
      image: '/services/repair/image-2.jpg',
    },
    {
      title: `Разрыв в области люстры`,
      text: `Некачественное термоусадочное кольцо. Разрыв при установке люстры. Возникает при ветровых или физических нагрузках.`,
      image: '/services/repair/image-3.jpg',
    },
    {
      title: `Осыпалась штукатурка`,
      text: `Возникает в старых домах. Образуется при заливе потолка. Сильных ударов сверху от соседей, некачественная штукатурка.`,
      image: '/services/repair/image-4.jpg',
    },
    {
      title: `Некачественный монтаж`,
      text: `Острые предметы, выступы, зазоры на багете, не замеченные при натяжке полотна. Поврежение при монтаже. Брак полотна.`,
      image: '/services/repair/image-5.jpg',
    },
    {
      title: `Разрыв в области трубы`,
      text: `Некачественный обвод трубы и его установка пр монтаже. Недостаток клея. Воздействие температур на полотно. Повреждение при установке.`,
      image: '/services/repair/image-6.jpg',
    },
    {
      title: `Частичный демонтаж`,
      text: `При необходимости заменить трубы отопления (газовые). Просушка потолочного пространства, ремонт вентиляции в потолке.`,
      image: '/services/repair/image-7.jpg',
    },
    {
      title: `Ремонт электропроводки`,
      text: `Замена трансформатора, элементов электрики и проводки. Ремонт электрики в распред-коробках (обрывы). Замена люстр (ламп).`,
      image: '/services/repair/image-8.jpg',
    },
    {
      title: `Провисание полотна натяжного потолка`,
      text: `Такая ситуация возможна, если потолок был произведен из некачественных, как правило поддельных материалов китайского происхождения. Ремонт в таком случае невозможен и требуется замена всего потолка.`,
      image: '/services/repair/image-9.jpg',
    },
    // {
    //   name: `Залив воды внутрь натяжного потолка`,
    //   text: `Происходит в том случае, если квартира была залита водой сверху. Исправляется практически полностью, но только в том случае, если это не тканевый потолок. Не смотря на то, что ткань имеет пропитку специальным составом, она пропускает воду, и после остаются темные пятна, ничем не смываемые.`,
    //   image: '/services/repair/image-10.jpg',
    // },
    {
      title: `Разрез полотна`,
      text: `Как правило, происходит в процессе ремонта (монтаж высокой мебели, установка стенового карниза для штор под потолок, перенос каких-либо длинных или высоких предметов).`,
      image: '/services/repair/image-11.jpg',
    },
  ] as const);

  protected readonly works = signal<{ title: string; text: string }[]>([
    {
      title: 'Заявка и консультация',
      text: `Свяжитесь с нами или отправьте фото повреждения. Менеджер оценит ситуацию за 15 минут и подскажет примерную ремонт натяжного потолка стоимость.`,
    },
    {
      title: 'Выезд мастера',
      text: `Специалист приезжает и проводит диагностику и составляет точную смету. Мы учитываем тип полотна — ПВХ или тканевый — и площадь потолка, чтобы предложить оптимальный вариант.`,
    },
    // { title: 'Подготовка', text: `При необходимости частично демонтируем натяжное полотно.` },
    {
      title: 'Основные работы',
      text: `Устраняем дефект: выполняем ремонт слив после затопления, устраняем ремонт пореза заплаткой или перетягиваем полотно. Для ремонта натяжных потолков после пореза цена зависит от размера, но мы всегда фиксируем ее в договоре.`,
    },
    {
      title: 'Финальная проверка и сдача',
      text: `Проверяем ровность и герметичность, убираем за собой. Вы принимаете работу и получаете гарантию. Весь процесс занимает от 1 часа до дня, в зависимости от сложности.`,
    },
  ]);
}
