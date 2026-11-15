// Catálogo oficial de países del mundo para navegación orbital satelital 3D
export interface WorldCountry {
  code: string;
  name: string;
  nameEn: string;
  center: [number, number]; // [lng, lat]
  zoom: number;
}

export const WORLD_COUNTRIES: WorldCountry[] = [
  {
    "code": "AF",
    "name": "Afganistán",
    "nameEn": "Afghanistan",
    "center": [
      66.4966,
      34.1643
    ],
    "zoom": 5.8
  },
  {
    "code": "AL",
    "name": "Albania",
    "nameEn": "Albania",
    "center": [
      20.1138,
      40.6549
    ],
    "zoom": 5.8
  },
  {
    "code": "DE",
    "name": "Alemania",
    "nameEn": "Germany",
    "center": [
      9.6783,
      50.9617
    ],
    "zoom": 5.8
  },
  {
    "code": "AO",
    "name": "Angola",
    "nameEn": "Angola",
    "center": [
      17.9842,
      -12.1828
    ],
    "zoom": 5.8
  },
  {
    "code": "AQ",
    "name": "Antártida",
    "nameEn": "Antarctica",
    "center": [
      160.7,
      -77.8
    ],
    "zoom": 3.5
  },
  {
    "code": "SA",
    "name": "Arabia Saudita",
    "nameEn": "Saudi Arabia",
    "center": [
      44.6996,
      23.8069
    ],
    "zoom": 5.8
  },
  {
    "code": "DZ",
    "name": "Argelia",
    "nameEn": "Algeria",
    "center": [
      2.8082,
      27.3974
    ],
    "zoom": 4.2
  },
  {
    "code": "AR",
    "name": "Argentina",
    "nameEn": "Argentina",
    "center": [
      -65,
      -34
    ],
    "zoom": 5
  },
  {
    "code": "AM",
    "name": "Armenia",
    "nameEn": "Armenia",
    "center": [
      44.8006,
      40.4591
    ],
    "zoom": 5.8
  },
  {
    "code": "AU",
    "name": "Australia",
    "nameEn": "Australia",
    "center": [
      133.5,
      -25
    ],
    "zoom": 4.5
  },
  {
    "code": "AT",
    "name": "Austria",
    "nameEn": "Austria",
    "center": [
      14.1305,
      47.5189
    ],
    "zoom": 5.8
  },
  {
    "code": "AZ",
    "name": "Azerbaiyán",
    "nameEn": "Azerbaijan",
    "center": [
      47.211,
      40.4024
    ],
    "zoom": 5.8
  },
  {
    "code": "BS",
    "name": "Bahamas",
    "nameEn": "Bahamas",
    "center": [
      -77.1467,
      26.4018
    ],
    "zoom": 5.8
  },
  {
    "code": "BD",
    "name": "Bangladés",
    "nameEn": "Bangladesh",
    "center": [
      89.685,
      24.215
    ],
    "zoom": 4.2
  },
  {
    "code": "BE",
    "name": "Bélgica",
    "nameEn": "Belgium",
    "center": [
      4.8004,
      50.7854
    ],
    "zoom": 5.8
  },
  {
    "code": "BZ",
    "name": "Belice",
    "nameEn": "Belize",
    "center": [
      -88.713,
      17.2021
    ],
    "zoom": 5.8
  },
  {
    "code": "BJ",
    "name": "Benín",
    "nameEn": "Benin",
    "center": [
      2.352,
      10.3248
    ],
    "zoom": 5.8
  },
  {
    "code": "BY",
    "name": "Bielorrusia",
    "nameEn": "Belarus",
    "center": [
      28.4177,
      53.8219
    ],
    "zoom": 5.8
  },
  {
    "code": "MM",
    "name": "Birmania",
    "nameEn": "Myanmar",
    "center": [
      95.8045,
      21.5739
    ],
    "zoom": 5.8
  },
  {
    "code": "BO",
    "name": "Bolivia",
    "nameEn": "Bolivia",
    "center": [
      -66.8,
      -19.5
    ],
    "zoom": 6.2
  },
  {
    "code": "BA",
    "name": "Bosnia y Herzegovina",
    "nameEn": "Bosnia and Herz.",
    "center": [
      18.0684,
      44.0911
    ],
    "zoom": 5.8
  },
  {
    "code": "BW",
    "name": "Botsuana",
    "nameEn": "Botswana",
    "center": [
      24.1792,
      -22.1026
    ],
    "zoom": 5.8
  },
  {
    "code": "BR",
    "name": "Brasil",
    "nameEn": "Brazil",
    "center": [
      -49.5594,
      -12.0987
    ],
    "zoom": 4.5
  },
  {
    "code": "BN",
    "name": "Brunéi",
    "nameEn": "Brunei",
    "center": [
      114.5519,
      4.4483
    ],
    "zoom": 5.8
  },
  {
    "code": "BG",
    "name": "Bulgaria",
    "nameEn": "Bulgaria",
    "center": [
      25.1571,
      42.5088
    ],
    "zoom": 5.8
  },
  {
    "code": "BF",
    "name": "Burkina Faso",
    "nameEn": "Burkina Faso",
    "center": [
      -1.3639,
      12.673
    ],
    "zoom": 5.8
  },
  {
    "code": "BI",
    "name": "Burundi",
    "nameEn": "Burundi",
    "center": [
      29.9171,
      -3.3328
    ],
    "zoom": 5.8
  },
  {
    "code": "BT",
    "name": "Bután",
    "nameEn": "Bhutan",
    "center": [
      90.0403,
      27.5367
    ],
    "zoom": 5.8
  },
  {
    "code": "KH",
    "name": "Camboya",
    "nameEn": "Cambodia",
    "center": [
      104.5049,
      12.6476
    ],
    "zoom": 5.8
  },
  {
    "code": "CM",
    "name": "Camerún",
    "nameEn": "Cameroon",
    "center": [
      12.4735,
      4.585
    ],
    "zoom": 5.8
  },
  {
    "code": "CA",
    "name": "Canadá",
    "nameEn": "Canada",
    "center": [
      -95,
      60
    ],
    "zoom": 4.2
  },
  {
    "code": "QA",
    "name": "Catar",
    "nameEn": "Qatar",
    "center": [
      51.1435,
      25.2374
    ],
    "zoom": 5.8
  },
  {
    "code": "TD",
    "name": "Chad",
    "nameEn": "Chad",
    "center": [
      18.645,
      15.143
    ],
    "zoom": 5.8
  },
  {
    "code": "CL",
    "name": "Chile",
    "nameEn": "Chile",
    "center": [
      -69.8,
      -24.5
    ],
    "zoom": 6.5
  },
  {
    "code": "CN",
    "name": "China",
    "nameEn": "China",
    "center": [
      106.3373,
      32.4982
    ],
    "zoom": 4.2
  },
  {
    "code": "CY",
    "name": "Chipre",
    "nameEn": "Cyprus",
    "center": [
      33.0842,
      34.9133
    ],
    "zoom": 5.8
  },
  {
    "code": "CO",
    "name": "Colombia",
    "nameEn": "Colombia",
    "center": [
      -73.1743,
      3.3731
    ],
    "zoom": 5.8
  },
  {
    "code": "KP",
    "name": "Corea del Norte",
    "nameEn": "North Korea",
    "center": [
      126.4445,
      39.8853
    ],
    "zoom": 5.8
  },
  {
    "code": "KR",
    "name": "Corea del Sur",
    "nameEn": "South Korea",
    "center": [
      128.1295,
      36.3849
    ],
    "zoom": 5.8
  },
  {
    "code": "CI",
    "name": "Costa de Marfil",
    "nameEn": "Côte d'Ivoire",
    "center": [
      -5.5686,
      7.4914
    ],
    "zoom": 5.8
  },
  {
    "code": "CR",
    "name": "Costa Rica",
    "nameEn": "Costa Rica",
    "center": [
      -84.0779,
      10.0651
    ],
    "zoom": 5.8
  },
  {
    "code": "HR",
    "name": "Croacia",
    "nameEn": "Croatia",
    "center": [
      16.3724,
      45.8058
    ],
    "zoom": 5.8
  },
  {
    "code": "CU",
    "name": "Cuba",
    "nameEn": "Cuba",
    "center": [
      -77.9759,
      21.334
    ],
    "zoom": 5.8
  },
  {
    "code": "DK",
    "name": "Dinamarca",
    "nameEn": "Denmark",
    "center": [
      9.0182,
      55.967
    ],
    "zoom": 5.8
  },
  {
    "code": "EC",
    "name": "Ecuador",
    "nameEn": "Ecuador",
    "center": [
      -78.1884,
      -1.2591
    ],
    "zoom": 5.8
  },
  {
    "code": "EG",
    "name": "Egipto",
    "nameEn": "Egypt",
    "center": [
      29.4458,
      26.1862
    ],
    "zoom": 4.2
  },
  {
    "code": "SV",
    "name": "El Salvador",
    "nameEn": "El Salvador",
    "center": [
      -88.8901,
      13.6854
    ],
    "zoom": 5.8
  },
  {
    "code": "AE",
    "name": "Emiratos Árabes Unidos",
    "nameEn": "United Arab Emirates",
    "center": [
      54.5473,
      23.4663
    ],
    "zoom": 5.8
  },
  {
    "code": "ER",
    "name": "Eritrea",
    "nameEn": "Eritrea",
    "center": [
      38.2856,
      15.7874
    ],
    "zoom": 5.8
  },
  {
    "code": "SK",
    "name": "Eslovaquia",
    "nameEn": "Slovakia",
    "center": [
      19.0499,
      48.734
    ],
    "zoom": 5.8
  },
  {
    "code": "SI",
    "name": "Eslovenia",
    "nameEn": "Slovenia",
    "center": [
      14.9153,
      46.0608
    ],
    "zoom": 5.8
  },
  {
    "code": "ES",
    "name": "España",
    "nameEn": "Spain",
    "center": [
      -3.7,
      40
    ],
    "zoom": 6.5
  },
  {
    "code": "US",
    "name": "Estados Unidos",
    "nameEn": "United States of America",
    "center": [
      -98.5,
      39.8
    ],
    "zoom": 4.2
  },
  {
    "code": "EE",
    "name": "Estonia",
    "nameEn": "Estonia",
    "center": [
      25.8671,
      58.7249
    ],
    "zoom": 5.8
  },
  {
    "code": "ET",
    "name": "Etiopía",
    "nameEn": "Ethiopia",
    "center": [
      39.0886,
      8.0328
    ],
    "zoom": 4.2
  },
  {
    "code": "PH",
    "name": "Filipinas",
    "nameEn": "Philippines",
    "center": [
      122.465,
      11.198
    ],
    "zoom": 4.2
  },
  {
    "code": "FI",
    "name": "Finlandia",
    "nameEn": "Finland",
    "center": [
      27.2764,
      63.2524
    ],
    "zoom": 5.8
  },
  {
    "code": "FJ",
    "name": "Fiyi",
    "nameEn": "Fiji",
    "center": [
      177.9754,
      -17.8261
    ],
    "zoom": 5.8
  },
  {
    "code": "F",
    "name": "Francia",
    "nameEn": "France",
    "center": [
      2.5523,
      46.6961
    ],
    "zoom": 5.8
  },
  {
    "code": "GA",
    "name": "Gabón",
    "nameEn": "Gabon",
    "center": [
      11.8359,
      -0.4377
    ],
    "zoom": 5.8
  },
  {
    "code": "GM",
    "name": "Gambia",
    "nameEn": "Gambia",
    "center": [
      -14.9983,
      13.6417
    ],
    "zoom": 5.8
  },
  {
    "code": "GE",
    "name": "Georgia",
    "nameEn": "Georgia",
    "center": [
      43.7357,
      41.8701
    ],
    "zoom": 5.8
  },
  {
    "code": "GH",
    "name": "Ghana",
    "nameEn": "Ghana",
    "center": [
      -1.0369,
      7.7176
    ],
    "zoom": 5.8
  },
  {
    "code": "GR",
    "name": "Grecia",
    "nameEn": "Greece",
    "center": [
      21.7257,
      39.4928
    ],
    "zoom": 5.8
  },
  {
    "code": "GL",
    "name": "Groenlandia",
    "nameEn": "Greenland",
    "center": [
      -39.3353,
      74.3194
    ],
    "zoom": 4.2
  },
  {
    "code": "GT",
    "name": "Guatemala",
    "nameEn": "Guatemala",
    "center": [
      -90.4971,
      14.9821
    ],
    "zoom": 5.8
  },
  {
    "code": "GN",
    "name": "Guinea",
    "nameEn": "Guinea",
    "center": [
      -10.0164,
      10.6185
    ],
    "zoom": 5.8
  },
  {
    "code": "GQ",
    "name": "Guinea Ecuatorial",
    "nameEn": "Eq. Guinea",
    "center": [
      8.9902,
      2.333
    ],
    "zoom": 5.8
  },
  {
    "code": "GW",
    "name": "Guinea-Bisáu",
    "nameEn": "Guinea-Bissau",
    "center": [
      -14.5241,
      12.1637
    ],
    "zoom": 5.8
  },
  {
    "code": "GY",
    "name": "Guyana",
    "nameEn": "Guyana",
    "center": [
      -58.9426,
      5.1243
    ],
    "zoom": 5.8
  },
  {
    "code": "HT",
    "name": "Haití",
    "nameEn": "Haiti",
    "center": [
      -72.2241,
      19.2638
    ],
    "zoom": 5.8
  },
  {
    "code": "HN",
    "name": "Honduras",
    "nameEn": "Honduras",
    "center": [
      -86.8876,
      14.7948
    ],
    "zoom": 5.8
  },
  {
    "code": "HU",
    "name": "Hungría",
    "nameEn": "Hungary",
    "center": [
      19.4479,
      47.0868
    ],
    "zoom": 5.8
  },
  {
    "code": "IN",
    "name": "India",
    "nameEn": "India",
    "center": [
      79.3581,
      22.6869
    ],
    "zoom": 4.2
  },
  {
    "code": "ID",
    "name": "Indonesia",
    "nameEn": "Indonesia",
    "center": [
      101.8929,
      -0.9544
    ],
    "zoom": 4.2
  },
  {
    "code": "IQ",
    "name": "Irak",
    "nameEn": "Iraq",
    "center": [
      43.2618,
      33.094
    ],
    "zoom": 5.8
  },
  {
    "code": "IR",
    "name": "Irán",
    "nameEn": "Iran",
    "center": [
      54.9315,
      32.1662
    ],
    "zoom": 5.8
  },
  {
    "code": "IE",
    "name": "Irlanda",
    "nameEn": "Ireland",
    "center": [
      -7.7986,
      53.0787
    ],
    "zoom": 5.8
  },
  {
    "code": "IS",
    "name": "Islandia",
    "nameEn": "Iceland",
    "center": [
      -18.5,
      64.9
    ],
    "zoom": 6.8
  },
  {
    "code": "FK",
    "name": "Islas Malvinas",
    "nameEn": "Falkland Is.",
    "center": [
      -58.7386,
      -51.6089
    ],
    "zoom": 5.8
  },
  {
    "code": "SB",
    "name": "Islas Salomón",
    "nameEn": "Solomon Is.",
    "center": [
      159.1705,
      -8.0295
    ],
    "zoom": 5.8
  },
  {
    "code": "IL",
    "name": "Israel",
    "nameEn": "Israel",
    "center": [
      34.8479,
      30.9111
    ],
    "zoom": 5.8
  },
  {
    "code": "IT",
    "name": "Italia",
    "nameEn": "Italy",
    "center": [
      11.0769,
      44.7325
    ],
    "zoom": 5.8
  },
  {
    "code": "JM",
    "name": "Jamaica",
    "nameEn": "Jamaica",
    "center": [
      -77.3188,
      18.1371
    ],
    "zoom": 5.8
  },
  {
    "code": "JP",
    "name": "Japón",
    "nameEn": "Japan",
    "center": [
      138.4422,
      36.1425
    ],
    "zoom": 4.2
  },
  {
    "code": "JO",
    "name": "Jordania",
    "nameEn": "Jordan",
    "center": [
      36.376,
      30.805
    ],
    "zoom": 5.8
  },
  {
    "code": "KZ",
    "name": "Kazajistán",
    "nameEn": "Kazakhstan",
    "center": [
      68.6855,
      49.0541
    ],
    "zoom": 4.2
  },
  {
    "code": "KE",
    "name": "Kenia",
    "nameEn": "Kenya",
    "center": [
      37.9076,
      0.549
    ],
    "zoom": 5.8
  },
  {
    "code": "KG",
    "name": "Kirguistán",
    "nameEn": "Kyrgyzstan",
    "center": [
      74.5326,
      41.6685
    ],
    "zoom": 5.8
  },
  {
    "code": "KO",
    "name": "Kosovo",
    "nameEn": "Kosovo",
    "center": [
      20.8607,
      42.5936
    ],
    "zoom": 5.8
  },
  {
    "code": "KW",
    "name": "Kuwait",
    "nameEn": "Kuwait",
    "center": [
      47.314,
      29.4136
    ],
    "zoom": 5.8
  },
  {
    "code": "LA",
    "name": "Laos",
    "nameEn": "Laos",
    "center": [
      102.5339,
      19.4318
    ],
    "zoom": 5.8
  },
  {
    "code": "LS",
    "name": "Lesoto",
    "nameEn": "Lesotho",
    "center": [
      28.2466,
      -29.4802
    ],
    "zoom": 5.8
  },
  {
    "code": "LV",
    "name": "Letonia",
    "nameEn": "Latvia",
    "center": [
      25.4587,
      57.0669
    ],
    "zoom": 5.8
  },
  {
    "code": "LB",
    "name": "Líbano",
    "nameEn": "Lebanon",
    "center": [
      35.9929,
      34.1334
    ],
    "zoom": 5.8
  },
  {
    "code": "LR",
    "name": "Liberia",
    "nameEn": "Liberia",
    "center": [
      -9.4604,
      6.4472
    ],
    "zoom": 5.8
  },
  {
    "code": "LY",
    "name": "Libia",
    "nameEn": "Libya",
    "center": [
      18.011,
      26.6389
    ],
    "zoom": 5.8
  },
  {
    "code": "LT",
    "name": "Lituania",
    "nameEn": "Lithuania",
    "center": [
      24.0899,
      55.1037
    ],
    "zoom": 5.8
  },
  {
    "code": "LU",
    "name": "Luxemburgo",
    "nameEn": "Luxembourg",
    "center": [
      6.0776,
      49.7337
    ],
    "zoom": 5.8
  },
  {
    "code": "MK",
    "name": "Macedonia del Norte",
    "nameEn": "North Macedonia",
    "center": [
      21.5558,
      41.5582
    ],
    "zoom": 5.8
  },
  {
    "code": "MG",
    "name": "Madagascar",
    "nameEn": "Madagascar",
    "center": [
      46.7042,
      -18.6283
    ],
    "zoom": 5.8
  },
  {
    "code": "MY",
    "name": "Malasia",
    "nameEn": "Malaysia",
    "center": [
      113.8371,
      2.5287
    ],
    "zoom": 5.8
  },
  {
    "code": "MW",
    "name": "Malaui",
    "nameEn": "Malawi",
    "center": [
      33.6081,
      -13.3867
    ],
    "zoom": 5.8
  },
  {
    "code": "ML",
    "name": "Malí",
    "nameEn": "Mali",
    "center": [
      -2.0385,
      18.6927
    ],
    "zoom": 5.8
  },
  {
    "code": "MA",
    "name": "Marruecos",
    "nameEn": "Morocco",
    "center": [
      -7.1873,
      31.6507
    ],
    "zoom": 5.8
  },
  {
    "code": "MR",
    "name": "Mauritania",
    "nameEn": "Mauritania",
    "center": [
      -9.7403,
      19.5871
    ],
    "zoom": 5.8
  },
  {
    "code": "MX",
    "name": "México",
    "nameEn": "Mexico",
    "center": [
      -102.2894,
      23.92
    ],
    "zoom": 5.2
  },
  {
    "code": "MD",
    "name": "Moldavia",
    "nameEn": "Moldova",
    "center": [
      28.4879,
      47.435
    ],
    "zoom": 5.8
  },
  {
    "code": "MN",
    "name": "Mongolia",
    "nameEn": "Mongolia",
    "center": [
      104.1504,
      45.9975
    ],
    "zoom": 5.8
  },
  {
    "code": "ME",
    "name": "Montenegro",
    "nameEn": "Montenegro",
    "center": [
      19.1437,
      42.8031
    ],
    "zoom": 5.8
  },
  {
    "code": "MZ",
    "name": "Mozambique",
    "nameEn": "Mozambique",
    "center": [
      37.8379,
      -13.9432
    ],
    "zoom": 5.8
  },
  {
    "code": "NA",
    "name": "Namibia",
    "nameEn": "Namibia",
    "center": [
      17.1082,
      -20.5753
    ],
    "zoom": 5.8
  },
  {
    "code": "NP",
    "name": "Nepal",
    "nameEn": "Nepal",
    "center": [
      83.6399,
      28.2979
    ],
    "zoom": 5.8
  },
  {
    "code": "NI",
    "name": "Nicaragua",
    "nameEn": "Nicaragua",
    "center": [
      -85.0693,
      12.6707
    ],
    "zoom": 5.8
  },
  {
    "code": "NE",
    "name": "Níger",
    "nameEn": "Niger",
    "center": [
      9.5044,
      17.4462
    ],
    "zoom": 5.8
  },
  {
    "code": "NG",
    "name": "Nigeria",
    "nameEn": "Nigeria",
    "center": [
      7.5032,
      9.4398
    ],
    "zoom": 4.2
  },
  {
    "code": "N",
    "name": "Noruega",
    "nameEn": "Norway",
    "center": [
      9.68,
      61.3571
    ],
    "zoom": 5.8
  },
  {
    "code": "NC",
    "name": "Nueva Caledonia",
    "nameEn": "New Caledonia",
    "center": [
      165.084,
      -21.0647
    ],
    "zoom": 5.8
  },
  {
    "code": "NZ",
    "name": "Nueva Zelanda",
    "nameEn": "New Zealand",
    "center": [
      172.787,
      -39.759
    ],
    "zoom": 5.8
  },
  {
    "code": "OM",
    "name": "Omán",
    "nameEn": "Oman",
    "center": [
      57.3366,
      22.1204
    ],
    "zoom": 5.8
  },
  {
    "code": "NL",
    "name": "Países Bajos",
    "nameEn": "Netherlands",
    "center": [
      5.6114,
      52.4222
    ],
    "zoom": 5.8
  },
  {
    "code": "PK",
    "name": "Pakistán",
    "nameEn": "Pakistan",
    "center": [
      68.5456,
      29.3284
    ],
    "zoom": 4.2
  },
  {
    "code": "PS",
    "name": "Palestina",
    "nameEn": "Palestine",
    "center": [
      35.2913,
      32.0474
    ],
    "zoom": 5.8
  },
  {
    "code": "PA",
    "name": "Panamá",
    "nameEn": "Panama",
    "center": [
      -80.3521,
      8.722
    ],
    "zoom": 5.8
  },
  {
    "code": "PG",
    "name": "Papúa Nueva Guinea",
    "nameEn": "Papua New Guinea",
    "center": [
      143.9102,
      -5.6953
    ],
    "zoom": 5.8
  },
  {
    "code": "PY",
    "name": "Paraguay",
    "nameEn": "Paraguay",
    "center": [
      -60.1464,
      -21.6745
    ],
    "zoom": 5.8
  },
  {
    "code": "PE",
    "name": "Perú",
    "nameEn": "Peru",
    "center": [
      -75,
      -9.5
    ],
    "zoom": 5.8
  },
  {
    "code": "PL",
    "name": "Polonia",
    "nameEn": "Poland",
    "center": [
      19.4905,
      51.9903
    ],
    "zoom": 5.8
  },
  {
    "code": "PT",
    "name": "Portugal",
    "nameEn": "Portugal",
    "center": [
      -8.2718,
      39.6067
    ],
    "zoom": 5.8
  },
  {
    "code": "PR",
    "name": "Puerto Rico",
    "nameEn": "Puerto Rico",
    "center": [
      -66.4811,
      18.2347
    ],
    "zoom": 5.8
  },
  {
    "code": "GB",
    "name": "Reino Unido",
    "nameEn": "United Kingdom",
    "center": [
      -2.1163,
      54.4027
    ],
    "zoom": 5.8
  },
  {
    "code": "CF",
    "name": "República Centroafricana",
    "nameEn": "Central African Rep.",
    "center": [
      20.9069,
      6.9897
    ],
    "zoom": 5.8
  },
  {
    "code": "CZ",
    "name": "República Checa",
    "nameEn": "Czechia",
    "center": [
      15.3776,
      49.8824
    ],
    "zoom": 5.8
  },
  {
    "code": "CN-TW",
    "name": "República de China",
    "nameEn": "Taiwan",
    "center": [
      120.8682,
      23.6524
    ],
    "zoom": 5.8
  },
  {
    "code": "CG",
    "name": "República del Congo",
    "nameEn": "Congo",
    "center": [
      15.9005,
      0.1423
    ],
    "zoom": 5.8
  },
  {
    "code": "CD",
    "name": "República Democrática del Congo",
    "nameEn": "Dem. Rep. Congo",
    "center": [
      23.4588,
      -1.8582
    ],
    "zoom": 4.2
  },
  {
    "code": "DO",
    "name": "República Dominicana",
    "nameEn": "Dominican Rep.",
    "center": [
      -70.654,
      19.1041
    ],
    "zoom": 5.8
  },
  {
    "code": "CN",
    "name": "República Turca del Norte de Chipre",
    "nameEn": "N. Cyprus",
    "center": [
      33.6924,
      35.2161
    ],
    "zoom": 5.8
  },
  {
    "code": "RW",
    "name": "Ruanda",
    "nameEn": "Rwanda",
    "center": [
      30.1039,
      -1.8972
    ],
    "zoom": 5.8
  },
  {
    "code": "RO",
    "name": "Rumania",
    "nameEn": "Romania",
    "center": [
      24.9726,
      45.7332
    ],
    "zoom": 5.8
  },
  {
    "code": "RU",
    "name": "Rusia",
    "nameEn": "Russia",
    "center": [
      44.6865,
      58.2494
    ],
    "zoom": 3.2
  },
  {
    "code": "EH",
    "name": "Sahara Occidental",
    "nameEn": "W. Sahara",
    "center": [
      -12.6303,
      23.9676
    ],
    "zoom": 5.8
  },
  {
    "code": "SN",
    "name": "Senegal",
    "nameEn": "Senegal",
    "center": [
      -14.7786,
      15.1381
    ],
    "zoom": 5.8
  },
  {
    "code": "RS",
    "name": "Serbia",
    "nameEn": "Serbia",
    "center": [
      20.788,
      44.1899
    ],
    "zoom": 5.8
  },
  {
    "code": "SL",
    "name": "Sierra Leona",
    "nameEn": "Sierra Leone",
    "center": [
      -11.7637,
      8.6174
    ],
    "zoom": 5.8
  },
  {
    "code": "SY",
    "name": "Siria",
    "nameEn": "Syria",
    "center": [
      38.2778,
      35.0066
    ],
    "zoom": 5.8
  },
  {
    "code": "SO",
    "name": "Somalia",
    "nameEn": "Somalia",
    "center": [
      45.1924,
      3.5689
    ],
    "zoom": 5.8
  },
  {
    "code": "SL",
    "name": "Somalilandia",
    "nameEn": "Somaliland",
    "center": [
      46.7316,
      9.4439
    ],
    "zoom": 5.8
  },
  {
    "code": "LK",
    "name": "Sri Lanka",
    "nameEn": "Sri Lanka",
    "center": [
      80.7048,
      7.5811
    ],
    "zoom": 5.8
  },
  {
    "code": "SZ",
    "name": "Suazilandia",
    "nameEn": "eSwatini",
    "center": [
      31.4673,
      -26.5337
    ],
    "zoom": 5.8
  },
  {
    "code": "ZA",
    "name": "Sudáfrica",
    "nameEn": "South Africa",
    "center": [
      23.6657,
      -29.7088
    ],
    "zoom": 5.8
  },
  {
    "code": "SD",
    "name": "Sudán",
    "nameEn": "Sudan",
    "center": [
      29.2607,
      16.3307
    ],
    "zoom": 5.8
  },
  {
    "code": "SS",
    "name": "Sudán del Sur",
    "nameEn": "S. Sudan",
    "center": [
      30.3902,
      7.2305
    ],
    "zoom": 5.8
  },
  {
    "code": "SE",
    "name": "Suecia",
    "nameEn": "Sweden",
    "center": [
      19.0171,
      65.8592
    ],
    "zoom": 5.8
  },
  {
    "code": "CH",
    "name": "Suiza",
    "nameEn": "Switzerland",
    "center": [
      7.464,
      46.7191
    ],
    "zoom": 5.8
  },
  {
    "code": "SR",
    "name": "Surinam",
    "nameEn": "Suriname",
    "center": [
      -55.9109,
      4.144
    ],
    "zoom": 5.8
  },
  {
    "code": "TH",
    "name": "Tailandia",
    "nameEn": "Thailand",
    "center": [
      101.0732,
      15.4597
    ],
    "zoom": 5.8
  },
  {
    "code": "TZ",
    "name": "Tanzania",
    "nameEn": "Tanzania",
    "center": [
      34.9592,
      -6.0519
    ],
    "zoom": 5.8
  },
  {
    "code": "TJ",
    "name": "Tayikistán",
    "nameEn": "Tajikistan",
    "center": [
      72.5873,
      38.1998
    ],
    "zoom": 5.8
  },
  {
    "code": "TF",
    "name": "Tierras Australes y Antárticas Francesas",
    "nameEn": "Fr. S. Antarctic Lands",
    "center": [
      69.1221,
      -49.3037
    ],
    "zoom": 5.8
  },
  {
    "code": "TL",
    "name": "Timor Oriental",
    "nameEn": "Timor-Leste",
    "center": [
      125.8547,
      -8.8037
    ],
    "zoom": 5.8
  },
  {
    "code": "TG",
    "name": "Togo",
    "nameEn": "Togo",
    "center": [
      1.0581,
      8.8072
    ],
    "zoom": 5.8
  },
  {
    "code": "TT",
    "name": "Trinidad y Tobago",
    "nameEn": "Trinidad and Tobago",
    "center": [
      -60.9184,
      10.9989
    ],
    "zoom": 5.8
  },
  {
    "code": "TN",
    "name": "Túnez",
    "nameEn": "Tunisia",
    "center": [
      9.0079,
      33.6873
    ],
    "zoom": 5.8
  },
  {
    "code": "TM",
    "name": "Turkmenistán",
    "nameEn": "Turkmenistan",
    "center": [
      58.6766,
      39.8552
    ],
    "zoom": 5.8
  },
  {
    "code": "TR",
    "name": "Turquía",
    "nameEn": "Turkey",
    "center": [
      34.5083,
      39.3454
    ],
    "zoom": 5.8
  },
  {
    "code": "UA",
    "name": "Ucrania",
    "nameEn": "Ukraine",
    "center": [
      32.1409,
      49.7247
    ],
    "zoom": 5.8
  },
  {
    "code": "UG",
    "name": "Uganda",
    "nameEn": "Uganda",
    "center": [
      32.9486,
      1.9726
    ],
    "zoom": 5.8
  },
  {
    "code": "UY",
    "name": "Uruguay",
    "nameEn": "Uruguay",
    "center": [
      -55.9669,
      -32.9611
    ],
    "zoom": 5.8
  },
  {
    "code": "UZ",
    "name": "Uzbekistán",
    "nameEn": "Uzbekistan",
    "center": [
      64.0054,
      41.6936
    ],
    "zoom": 5.8
  },
  {
    "code": "VU",
    "name": "Vanuatu",
    "nameEn": "Vanuatu",
    "center": [
      166.9088,
      -15.3715
    ],
    "zoom": 5.8
  },
  {
    "code": "VE",
    "name": "Venezuela",
    "nameEn": "Venezuela",
    "center": [
      -64.5994,
      7.1825
    ],
    "zoom": 5.8
  },
  {
    "code": "VN",
    "name": "Vietnam",
    "nameEn": "Vietnam",
    "center": [
      105.3873,
      21.7154
    ],
    "zoom": 5.8
  },
  {
    "code": "YE",
    "name": "Yemen",
    "nameEn": "Yemen",
    "center": [
      45.8744,
      15.3282
    ],
    "zoom": 5.8
  },
  {
    "code": "DJ",
    "name": "Yibuti",
    "nameEn": "Djibouti",
    "center": [
      42.4988,
      11.9763
    ],
    "zoom": 5.8
  },
  {
    "code": "ZM",
    "name": "Zambia",
    "nameEn": "Zambia",
    "center": [
      26.3953,
      -14.6608
    ],
    "zoom": 5.8
  },
  {
    "code": "ZW",
    "name": "Zimbabue",
    "nameEn": "Zimbabwe",
    "center": [
      29.9254,
      -18.9116
    ],
    "zoom": 5.8
  }
];

export const GLOBAL_VIEW: { center: [number, number]; zoom: number } = {
  center: [-65.0, -18.0],
  zoom: 1.8,
};

export function getCountryView(countryName: string): { center: [number, number]; zoom: number } {
  if (countryName === "all" || countryName === "Global") {
    return GLOBAL_VIEW;
  }
  const match = WORLD_COUNTRIES.find(
    (c) =>
      c.name.toLowerCase() === countryName.toLowerCase() ||
      c.nameEn.toLowerCase() === countryName.toLowerCase()
  );
  if (match) {
    return { center: match.center, zoom: match.zoom };
  }
  return GLOBAL_VIEW;
}
