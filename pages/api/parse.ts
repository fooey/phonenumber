// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PhoneNumber, PhoneNumberUtil } from 'google-libphonenumber';
import { castArray } from 'lodash-es';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from 'types/api';

type RequestData = {
  number: string | undefined;
  region: string | undefined;
};

type ResponsePhoneNumber = {
  countryCode: number | undefined;
  countryCodeOrDefault: number;
  hasCountryCode: boolean;
  countryCodeCount: number;
  nationalNumber: number | undefined;
  nationalNumberOrDefault: number;
  hasNationalNumber: boolean;
  nationalNumberCount: number;

  extension: string | undefined;
  extensionOrDefault: string;
  hasExtension: boolean;
  extensionCount: number;

  italianLeadingZero: boolean | undefined;
  italianLeadingZeroOrDefault: boolean;
  hasItalianLeadingZero: boolean;
  italianLeadingZeroCount: number;

  numberOfLeadingZeros: number | undefined;
  numberOfLeadingZerosOrDefault: number;
  hasNumberOfLeadingZeros: boolean;
  numberOfLeadingZerosCount: number;

  rawInput: string | undefined;
  rawInputOrDefault: string;
  hasRawInput: boolean;
  rawInputCount: number;

  countryCodeSource: PhoneNumber.CountryCodeSource | undefined;
  countryCodeSourceOrDefault: PhoneNumber.CountryCodeSource;
  hasCountryCodeSource: boolean;
  countryCodeSourceCount: number;

  preferredDomesticCarrierCode: string | undefined;
  preferredDomesticCarrierCodeOrDefault: string;
  hasPreferredDomesticCarrierCode: boolean;
  preferredDomesticCarrierCodeCount: number;
};

type ResponseData = {
  phoneNumber: ResponsePhoneNumber;
};

const getApiPhoneNumber = (phoneNumber: PhoneNumber): ResponsePhoneNumber => {
  return {
    countryCode: phoneNumber.getCountryCode(),
    countryCodeOrDefault: phoneNumber.getCountryCodeOrDefault(),
    hasCountryCode: phoneNumber.hasCountryCode(),
    countryCodeCount: phoneNumber.countryCodeCount(),
    nationalNumber: phoneNumber.getNationalNumber(),
    nationalNumberOrDefault: phoneNumber.getNationalNumberOrDefault(),
    hasNationalNumber: phoneNumber.hasNationalNumber(),
    nationalNumberCount: phoneNumber.nationalNumberCount(),

    extension: phoneNumber.getExtension(),
    extensionOrDefault: phoneNumber.getExtensionOrDefault(),
    hasExtension: phoneNumber.hasExtension(),
    extensionCount: phoneNumber.extensionCount(),

    italianLeadingZero: phoneNumber.getItalianLeadingZero(),
    italianLeadingZeroOrDefault: phoneNumber.getItalianLeadingZeroOrDefault(),
    hasItalianLeadingZero: phoneNumber.hasItalianLeadingZero(),
    italianLeadingZeroCount: phoneNumber.italianLeadingZeroCount(),

    numberOfLeadingZeros: phoneNumber.getNumberOfLeadingZeros(),
    numberOfLeadingZerosOrDefault: phoneNumber.getNumberOfLeadingZerosOrDefault(),
    hasNumberOfLeadingZeros: phoneNumber.hasNumberOfLeadingZeros(),
    numberOfLeadingZerosCount: phoneNumber.numberOfLeadingZerosCount(),

    rawInput: phoneNumber.getRawInput(),
    rawInputOrDefault: phoneNumber.getRawInputOrDefault(),
    hasRawInput: phoneNumber.hasRawInput(),
    rawInputCount: phoneNumber.rawInputCount(),

    countryCodeSource: phoneNumber.getCountryCodeSource(),
    countryCodeSourceOrDefault: phoneNumber.getCountryCodeSourceOrDefault(),
    hasCountryCodeSource: phoneNumber.hasCountryCodeSource(),
    countryCodeSourceCount: phoneNumber.countryCodeSourceCount(),

    preferredDomesticCarrierCode: phoneNumber.getPreferredDomesticCarrierCode(),
    preferredDomesticCarrierCodeOrDefault: phoneNumber.getPreferredDomesticCarrierCodeOrDefault(),
    hasPreferredDomesticCarrierCode: phoneNumber.hasPreferredDomesticCarrierCode(),
    preferredDomesticCarrierCodeCount: phoneNumber.preferredDomesticCarrierCodeCount(),
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<ResponseData>>) {
  const params = getParams(req);
  console.log(`🚀 ~ file: parse.ts ~ line 18 ~ handler ~ params`, params);
  const phoneUtil = PhoneNumberUtil.getInstance();
  const response: ApiResponse<ResponseData> = {
    success: true,
    data: undefined,
  };

  try {
    const parsedNumber = phoneUtil.parse(params.number, params.region);
    const phoneNumber = getApiPhoneNumber(parsedNumber);
    response.data = { phoneNumber };
  } catch (e: unknown) {
    console.log(`🚀 ~ file: parse.ts ~ line 113 ~ handler ~ e`, e);
    response.success = false;
    response.data = { error: e };
  }

  res.status(200).json(response);
}

const getParams = (req: NextApiRequest): Partial<RequestData> => {
  const params = {
    number: undefined,
    region: undefined,
  };

  console.log(`🚀 ~ file: parse.ts ~ line 130 ~ req.query`, req.query);
  if (req.method === 'GET') {
    params.number = castArray(req.query.number).shift();
    params.region = castArray(req.query.region).shift();
  }

  return params;
};
