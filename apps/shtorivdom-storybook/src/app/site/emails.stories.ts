import type { Meta, StoryObj } from '@storybook/angular';
import { EMAIL_KINDS, EmailPreview } from './email-preview';
import { siteDecorators } from './site-story';

const meta: Meta<EmailPreview> = {
  title: 'Сайт/Письма',
  component: EmailPreview,
  decorators: siteDecorators,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    kind: { name: 'тип заявки', control: 'select', options: EMAIL_KINDS },
    to: { name: 'кому', control: 'inline-radio', options: ['salon', 'client'] },
  },
};
export default meta;

type Story = StoryObj<EmailPreview>;

export const ВСалонОбратныйЗвонок: Story = { name: 'В салон: обратный звонок (callback)', args: { kind: 'callback', to: 'salon' } };
export const ВСалонДизайнер: Story = { name: 'В салон: пригласить дизайнера (designer)', args: { kind: 'designer', to: 'salon' } };
export const ВСалонЗаказ: Story = { name: 'В салон: заказ штор (order)', args: { kind: 'order', to: 'salon' } };
export const ВСалонВопрос: Story = { name: 'В салон: вопрос с контактов (contact)', args: { kind: 'contact', to: 'salon' } };
export const ВСалонПартнёр: Story = { name: 'В салон: анкета партнёра (partner)', args: { kind: 'partner', to: 'salon' } };
export const ВСалонКарниз: Story = { name: 'В салон: заказ карниза (curtain-rod)', args: { kind: 'curtain-rod', to: 'salon' } };
export const КлиентуОбратныйЗвонок: Story = { name: 'Клиенту: обратный звонок (нет email)', args: { kind: 'callback', to: 'client' } };
export const КлиентуДизайнер: Story = { name: 'Клиенту: пригласить дизайнера (нет email)', args: { kind: 'designer', to: 'client' } };
export const КлиентуЗаказ: Story = { name: 'Клиенту: заказ штор', args: { kind: 'order', to: 'client' } };
export const КлиентуВопрос: Story = { name: 'Клиенту: вопрос', args: { kind: 'contact', to: 'client' } };
export const КлиентуПартнёр: Story = { name: 'Клиенту: анкета партнёра', args: { kind: 'partner', to: 'client' } };
export const КлиентуКарниз: Story = { name: 'Клиенту: заказ карниза', args: { kind: 'curtain-rod', to: 'client' } };
