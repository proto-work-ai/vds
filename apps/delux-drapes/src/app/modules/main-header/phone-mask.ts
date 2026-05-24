import { maskitoPhoneOptionsGenerator } from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';

export const maskitoPhone = maskitoPhoneOptionsGenerator({ countryIsoCode: 'KZ', metadata });
