export type GlobalHeader = {
  totalAssets: string;
  costCapital: string;
  targetProfit: string;
  currentProfit: string;
};

export type PortfolioRow = {
  id: string;
  symbol: string;
  position: string;
  plannedPosition: string;
  currentPrice: string;
  costPrice: string;
  stopLossAmount: string;
  execBuyPrice: string;
  execDayPosition: string;
  execStopAmount: string;
};

export type PortfolioMetrics = {
  positionTotal: number | null;
  plannedEquivCost: number | null;
  pnl: number | null;
  recoveryPct: number | null;
  stopLossPrice: number | null;
  distancePct: number | null;
  alert: "正常" | "超预仓" | "破位预警";
  isBreach: boolean;
  isOverPosition: boolean;
  execStopPrice: number | null;
  execTailAlert: boolean;
};

export const emptyGlobalHeader: GlobalHeader = {
  totalAssets: "",
  costCapital: "",
  targetProfit: "",
  currentProfit: ""
};

export function createEmptyRow(): PortfolioRow {
  return {
    id: crypto.randomUUID(),
    symbol: "",
    position: "",
    plannedPosition: "",
    currentPrice: "",
    costPrice: "",
    stopLossAmount: "",
    execBuyPrice: "",
    execDayPosition: "",
    execStopAmount: ""
  };
}

export function parseAmount(value: string): number | null {
  const n = Number(value.trim());
  return Number.isFinite(n) ? n : null;
}

export function formatNumber(value: number | null, digits = 2): string {
  return value === null ? "--" : value.toFixed(digits);
}

export function formatPct(value: number | null): string {
  return value === null ? "--" : `${value.toFixed(2)}%`;
}

export function calcProgress(header: GlobalHeader): number {
  const target = parseAmount(header.targetProfit);
  const current = parseAmount(header.currentProfit);
  if (target === null || target === 0 || current === null) return 0;
  return (current / target) * 100;
}

export function calcRow(row: PortfolioRow): PortfolioMetrics {
  const currentPrice = parseAmount(row.currentPrice);
  const costPrice = parseAmount(row.costPrice);
  const position = parseAmount(row.position);
  const plannedPosition = parseAmount(row.plannedPosition);
  const stopLossAmount = parseAmount(row.stopLossAmount);

  const positionTotal =
    currentPrice === null || position === null ? null : currentPrice * position;

  let plannedEquivCost: number | null = null;
  if (
    plannedPosition !== null &&
    plannedPosition !== 0 &&
    position !== null
  ) {
    if (position >= plannedPosition && positionTotal !== null) {
      plannedEquivCost = positionTotal / plannedPosition;
    } else if (costPrice !== null) {
      plannedEquivCost = costPrice;
    }
  }

  const pnl =
    currentPrice === null || costPrice === null || position === null
      ? null
      : (currentPrice - costPrice) * position;

  const recoveryPct =
    currentPrice === null || currentPrice === 0 || plannedEquivCost === null
      ? null
      : ((plannedEquivCost - currentPrice) / currentPrice) * 100;

  const stopLossPrice =
    costPrice === null ||
    stopLossAmount === null ||
    position === null ||
    position === 0
      ? null
      : costPrice - stopLossAmount / position;

  const distancePct =
    currentPrice === null || currentPrice === 0 || stopLossPrice === null
      ? null
      : ((currentPrice - stopLossPrice) / currentPrice) * 100;

  const isOverPosition =
    plannedPosition !== null &&
    plannedPosition !== 0 &&
    position !== null &&
    position / plannedPosition > 1;
  const isBreach = distancePct !== null && distancePct < 2;

  const execBuy = parseAmount(row.execBuyPrice || row.costPrice);
  const execPosition = parseAmount(row.execDayPosition || row.position);
  const execStopAmount = parseAmount(row.execStopAmount || row.stopLossAmount);
  const execStopPrice =
    execBuy === null ||
    execStopAmount === null ||
    execPosition === null ||
    execPosition === 0
      ? null
      : execBuy - execStopAmount / execPosition;
  const execDistance =
    currentPrice === null || currentPrice === 0 || execStopPrice === null
      ? null
      : ((currentPrice - execStopPrice) / currentPrice) * 100;

  return {
    positionTotal,
    plannedEquivCost,
    pnl,
    recoveryPct,
    stopLossPrice,
    distancePct,
    alert: isBreach ? "破位预警" : isOverPosition ? "超预仓" : "正常",
    isBreach,
    isOverPosition,
    execStopPrice,
    execTailAlert: execDistance !== null && execDistance < 2
  };
}
