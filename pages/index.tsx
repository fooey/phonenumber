/* eslint-disable @next/next/no-img-element */
import { PhoneNumberUtil } from 'google-libphonenumber';
import { kebabCase } from 'lodash-es';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const phoneUtil = PhoneNumberUtil.getInstance();
const number = phoneUtil.parseAndKeepRawInput('202-456-1414', 'US');

interface IMethod {
  name: string;
  slug: string;
  args: IArg[];
  description: string;
  returns: string;
}

interface IArg {
  name: string;
  slug: string;
  type: string;
  required: boolean;
}

const definitions = [
  `extractCountryCode(fullNumber: StringBuffer, nationalNumber: StringBuffer): number`,
  `format(phoneNumber: PhoneNumber, format: PhoneNumberFormat): string`,
  `formatInOriginalFormat(phoneNumber: PhoneNumber, regionDialingFrom?: string): string`,
  `formatOutOfCountryCallingNumber(phoneNumber: PhoneNumber, regionDialingFrom?: string): string`,
  `getNddPrefixForRegion(regionCode?: string, stripNonDigits?: boolean): string | undefined`,
  `getNumberType(phoneNumber: PhoneNumber): PhoneNumberType`,
  `getCountryCodeForRegion(supportedRegion: string): number`,
  `getExampleNumber(regionCode: string): PhoneNumber`,
  `getExampleNumberForType(regionCode: string, type: PhoneNumberType): PhoneNumber`,
  `getRegionCodeForCountryCode(countryCallingCode: number): string`,
  `getRegionCodeForNumber(phoneNumber: PhoneNumber): string | undefined`,
  `getSupportedRegions(): string[]`,
  `isAlphaNumber(number: string): boolean`,
  `isLeadingZeroPossible(countryCallingCode: number): boolean`,
  `isNANPACountry(regionCode?: string): boolean`,
  `isPossibleNumber(number: PhoneNumber): boolean`,
  `isPossibleNumber(phoneNumber: PhoneNumber): boolean`,
  `isPossibleNumberForType(number: PhoneNumber, type: PhoneNumberType): boolean`,
  `isPossibleNumberForTypeWithReason(number: PhoneNumber, type: PhoneNumberType): PhoneNumberUtil.ValidationResult`,
  `isPossibleNumberString(number: string, regionDialingFrom: string): boolean`,
  `isPossibleNumberWithReason(number: PhoneNumber): PhoneNumberUtil.ValidationResult`,
  `isPossibleNumberWithReason(phoneNumber: PhoneNumber): PhoneNumberUtil.ValidationResult`,
  `isValidNumber(phoneNumber: PhoneNumber): boolean`,
  `isValidNumberForRegion(phoneNumber: PhoneNumber, region?: string): boolean`,
  `parse(number?: string, region?: string): PhoneNumber`,
  `parseAndKeepRawInput(number: string, regionCode?: string): PhoneNumber`,
  `truncateTooLongNumber(number: PhoneNumber): boolean`,
  `isNumberMatch(firstNumber: string | PhoneNumber, secondNumber: string | PhoneNumber): PhoneNumberUtil.MatchType`,
  `getLengthOfGeographicalAreaCode(number: PhoneNumber): number`,
  `getNationalSignificantNumber(number: PhoneNumber): string`,
];

