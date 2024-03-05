// typings.d.ts
interface Board {
    setDistrict(arg0: string): unknown;
    setPageSize(arg0: number): unknown;
    setPage(arg0: number): unknown;
    columns?: Map<string, TypedUnscheduled>;
    unscheduled?: {
        pending?: Map<string, TypedUnscheduled>;
        delayed?: Map<string, TypedUnscheduled>;
    };
    scheduled?: {
        running?: Map<string, TypedScheduled>;
        scheduled?: Map<string, TypedScheduled>;
    };
       
}

declare type ColumnUnscheduled = "pending" | "delayed";
declare type ColumnScheduled = "scheduled" | "running";

declare type TypedColumn = "unscheduled" | "scheduled" | "delayed" | "running";

interface TypedUnscheduled {
    id: string;
    orders: Order[]; 
  };

interface SchBoard {
    setDistrict(arg0: string): unknown;
    setSelectedSheet(arg0: number): unknown;
    setSelectedHead(arg0: number): unknown;
    columns: Map<number, TypedScheduled>;
};

interface TypedScheduled {
    id: number;
    schedules: Schedule[];
  }

interface Order {
    id: string;
    orderTimestamp: string;
    orderNumber: number;
    tcidSn: string;
    district: string;
    status: string;
    laterals: string[];
    approxCfs: number;
    approxHrs: number;
    phoneNumbers: string[];
    remarks: string | null;
    details: OrderDetails;
    // deliveries?: OrderDeliveries[]; // Making deliveries optional
    analysis?: any[]; // Making analysis optional
    schedule: Schedule;
}

interface OrderDetails {
    irrigatorsName: string;
    ownersName: string;
    name: string;
    approxAf: number;
    balance: number;
}

interface OrderDeliveries {
    id: string;
    startTime: string;
    stopTime: string;
    measurment?:  any[];
    deliveryNote: string;
}

interface Schedule {
    scheduledDate: string;
    scheduledLineId: number;
    scheduledHead: number;
    travelTime: number;
    instructions: string | null;
    watermasterNote: string | null;
    specialRequest: string | null;
    cancelled: boolean;
    cancelReason: string;
    orderId: string;
    order: Order;
    scheduledLine: ScheduledLine;
    callout: any[];
    deliveries: OrderDeliveries[];
    analysis: any[];
}

interface ScheduledLine {
    id: number;
    name: string;
    district: string;
    maxHeads: number;
    structureRef: string | null;
    maxFlow: number | null;
    characteristics: string | null;
}

interface FlowData {
    id: string;
    name: string;
    type: string;
    remoteSource: string;
    remoteValue?: float;
    remoteTimestamp?: Date;
    override: boolean;
    manualValue?: float;
    manualTimestamp?: string;
}

interface HeadsheetsData {
    id: number;
    name: string;
    district: string;
    maxHeads: number;
    structureRef?: string;
    maxFlow?: number;
    characteristics?: string;
}

type PartialHeadsheetsData = HeadsheetsData | {
    id: 0,
    name: "Sheetname",
    district: "",
    maxHeads: 0,
    maxFlow: 0,
    structureRef: "",
    characteristics: ""
};

type HeadData = number | "Select";
  
export { 
    Board,
    ColumnUnscheduled,
    ColumnScheduled,
    TypedColumn,
    TypedUnscheduled, 
    SchBoard,
    TypedScheduled,
    Order,
    OrderDetails,
    Schedule,
    ScheduledLine, 
    FlowData, 
    HeadsheetsData, 
    PartialHeadsheetsData, 
    HeadData 
};