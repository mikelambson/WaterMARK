// typings.d.ts

interface Board {
    setDistrict(arg0: string): unknown;
    setPageSize(arg0: number): unknown;
    setPage(arg0: number): unknown;
    columns: Map<TypedColumn, Column>;
}

declare type TypedColumn = "P" | "scheduled" | "delayed";

interface Order {
    id: number;
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
    scheduled: boolean;
  }

interface OrderDetails {
    irrigatorsName: string;
    ownersName: string;
    name: string;
    approxAf: number;
    balance: number;
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
    manualTimestamp?: String;
  }
  
  export { Board, TypedColumn, Order, OrderDetails, FlowData };