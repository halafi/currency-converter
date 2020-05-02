const SET_BASE_CURRENCY = 'SET_BASE_CURRENCY';
const SET_TARGET_CURRENCY = 'SET_TARGET_CURRENCY';
const SET_BASE_AMOUNT = 'SET_BASE_AMOUNT';
const SET_TARGET_AMOUNT = 'SET_TARGET_AMOUNT';
const SET_ERROR = 'SET_ERROR';

type SetBaseCurrencyAction = {
  type: typeof SET_BASE_CURRENCY;
  payload: {
    baseCur: string;
  };
};

type SetTargetCurrencyAction = {
  type: typeof SET_TARGET_CURRENCY;
  payload: {
    targetCur: string;
  };
};

type SetBaseAmountAction = {
  type: typeof SET_BASE_AMOUNT;
  payload: {
    baseAmount: string;
  };
};
type SetTargetAmountAction = {
  type: typeof SET_TARGET_AMOUNT;
  payload: {
    targetAmount: string;
  };
};

type SetErrorAction = {
  type: typeof SET_ERROR;
  payload: {
    error: string;
  };
};

export const setBaseCurrency = (cur: string): SetBaseCurrencyAction => ({
  type: SET_BASE_CURRENCY,
  payload: { baseCur: cur },
});

export const setTargetCurrency = (cur: string): SetTargetCurrencyAction => ({
  type: SET_TARGET_CURRENCY,
  payload: { targetCur: cur },
});

export const setBaseAmount = (amount: string): SetBaseAmountAction => ({
  type: SET_BASE_AMOUNT,
  payload: { baseAmount: amount },
});

export const setTargetAmount = (amount: string): SetTargetAmountAction => ({
  type: SET_TARGET_AMOUNT,
  payload: { targetAmount: amount },
});

export const setError = (error: string): SetErrorAction => ({
  type: SET_ERROR,
  payload: { error },
});

export type ConverterActions =
  | SetBaseCurrencyAction
  | SetTargetCurrencyAction
  | SetBaseAmountAction
  | SetTargetAmountAction
  | SetErrorAction;

export type State = {
  baseCur: string;
  targetCur: string;
  baseAmount: string;
  targetAmount: string;
  error: string;
};

const converterReducer = (oldState: State, action: ConverterActions): State => {
  switch (action.type) {
    case SET_BASE_CURRENCY:
      return { ...oldState, baseCur: action.payload.baseCur };
    case SET_TARGET_CURRENCY:
      return { ...oldState, targetCur: action.payload.targetCur };
    case SET_BASE_AMOUNT:
      return { ...oldState, baseAmount: action.payload.baseAmount, error: '' };
    case SET_TARGET_AMOUNT:
      return { ...oldState, targetAmount: action.payload.targetAmount, error: '' };
    case SET_ERROR:
      return { ...oldState, error: action.payload.error };
    default:
      throw new Error();
  }
};

export default converterReducer;