const methods = [
  {
    name: 'parse',
    returns: 'PhoneNumber',
    args: [
      { name: 'number', type: 'string', required: false },
      { name: 'numberFormat', type: 'PhoneNumberFormat', required: true },
    ],
    description: `parses a string and returns it in proto buffer format`,
  },
  {
    name: 'parseAndKeepRawInput',
    returns: 'PhoneNumber',
    args: [
      { name: 'number', type: 'string', required: true },
      { name: 'regionCode', type: 'string', required: true },
    ],
    description: `parses a string and returns it in proto buffer format while keeping the raw input value`,
  },
  {
    name: 'format',
    returns: 'string',
    args: [
      { name: 'number', type: 'PhoneNumber', required: true },
      { name: 'numberFormat', type: 'PhoneNumberFormat', required: true },
    ],
    description: `formats a phone number in the specified format using default rules`,
  },
  {
    name: 'formatInOriginalFormat',
    returns: 'string',
    args: [
      { name: 'number', type: 'PhoneNumber', required: true },
      { name: 'regionCallingFrom', type: 'string', required: false },
    ],
    description: `formats a phone number using the original phone number format that the number is parsed from`,
  },
  {
    name: 'formatOutOfCountryCallingNumber',
    returns: 'string',
    args: [
      { name: 'number', type: 'PhoneNumber', required: true },
      { name: 'regionCallingFrom', type: 'string', required: false },
    ],
    description: `formats a phone number using the original phone number format that the number is parsed from`,
  },
].map((partialMethod) => {
  const args = partialMethod.args.map((partialArg) => ({
    ...partialArg,
    slug: kebabCase(partialArg.name),
  }));

  const method: IMethod = {
    ...partialMethod,
    args,
    slug: kebabCase(partialMethod.name),
  };
  return method;
});

const Home: NextPage = () => {
  return (
    <div className={``}>
      <Head>
        <title>phonenumber</title>
        <meta name="description" content="lib-phonenumber" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <aside>
          <ul className={`text-sm list-disc list-inside`}>
            {methods.map(({ slug }) => (
              <li key={slug}>
                <a href={`#${slug}`}>{slug}</a>
              </li>
            ))}
          </ul>
        </aside>
        <Examples methods={methods} />
        <TSDefinitions />
      </div>
    </div>
  );
};

const Examples: React.FC<{ methods: IMethod[] }> = ({ methods }) => (
  <div className={`my-4 `}>
    {methods.map((method: IMethod) => (
      <Example key={method.slug} method={method} />
    ))}
  </div>
);

const Example: React.FC<{ method: IMethod }> = ({ method }) => {
  return (
    <section key={method.slug} className={`my-8 `}>
      <form>
        <header className="space-y-2">
          <h1 id={method.slug} className="text-2xl">
            {method.slug}
          </h1>
          <h2 className="text-xs">{method.description}</h2>
          <h3 className={`font-mono text-sm space-y-2`}>
            <ul>
              {method.args.map((arg, i) => (
                <li key={arg.slug} className={``}>
                  <strong className={`font-bold`}>{arg.slug}</strong>
                  {`: `}
                  {arg.type}
                  {arg.required ? '' : <span className={`font-sans text-xs mx-2 text-gray-400`}>optional</span>}
                </li>
              ))}
            </ul>
            <div>
              <span className={`text-xs opacity-75`}>{` returns `}</span>
              <code className={`font-mono`}>{method.returns}</code>
            </div>
          </h3>
        </header>

        <table className={`mt-4`}>
          <thead>
            <tr className={`text-xs text-left`}>
              {method.args.map((arg: IArg) => (
                <th key={arg.slug} className={`font-light`}>
                  <label htmlFor={[method.slug, arg.slug].join('-')}>{arg.slug}</label>
                </th>
              ))}
              <th className={`font-light`}>
                <label className="block">method</label>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className={`space-x-2`}>
              {method.args.map((arg: IArg) => (
                <td key={arg.slug} className={``}>
                  <input
                    className=" focus:ring-indigo-500 m-0 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    id={[method.slug, arg.slug].join('-')}
                    name={arg.slug}
                    type="text"
                    placeholder={arg.slug}
                  />
                </td>
              ))}
              <td className={`space-x-1 p-1`}>
                <button
                  className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  GET
                </button>
                <button
                  className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  POST
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className={``}>
              <td colSpan={method.args.length + 1}>output: {phoneUtil.format(number)}</td>
            </tr>
          </tfoot>
        </table>
      </form>
    </section>
  );
};

const TSDefinitions: React.FC = () => {
  return <code className="whitespace-pre text-xs">{definitions.join('\n')}</code>;
};

export default Home;
