export const NAVBAR_TEXTS = [
  { page: "/merchants", text: "Merchants" },
  { page: "/pspMerchants", text: "Payment Service Providers" },
  { page: "/pspMerchantMethods", text: "Merchant Payment Methods" },
  { page: "/rules", text: "Routing Rules" },
];

export const navbarProps = [
  { link: "/merchants", text: "MERCHANTS" },
  { link: "/pspMerchants", text: "PAYMENT SERVICE PROVIDERS" },
  { link: "/pspMerchantMethods", text: "MERCHANT PAYMENT METHODS" },
  { link: "/rules", text: "ROUTING RULES" },
];

export const rulesProperties = [
  "priority",
  "name",
  "description",
  "paymentMethod",
  "merchant",
];

export const paymentMethodCategory1 = [
  "CORPORATE_CARD",
  "CREDIT_CARD",
  "DEBIT_CARD",
];

export const operandCategory1 = [
  "BIN_NUMBER",
  "CARD_SUB_TYPE",
  "CARD_NETWORK",
  "CARD_ISSUER",
  "AMOUNT"
];

export const cardSubTypes=["CONSUMER","BUSINESS"]

export const paymentMethodCategory2 = ["NET_BANKING"];

export const operandCategory2 = ["BANK", "AMOUNT"];

export const paymentMethodCategory3 = [
  "UPI",
  "MOBIKWIK",
  "PAYZAPP",
  "PAYZAPPV2",
  "SIMPL",
  "EMI",
];

export const operandCategory3 = ["VPA_HANDLE", "BANK", "AMOUNT"];

export const operatorValues = [
  "EQUAL_TO",
  "NOT_EQUAL_TO",
  "ONE_OF",
  "NOT_ONE_OF",
  "CONTAINS",
  "NOT_CONTAINS",
  "LESS THAN",
  "GREATER THAN",
];

export const merchantTableHeaders = [
  "ID",
  "CLIENT",
  "CREATED DATE",
  "ACTIVE STATUS",
  "NB MERCHANT ID",
];

export const merchantTableProperties = [
  "id",
  "client",
  "createdDate",
  "active",
  "nbMerchantId",
];

export const pspMerchantTableHeaders = [
  "ID",
  "CREATED DATE",
  "ACTIVE STATUS",
  "NB MERCHANT ID",
  "PSP",
];

export const pspMerchantTableProperties = [
  "id",
  "createdDate",
  "active",
  "nbMerchantId",
  "psp",
];

export const pspMerchantMethodTableHeaders = [
  "ID",
  "PAYMENT METHOD",
  "PSP",
  "ACTIVE STATUS",
  "CREATED DATE",
];

export const pspMerchantMethodTableProperties = [
  "id",
  "paymentMethod",
  "psp",
  "active",
  "createdDate",
];
